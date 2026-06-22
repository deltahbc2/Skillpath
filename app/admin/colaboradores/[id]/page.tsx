'use client';

import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const empleadoIdPage = () => {
    const params = useParams();
    const router = useRouter();
    
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    const id = typeof rawId === "string" ? (rawId as Id<"users">) : undefined;

    const users = useQuery(api.users.getUsers);
    const user = users?.find((item) => item._id === id) ?? null;

    const roles = useQuery(api.roles.getRoles);
    const role = roles?.find((item) => item._id === user?.role) ?? null;
    const roleId = role?._id;

    const rolesSkills = useQuery(
        api.skills.getSkillsByRoleId,
        roleId ? { roleId } : "skip"
    );

    useEffect(() => {
        if (users !== undefined && user === null) {
            router.replace("/admin/colaboradores");
        }
    }, [user, users, router]);

    if(user === undefined || users === undefined || user === null) return (
        <div className="w-full flex h-screen items-center justify-center py-20">
            <Spinner className="size-12"/>
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
                        <Link href="/admin/colaboradores" className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>Colaboradores</span>
                        </Link>
                    </li>
                    <li className="inline-flex items-center text-sm text-neutral-800 dark:text-neutral-300">
                        <Link href={`/admin/colaboradores/${user?._id}`} className="transition-colors hover:text-foreground gap-1 inline-flex">
                            <span>/</span>
                            <span>{user?.name}</span>
                        </Link>
                    </li>
                </ol>

                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-300">Perfil del colaborador</h2>
                <h3 className="text-md font-medium text-neutral-500 dark:text-neutral-400">Consulta los datos del colaborador, su puesto y su progreso en la capacitación.</h3>
            </div>

            <form className="flex w-full flex-col md:flex-row items-center justify-center gap-4 mt-4">
                <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <div className="w-full max-w-xl h-[60vh] md:h-[80vh] max-h-150 rounded-2xl bg-neutral-200 dark:bg-neutral-800">
                        <div className="h-full overflow-hidden rounded-xl border bg-neutral-100 dark:bg-neutral-700">
                            <iframe
                                title="Previsualizacion del PDF"
                                src={`${user?.cv}`}
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:ml-4 gap-y-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <div className="datos flex items-center space-x-4">
                        <img className="rounded-full size-20 object-cover border border-neutral-200 dark:border-neutral-700" src="/perfil.jpg" alt="Employee Profile Image"/>
                        <div>
                            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">{user?.name}</h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300">{role?.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full">
                        <a href={`mailto:${user?.email}`} className=" py-2 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 text-md w-full sm:w-[60%] text-neutral-800 overflow-hidden">{user?.email}</a>
                        <a href={`tel:${user?.phone}`} className=" py-2 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 text-md w-full sm:w-[40%] text-neutral-800">{user?.phone}</a>
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades</p>
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">10 / {rolesSkills?.length || 0}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {rolesSkills?.map((skill) => {
                                return (
                                    <button
                                        key={skill?._id}
                                        type="button"
                                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                                            "border-[#30aa85] bg-[#30aa85] text-white"
                                        }`}
                                    >
                                        {skill?.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                        
                    <div>
                        <button type="submit" className="py-2 px-4 bg-default-300 cursor-pointer font-semibold text-white rounded-lg transition-colors duration-300">EDITAR</button>
                    </div>
                </div>
            </form>
        </section>
    );
}
 
export default empleadoIdPage;