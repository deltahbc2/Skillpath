"use client";

import Spinner from "@/components/Spinner";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

import { useQuery, useMutation } from "convex/react";
import { Eye, Search, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import EmptyState from "../../_components/EmptyState";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { generateRoadmapsForNewSkills } from "./generateRoadmap";
import Link from "next/link";

const puestoNombrePage = () => {
    const params = useParams();
    const router = useRouter();
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    const id = typeof rawId === "string" ? (rawId as Id<"roles">) : undefined;

    const [isEditing, setIsEditing] = useState(false)
    const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const [skillInput, setSkillInput] = useState("");
    const [editedSkills, setEditedSkills] = useState<string[]>([]);

    const roles = useQuery(api.roles.getRoles);
    const role = roles?.find((item) => item._id === id) ?? null;

    const users = useQuery(api.users.getUsersByRoleId, role ? { roleId: role._id } : "skip");
    const skills = useQuery(api.skills.getSkillsByRoleId, role ? { roleId: role._id } : "skip");
    const existingSkills = useQuery(
        api.skills.getSkillsByNames,
        editedSkills.length > 0 ? { skillNames: editedSkills } : "skip"
    );
    
    const lessonCounts = useQuery(
        api.lessons.getLessonCountsBySkillIds,
        existingSkills && existingSkills.length > 0 
            ? { skillIds: existingSkills.map(s => s._id) }
            : "skip"
    );

    const updateRole = useMutation(api.roles.updateRoleById);
    const createLesson = useMutation(api.lessons.createLesson);

    useEffect(() => {
        if (!isEditing && role) {
            setEditedName(role.name || "");
            setEditedDescription(role.description || "");
        }
    }, [role, isEditing]);

    useEffect(() => {
        if (roles !== undefined && role === null) {
            router.replace("/admin/puestos");
        }
    }, [role, roles, router]);

    useEffect(() => {
        if (!isEditing && (skills?.length || 0) > 0) {
            setEditedSkills((skills || []).map((s) => s?.name || ""));
        }
    }, [skills, isEditing]);

    const addSkill = () => {
        const normalizedSkill = skillInput.trim().toLowerCase();

        if (!normalizedSkill) return;

        setEditedSkills((prev) =>
            prev.includes(normalizedSkill) ? prev : [...prev, normalizedSkill]
        );
        setSkillInput("");
    };

    const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        event.preventDefault();
        addSkill();
    };

    const onRemoveSkill = (skillToRemove: string) => {
        setEditedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    const validateForm = () => {
        if (!editedName.trim()) {
            toast.error("El nombre del puesto es obligatorio.");
            return false;
        }
        if (!editedDescription.trim()) {
            toast.error("La descripción es obligatoria.");
            return false;
        }

        return true;
    };

    const getAddedSkills = () => {
        const currentSkillNames = new Set(
            (skills || [])
                .map((skill) => skill?.name || "")
                .filter(Boolean)
                .map((skill) => skill.toLowerCase())
        );

        const existingDatabaseSkillNames = new Set(
            (existingSkills || [])
                .map((skill) => skill?.name || "")
                .filter(Boolean)
                .map((skill) => skill.toLowerCase())
        );

        return editedSkills.filter(
            (skill) => !currentSkillNames.has(skill.toLowerCase()) && !existingDatabaseSkillNames.has(skill.toLowerCase())
        );
    };

    const getSkillsForRoadmapGeneration = () => {
        // Nuevas skills (no en el role ni en la BD)
        const newSkills = getAddedSkills();

        // Skills que existen en la BD pero no tienen lessons
        const skillsWithoutLessons = (existingSkills || [])
            .filter((skill) => {
                const skillLessonCount = lessonCounts?.find(
                    (count) => count.skillId === skill._id
                );
                return skillLessonCount && skillLessonCount.count === 0;
            })
            .map((skill) => skill.name);

        // Combinar ambas listas, evitando duplicados
        const combined = new Set([...newSkills, ...skillsWithoutLessons]);
        return Array.from(combined);
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        if (isGeneratingRoadmap) return;

        setIsGeneratingRoadmap(true);

        try {
            const skillsForRoadmap = getSkillsForRoadmapGeneration();
            
            const promise = updateRole({
                id: id!,
                name: editedName.trim(),
                description: editedDescription.trim(),
                skills: editedSkills,
            });

            toast.promise(promise, {
                loading: "Actualizando puesto...",
                success: "Puesto actualizado exitosamente.",
                error: "Error al actualizar el puesto."
            });

            await promise;

            if (skillsForRoadmap.length > 0) {
                await generateRoadmapsForNewSkills(skillsForRoadmap, editedName, editedDescription, id!, createLesson);
            }

            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al actualizar el puesto.");
        } finally {
            setIsGeneratingRoadmap(false);
        }
    };

    const handleCancel = () => {
        setEditedName("");
        setEditedDescription("");
        setEditedSkills([]);
        setIsEditing(false);
    };

    if(role === undefined || roles === undefined || role === null) return (
        <div className="w-full flex items-center justify-center py-20">
            <Spinner/>
        </div>
    )

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col my-4 md:mb-0">      
                <ol className="flex flex-wrap items-center gap-2 text-md text-neutral-500 dark:text-neutral-200 mb-1">
                    <li className="inline-flex items-center gap-1 text-sm">
                        <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
                    </li>
                    <li className="inline-flex items-center text-sm">
                        <Link href="/admin/puestos" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Puestos</span>
                        </Link>
                    </li>
                    <li className="inline-flex items-center text-sm text-neutral-800 dark:text-neutral-300">
                        <Link href={`/admin/puestos/${role?._id}`} className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>{role?.name}</span>
                        </Link>
                    </li>
                </ol>

                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-300">Datos del puesto</h2>
                <h3 className="text-md font-medium text-neutral-500 dark:text-neutral-400">Edita y valida la información del puesto y sus habilidades requeridas.</h3>
            </div>

            <div className="flex w-full flex-col md:flex-row justify-center gap-4 mt-4 mb-8">
                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    {isEditing ? (
                        <>
                            <h3 className="text-lg font-medium mb-6">Información del puesto</h3>

                            <label className="mb-2" htmlFor="nombre">Nombre del puesto</label>
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4"
                                placeholder="Nombre del puesto"
                            />
                        </>
                    ) : (
                        <h3 className="text-lg font-medium mb-4 text-neutral-800 dark:text-neutral-100">{role?.name}</h3>
                    )}

                    {isEditing ? (
                        <>
                            <label htmlFor="descripcion" className="mb-2">Descripción</label>
                            <textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                className="text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4 min-h-15 max-h-30"
                                placeholder="Breve descripción del puesto"
                                rows={4}
                            />
                        </>
                    ) : (
                        <p className='text-md font-normal text-neutral-700 dark:text-neutral-100 w-full rounded-md mb-4 min-h-15 max-h-30'>
                            {role?.description}
                        </p>
                    )}
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-4">Habilidades requeridas</h3>

                    {isEditing && (
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                            <input
                                type="text"
                                id='habilidades'
                                name="habilidades"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                className='text-sm font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 pl-9 focus:outline-none w-full rounded-md'
                                placeholder="Agregar habilidades..."
                            />
                        </div>
                    )}
                    
                    {isEditing ? (
                        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 mb-6">
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades seleccionadas</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {editedSkills.map((skill, index) => {
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
                    ): (
                        <div className="flex flex-wrap gap-2 mb-4">
                        {skills?.map((skill) => {
                            return (
                                <button
                                    key={skill?._id}
                                    type="button"
                                    className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 border-neutral-300 bg-neutral-100 text-neutral-800"
                                >
                                    {skill?.name}
                                </button>
                            );
                        })}
                        </div>
                    )}

                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    className='bg-default-300 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer font-semibold text-white h-10 flex-1 rounded-lg transition-colors duration-300 hover:bg-default-400'
                                    onClick={handleSave}
                                    disabled={isGeneratingRoadmap}
                                >
                                    {isGeneratingRoadmap ? "GUARDANDO..." : "GUARDAR"}
                                </button>
                                <button
                                    type="button"
                                    className="bg-neutral-200 dark:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer font-semibold text-neutral-800 dark:text-neutral-100 h-10 flex-1 rounded-lg transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                    onClick={handleCancel}
                                    disabled={isGeneratingRoadmap}
                                >
                                    CANCELAR
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className='bg-default-300 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer font-semibold text-white h-10 w-38 rounded-lg transition-colors duration-300 hover:bg-default-400'
                                onClick={() => setIsEditing(true)}
                                disabled={isGeneratingRoadmap}
                            >
                                EDITAR
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 overflow-auto shadow-sm">
                {users?.length === 0 ? (
                    <EmptyState title="No hay colaboradores asignados" description="No hay colaboradores asignados a este puesto." />
                ) : (
                    <>
                        <table className="w-full text-left border-collapse overflow-auto">
                            <thead>
                                    <tr className="bg-neutral-50/80 border-b border-neutral-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Colaborador</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Puesto</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Contacto</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider w-48">Porcentaje</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50">
                                {users?.map((user) => {
                                    return (
                                        <tr key={user?._id} className="hover:bg-neutral-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={user?.photo || "/user.png"} alt={user?.name || "Colaborador"} className="size-12 rounded-xl object-cover border border-neutral-200 shadow-sm group-hover:border-[#5cbb80]/20 transition-colors"/>
                                                    <div className="font-semibold text-neutral-900 text-sm">{user?.name || "Sin nombre"}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-neutral-800 font-medium">{role?.name || "Sin puesto"}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-neutral-600">{user?.email || "Sin email"}</div>
                                                <div className="text-xs text-neutral-400 mt-0.5">{user?.phone || "Sin teléfono"}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-default-100 rounded-full w-0 relative"></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-neutral-700 w-10 text-right">Sin dato</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right min-w-35">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/colaboradores/${user?._id}`} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                                                        <Eye className="size-4 text-neutral-600" />
                                                    </Link>
                                                    <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar">
                                                        <Trash2 className="size-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-600">
                            <span>Total: {users?.length || 0} colaboradores</span>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
 
export default puestoNombrePage;