"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { skillMatchers } from "@/utils/regex";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";

const detectSkillsFromText = (text: string, skills: string[]) => {
    if (!text.trim() || skills.length === 0) {
        return [];
    }
    
    return skills.filter((skill) => {
        const patterns = skillMatchers[skill.toLowerCase()] ?? [];
        return patterns.some((pattern) => pattern.test(text));
    });
};

const nuevoEmpleadoPage = () => {
    const router = useRouter();

    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [pdfUploadUrl, setPdfUploadUrl] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string>("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [extractedText, setExtractedText] = useState<string>("");
    const [selectedRoleId, setSelectedRoleId] = useState<Id<"roles"> | "">("");
    const [isExtractingSkills, setIsExtractingSkills] = useState<boolean>(false);
    const [skillsError, setSkillsError] = useState<string>("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("user.png");
    const [photoUploadUrl, setPhotoUploadUrl] = useState<string | null>(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
    const [isUploadingCv, setIsUploadingCv] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const roles = useQuery(api.roles.getRoles);
    const { edgestore } = useEdgeStore();

    const createUser = useMutation(api.users.createUser);

    const roleSkills = useQuery(
        api.skills.getSkillsByRoleId,
        selectedRoleId ? { roleId: selectedRoleId } : "skip"
    );
    
    const availableRoleSkills = useMemo(
        () => (roleSkills ?? []).filter((skill): skill is NonNullable<typeof skill> => skill !== null),
        [roleSkills]
    );

    useEffect(() => {
        const roleSkillNames = availableRoleSkills.map((skill) => skill.name);
        setSelectedSkills(detectSkillsFromText(extractedText, roleSkillNames));
    }, [availableRoleSkills, extractedText]);

    useEffect(() => {
        if (!pdfFile) {
            setPreviewUrl("");
            setPdfUploadUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(pdfFile);
        setPreviewUrl(objectUrl);
        setPdfUploadUrl(null);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [pdfFile]);

    useEffect(() => {
        if (!photoFile) {
            setPhotoPreviewUrl("/user.png");
            setPhotoUploadUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(photoFile);
        setPhotoPreviewUrl(objectUrl);
        setPhotoUploadUrl(null);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [photoFile]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;

        if (!selected) {
            setPdfFile(null);
            setPdfError("");
            setSkillsError("");
            setSelectedSkills([]);
            setExtractedText("");
            setPdfUploadUrl(null);
            return;
        }

        const isPdfByType = selected.type === "application/pdf";
        const isPdfByExt = selected.name.toLowerCase().endsWith(".pdf");

        if (!isPdfByType && !isPdfByExt) {
            setPdfFile(null);
            setPdfError("Solo se permiten archivos PDF.");
            setSkillsError("");
            setSelectedSkills([]);
            setExtractedText("");
            setPdfUploadUrl(null);
            return;
        }

        setPdfError("");
        setSkillsError("");
        setExtractedText("");
        setPdfFile(selected);

        try {
            setIsExtractingSkills(true);
            const formData = new FormData();
            formData.append("file", selected);

            const response = await fetch("/api/extractTextPDF", {
                method: "POST",
                body: formData,
            });

            const data = (await response.json()) as { text?: string; error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "No se pudo analizar el PDF.");
            }

            setExtractedText(data.text ?? "");
        } catch (error) {
            setSkillsError(error instanceof Error ? error.message : "No se pudieron extraer habilidades del PDF.");
            setExtractedText("");
        } finally {
            console.log(extractedText);
            setIsExtractingSkills(false);
        }
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((item) => item !== skill)
                : [...prev, skill]
        );
    };

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoleId(event.target.value as Id<"roles"> | "");
        setSelectedSkills([]);
        setSkillsError("");
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;

        if (!selected) {
            setPhotoFile(null);
            setPhotoUploadUrl(null);
            return;
        }

        const isImageByType = selected.type.startsWith("image/");
        const isImageByExt = /\.(png|jpe?g|webp|gif|avif)$/i.test(selected.name);

        if (!isImageByType && !isImageByExt) {
            setPhotoFile(null);
            setPhotoUploadUrl(null);
            return;
        }

        setPhotoFile(selected);
    };

    const uploadPhoto = async () => {
        if (!photoFile) {
            return null;
        }

        if (photoUploadUrl) {
            return photoUploadUrl;
        }

        setIsUploadingPhoto(true);

        try {
            const uploaded = await edgestore.publicFiles.upload({
                file: photoFile,
            });

            setPhotoUploadUrl(uploaded.url);
            return uploaded.url;
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const uploadCv = async () => {
        if (!pdfFile) {
            return null;
        }

        if (pdfUploadUrl) {
            return pdfUploadUrl;
        }

        setIsUploadingCv(true);

        try {
            const uploaded = await edgestore.publicFiles.upload({
                file: pdfFile,
            });

            setPdfUploadUrl(uploaded.url);
            return uploaded.url;
        } finally {
            setIsUploadingCv(false);
        }
    };

    const validateForm = () => {
        if(!name.trim()) {
            toast.error("Nombre del colaborador obligatorio.");
            return false;
        }
        if(!email.trim()) {
            toast.error("Correo electrónico del colaborador obligatorio.");
            return false;
        }
        if(!phone.trim()) {
            toast.error("Número de teléfono del colaborador obligatorio.");
            return false;
        }
        if(!selectedRoleId) {
            toast.error("Puesto del colaborador obligatorio.");
            return false;
        }

        if(!pdfFile) {
            toast.error("CV del colaborador obligatorio.");
            return false;
        }
        
        return true;
    };
    
    const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!validateForm()) return;

        const promise = (async () => {
            const [uploadedPhotoUrl, uploadedCvUrl] = await Promise.all([
                uploadPhoto(),
                uploadCv(),
            ]);

            return createUser({
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                photo: uploadedPhotoUrl ?? undefined,
                role: selectedRoleId as Id<"roles">,
                cv: uploadedCvUrl ?? previewUrl,
            });
        })();

        toast.promise(promise, {
            loading: isUploadingPhoto || isUploadingCv ? "Subiendo archivos..." : "Cargando colaborador...",
            success: "Colaborador cargado exitosamente!",
            error: "Error al cargar el colaborador."
        });

        router.push("/admin/colaboradores");
    };

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col my-4 md:mb-0">      
                <ol className="flex flex-wrap items-center gap-2 text-md text-neutral-500 dark:text-neutral-200 mb-1">
                        <li className="inline-flex items-center gap-1 text-sm">
                        <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
                    </li>
                    <li className="inline-flex items-center text-sm">
                        <Link href="/admin/colaboradores" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Colaboradores</span>
                        </Link>
                    </li>
                    <li className="inline-flex items-center text-sm text-neutral-800 dark:text-neutral-300">
                        <Link href="/admin/colaboradores/nuevo" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Nuevo Colaborador</span>
                        </Link>
                    </li>
                </ol>

                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-300">Agregar colaborador</h2>
                <h3 className="text-md font-medium text-neutral-500 dark:text-neutral-400">Registra un nuevo colaborador y asigna su puesto.</h3>
            </div>

            <form onSubmit={onHandleSubmit} className="flex w-full flex-col md:flex-row items-center justify-center gap-4 mt-4">
                <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <div className="w-full max-w-xl h-[60vh] md:h-[80vh] max-h-150 rounded-2xl bg-neutral-200 dark:bg-neutral-800 p-4">
                        {!previewUrl ? (
                            <>
                                <label
                                    htmlFor="file"
                                    className=" flex flex-col items-center justify-center h-full group cursor-pointer rounded-xl border-2 border-dashed border-neutral-500 hover:border-[#2da984]/60 dark:hover:border-[#60be7f] p-4 text-center transition-colors duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                >
                                    <input
                                        id="file"
                                        type="file"
                                        name="file"
                                        accept="application/pdf,.pdf"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                    <span className="mb-3 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200 transition-colors duration-300 group-hover:text-neutral-900">Seleccionar CV</span>
                                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Selecciona el CV del empleado para cargar su información.</p>
                                    {pdfFile && <p className="mt-4 truncate text-xs font-medium text-neutral-700 dark:text-neutral-400">{pdfFile.name}</p>}
                                </label>

                                {pdfError && <p className="mt-2 text-xs font-semibold text-red-600">{pdfError}</p>}
                            </>
                        ) : (
                            <div className="h-full overflow-hidden rounded-xl border bg-neutral-100 dark:bg-neutral-700">
                                <div className="flex items-center justify-between border-b bg-neutral-50 dark:bg-neutral-700 px-3 py-2">
                                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 ">Previsualizacion</p>
                                    <label
                                        htmlFor="file"
                                        className="cursor-pointer rounded-md px-3 py-2 text-xs font-semibold text-neutral-800 bg-neutral-200 hover:bg-neutral-300 transition-colors duration-300"
                                    >
                                        Cambiar PDF
                                    </label>
                                    <input
                                        id="file"
                                        type="file"
                                        name="file"
                                        accept="application/pdf,.pdf"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                </div>
                                <iframe
                                    title="Previsualizacion del PDF"
                                    src={previewUrl}
                                    className="h-full w-full"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:ml-4 gap-y-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <div className="datos flex items-center space-x-4">
                        <label htmlFor="photo" className="cursor-pointer shrink-0">
                            <img className="rounded-full size-20 min-w-20 object-cover ring-2 ring-transparent transition duration-300 hover:ring-[#30aa85]/40  border border-neutral-200 dark:border-neutral-700" src={photoPreviewUrl} alt="Employee Profile Image"/>
                        </label>
                        <input
                            id="photo"
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="sr-only"
                        />
                        <div className="w-full">
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=' placeholder:text-neutral-600 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 p-1 px-2 text-2xl font-semibold focus:outline-none w-full rounded-md mb-2'
                                placeholder="Nombre"
                            />
                            <select
                                value={selectedRoleId}
                                onChange={handleRoleChange}
                                name="puesto"
                                id="puesto"
                                className="text-md text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 p-2 focus:outline-none w-full rounded-md"
                            >
                                <option className="text-neutral-900" value="" disabled>Selecciona un puesto</option>
                                {roles?.map((role) => (
                                    <option key={role._id} className="text-neutral-900" value={role._id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full">
                        <input
                            type="email"
                            id='email'
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='text-md placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full md:w-[60%] rounded-md'
                            placeholder="Correo electronico"
                        />
                        <input
                            type="text"
                            id='telefono'
                            name="telefono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className='text-md placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full md:w-[40%] rounded-md'
                            placeholder="Teléfono"
                        />
                    </div>
                    
                    {selectedRoleId && (
                        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades</p>
                                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{selectedSkills.length} / {roleSkills?.length || 0}</span>
                            </div>

                            {isExtractingSkills && (
                                <p className="mb-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">Analizando CV para detectar habilidades...</p>
                            )}

                            {skillsError && (
                                <p className="mb-3 text-xs font-semibold text-red-700 dark:text-red-400">{skillsError}</p>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {availableRoleSkills.map((skill) => {
                                    const isSelected = selectedSkills.includes(skill.name);

                                    return (
                                        <button
                                            key={skill._id}
                                            type="button"
                                            onClick={() => toggleSkill(skill.name)}
                                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                                                isSelected
                                                    ? "border-[#30aa85] bg-[#30aa85] text-white"
                                                    : "border-neutral-300 bg-neutral-100 text-neutral-700 hover:border-[#30aa85]/60 hover:text-[#30aa85] dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 cursor-pointer"
                                            }`}
                                        >
                                            {skill.name}
                                        </button>
                                    );
                                })}
                            </div>

                            <input type="hidden" name="skills" value={selectedSkills.join(",")} />
                        </div>
                    )}
                        
                    <button
                        type="submit"
                        className="bg-default-300 cursor-pointer font-semibold text-white h-10 w-38 rounded-lg transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isUploadingPhoto || isUploadingCv}
                    >
                        {isUploadingPhoto || isUploadingCv ? "SUBIENDO..." : "GUARDAR"}
                    </button>
                </div>
            </form>
        </section>
    );
}
 
export default nuevoEmpleadoPage;