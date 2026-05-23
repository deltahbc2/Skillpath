"use client";

import Link from "next/link";
import { Trash2, Eye } from "lucide-react";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "../_components/EmptyState";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

const RoleRow = ({ role, onDelete }: { role: any; onDelete: (role: any) => void }) => {
    const skills = useQuery(api.skills.getSkillsByRoleId, { roleId: role._id });
    const users = useQuery(api.users.getUsersByRoleId, { roleId: role._id });

    return (
        <tr key={role._id} className="hover:bg-neutral-50/50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <div className="font-semibold text-neutral-900 text-md">{role.name}</div>
                    <div className="text-sm text-neutral-500 mt-1">{role.description}</div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                    {skills === undefined ? (
                        <Spinner className="size-5" label="Cargando habilidades" />
                    ) : skills.length === 0 ? (
                        <span className="text-xs text-neutral-400">Sin habilidades</span>
                    ) : (
                        <>
                            {skills.slice(0, 2).map((skill: any) => (
                                <span key={skill._id} className="px-2 py-1 border border-neutral-300 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
                                    {skill.name}
                                </span>
                            ))}
                            {skills.length > 2 && (
                                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                                    +{skills.length - 2}
                                </span>
                            )}
                        </>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                    {users === undefined ? (
                        <Spinner className="size-5" label="Cargando usuarios" />
                    ) : users.length === 0 ? (
                        <span className="text-xs text-neutral-400">Sin usuarios</span>
                    ) : (
                        <>
                            {users.slice(0, 2).map((user: any) => (
                                <span key={user._id} className="px-2 py-1 border border-neutral-300 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
                                    {user.name}
                                </span>
                            ))}
                            {users.length > 2 && (
                                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                                    +{users.length - 2}
                                </span>
                            )}
                        </>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/puestos/${role._id}`} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" title="Ver">
                        <Eye className="size-4 text-neutral-600" />
                    </Link>
                    <button onClick={() => onDelete(role)} className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Eliminar">
                        <Trash2 className="size-4 text-red-500" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const puestosPage = () => {
    const roles = useQuery(api.roles.getRoles);
    const removeRole = useMutation(api.roles.deleteRoleById);
    const [modalOpen, setModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<any | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const requestDelete = (role: any) => {
        setRoleToDelete(role);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!roleToDelete) return;
        setIsDeleting(true);

        const promise = removeRole({ roleId: roleToDelete._id });
        toast.promise(promise, {
            loading: "Eliminando puesto...",
            success: "Puesto eliminado",
            error: "Error al eliminar el puesto",
        });

        try {
            await promise;
        } finally {
            setIsDeleting(false);
            setModalOpen(false);
            setRoleToDelete(null);
        }
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setRoleToDelete(null);
    };

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col my-4 md:mb-0">
                    <ol className="flex flex-wrap items-center gap-2 text-md text-neutral-500 mb-1">
                        <li className="inline-flex items-center gap-1 text-sm text-neutral-500">
                            <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
                        </li>
                        <li className="inline-flex items-center text-sm text-neutral-800">
                            <Link href="/admin/puestos" className="transition-colors hover:text-foreground gap-1 inline-flex">
                                <span>/</span>
                                <span>Puestos</span>
                            </Link>
                        </li>
                    </ol>

                    <h2 className="text-lg font-medium text-neutral-900">Directorio de Puestos</h2>
                    <h3 className="text-md font-medium text-neutral-500">Gestiona y monitorea los puestos existentes en tu organización.</h3>
                </div>

                <Link href='/admin/puestos/nuevo' className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md cursor-pointer">Añadir Puesto</Link>
            </div>

            {roles==undefined ? (
                <div className="w-full flex justify-center p-12">
                    <Spinner label="Cargando puestos..." className="size-8"/>
                </div>
            ): roles.length === 0 ? (
                <EmptyState/>
            ) : (
            <div className="bg-white rounded-3xl border border-neutral-100 overflow-auto shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-50/80 border-b border-neutral-100">
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Puesto</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Habilidades</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Colaboradores</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                        {roles.map((role) => (
                            <RoleRow key={role._id} role={role} onDelete={requestDelete} />
                        ))}
                    </tbody>
                </table>

                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-600">
                    <span>Total: {roles.length} puestos</span>
                </div>
            </div>
            )}
            <ConfirmationModal
                open={modalOpen}
                title={`Eliminar puesto`}
                message={`Vas a eliminar "${roleToDelete?.name || "este puesto"}" y sus datos asociados. ¿Deseas continuar?`}
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                loading={isDeleting}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </section>
    );
}

export default puestosPage;