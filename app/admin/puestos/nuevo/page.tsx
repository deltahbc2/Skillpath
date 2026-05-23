"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { parseRoadmapData } from "./parseRoadmap";

import Spinner from "@/components/Spinner";
import { Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const NuevoPuestoPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

    const createRole = useMutation(api.roles.createRole);
    const getRoles = useQuery(api.roles.getRoles);
    const createLesson = useMutation(api.lessons.createLesson);

    const addSkill = () => {
        const normalizedSkill = skillInput.trim().toLowerCase();

        if (!normalizedSkill) return;

        setSkills((prev) =>
            prev.includes(normalizedSkill) ? prev : [...prev, normalizedSkill]
        );
        setSkillInput("");
    };

    const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        event.preventDefault();
        addSkill();
    };

    const validateForm = () => {
        if (!name.trim()) {
            toast.error("Nombre del puesto obligatorio.");
            return false;
        }
        if (!description.trim()) {
            toast.error("Descripción del puesto obligatoria.");
            return false;
        }
        if (skills.length === 0) {
            toast.error("Habilidad obligatorias.");
            return false;
        }

        return true;
    };

    const onRemoveSkill = (skillToRemove: string) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!validateForm()) return;

        if (getRoles) {
            const duplicate = getRoles.find((role) => role.name.toLowerCase() === name.trim().toLowerCase());

            if (duplicate) {
                toast.error("Ya existe un puesto con ese nombre.");
                return;
            }
        }

        const promise = createRole({
            name: name.trim(),
            description: description.trim(),
            skills,
        });

        toast.promise(promise, {
            loading: "Creando puesto...",
            success: "Puesto creado exitosamente!",
            error: "Error al crear el puesto."
        });

        try {
            const roleId = await promise;

            if (!roleId) {
                throw new Error("No se pudo crear el puesto.");
            }

            setIsGeneratingRoadmap(true);

            try {
                const generatePromises = skills.map((skill) =>
                    fetch(`/api/generate-roadmap`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ skill, role: name.trim(), description: description.trim() }),
                    }).then(async (res) => {
                        if (!res.ok) throw new Error("Error al generar roadmap");
                        const json = await res.json();
                        return { skill, json };
                    })
                );

                const results = await Promise.allSettled(generatePromises);
                const fulfilled = results.filter((r) => r.status === "fulfilled");
                console.log("Resultados de generación de roadmaps:", fulfilled);

                if (fulfilled.length > 0) {
                    const lessonPromises = fulfilled.flatMap((result) => {
                        if (result.status !== "fulfilled") return [];

                        try {
                            const roadmap = parseRoadmapData(result.value.json.data) as {
                                lessons?: Array<{
                                    title: string;
                                    content: string;
                                    example: string;
                                    quiz?: Array<{
                                        question: string;
                                        options: string[];
                                        correct: number;
                                    }>;
                                }>;
                            };

                            if (!roadmap.lessons?.length) return [];

                            return roadmap.lessons.map((lesson, index) =>
                                createLesson({
                                    roleId,
                                    skillName: result.value.skill,
                                    title: lesson.title,
                                    order: index + 1,
                                    level: undefined,
                                    content: lesson.content,
                                    example: lesson.example,
                                    quiz: lesson.quiz ?? [],
                                })
                            );
                        } catch (error) {
                            console.error("Error parsing roadmap JSON", error);
                            toast.error(`Roadmap inválido para ${result.value.skill}.`);
                            return [];
                        }
                    });

                    await Promise.allSettled(lessonPromises);
                    
                    toast.success(`Roadmaps generados: ${fulfilled.length}/${skills.length}`);
                } else {
                    toast.error("No se generaron roadmaps.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error generando roadmaps.");
            } finally {
                setIsGeneratingRoadmap(false);
            }

            router.push("/admin/puestos");
        } catch {
            return;
        }
    }

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col my-4 md:mb-0">      
                <ol className="flex flex-wrap items-center gap-2 text-md text-neutral-500 mb-1">
                    <li className="inline-flex items-center gap-1 text-sm text-neutral-500">
                        <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
                    </li>
                    <li className="inline-flex items-center text-sm text-neutral-500">
                        <Link href="/admin/puestos" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Puestos</span>
                        </Link>
                    </li>
                    <li className="inline-flex items-center text-sm text-neutral-800">
                        <Link href="/admin/puestos/nuevo" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Nuevo Puesto</span>
                        </Link>
                    </li>
                </ol>

                <h2 className="text-lg font-medium text-neutral-900">Agregar puesto</h2>
                <h3 className="text-md font-medium text-neutral-500">Define un nuevo puesto y registra sus habilidades requeridas.</h3>
            </div>

            <form onSubmit={onHandleSubmit} className="flex w-full flex-col md:flex-row justify-center gap-4 mt-4">
                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6">Información del puesto</h3>

                    <label className="mb-2" htmlFor="nombre">Nombre del puesto</label>
                    <input
                        type="text"
                        id='nombre'
                        name="nombre"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className='text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4'
                        disabled={isGeneratingRoadmap}
                        placeholder="Ej. Desarrollador Front End"
                    />

                    <label htmlFor="descripcion" className="mb-2">Descripción</label>
                    <textarea
                        id='descripcion'
                        name="descripcion"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4 min-h-15 max-h-30'
                        disabled={isGeneratingRoadmap}
                        placeholder="Breve descripción del puesto"
                        rows={4}
                    />
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6">Habilidades requeridas</h3>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                        <input
                            type="text"
                            id='habilidades'
                            name="habilidades"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                            disabled={isGeneratingRoadmap}
                            className='text-sm font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 pl-9 focus:outline-none w-full rounded-md'
                            placeholder="Agregar habilidades..."
                        />
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 mb-6">
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades seleccionadas</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {skills.map((skill, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={(e) => onRemoveSkill(skill)}
                                        type="button"
                                        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 border-neutral-300 bg-neutral-100 text-neutral-700 hover:border-[#30aa85]/60 hover:text-[#30aa85] dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 cursor-pointer"
                                    >
                                        {skill}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isGeneratingRoadmap}
                        className="bg-default-300 cursor-pointer font-semibold text-white h-10 w-38 rounded-lg transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {isGeneratingRoadmap && <Spinner className="size-4 text-white" label="Generando roadmap" />}
                        <span>{isGeneratingRoadmap ? "GENERANDO..." : "GUARDAR"}</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
 
export default NuevoPuestoPage;