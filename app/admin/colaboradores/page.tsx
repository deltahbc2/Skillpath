'use client';

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "../_components/EmptyState";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

const UserRow = ({ user, onDelete }: { user: any; onDelete: (user: any) => void }) => {
    return (
        <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="size-12 rounded-xl object-cover border border-neutral-200 shadow-sm group-hover:border-[#5cbb80]/20 transition-colors"/>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-300 text-md">{user.name}</div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-neutral-800 font-medium">{user.role}</div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-neutral-600">{user.email}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{user.phone}</div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-default-100 rounded-full w-[92%] relative"></div>
                    </div>
                    <span className="text-sm font-bold text-neutral-700 w-10 text-right">92%</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/colaboradores/${user._id}`} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" title="Ver">
                        <Eye className="size-4 text-neutral-600" />
                    </Link>
                    <button onClick={() => onDelete(user)} className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Eliminar">
                        <Trash2 className="size-4 text-red-500" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

const empleadosPage = () => {
    const users = useQuery(api.users.getUsers);
    const removeUser = useMutation(api.users.deleteUserById);
    const [modalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const requestDelete = (user: any) => {
        setUserToDelete(user);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);

        const promise = removeUser({ userId: userToDelete._id });
        toast.promise(promise, {
            loading: "Eliminando usuario...",
            success: "Usuario eliminado",
            error: "Error al eliminar el usuario",
        });

        try {
            await promise;
        } finally {
            setIsDeleting(false);
            setModalOpen(false);
            setUserToDelete(null);
        }
    };

    const cancelDelete = () => {
        setModalOpen(false);
        setUserToDelete(null);
    };
    
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                    <div className="flex flex-col my-4 md:mb-0">
                        <ol className="flex flex-wrap items-center gap-2 text-md text-neutral-500 dark:text-neutral-200 mb-1">
                        <li className="inline-flex items-center gap-1 text-sm">
                                <Link href="/admin" className="transition-colors hover:text-foreground">Admin</Link>
                            </li>
                            <li className="inline-flex items-center text-sm text-neutral-800 dark:text-neutral-300">
                                <Link href="/admin/colaboradores" className="transition-colors hover:text-foreground gap-1 inline-flex">
                                    <span>/</span>
                                    <span>Colaboradores</span>
                                </Link>
                            </li>
                        </ol>
    
                        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-300">Directorio de Colaboradores</h2>
                        <h3 className="text-md font-medium text-neutral-500 dark:text-neutral-400">Gestiona y monitorea el nivel de preparación de tu equipo.</h3>
                    </div>
    
                    <Link href='/admin/colaboradores/nuevo' className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md cursor-pointer">Añadir Colaborador</Link>
                </div>
            </div>

            {users==undefined ? (
                <div className="w-full flex justify-center p-12">
                    <Spinner label="Cargando colaboradores..." className="size-8"/>
                </div>
            ): users.length === 0 ? (
                <EmptyState/>
            ) : (
                <div className="bg-white rounded-3xl border border-neutral-100 overflow-auto shadow-sm">
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
                            {users.map((user) => (
                                <UserRow key={user._id} user={user} onDelete={requestDelete} />
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-600">
                        <span>Total: {users.length} colaboradores</span>
                    </div>
                </div>
            )}
            <ConfirmationModal
                open={modalOpen}
                title={`Eliminar colaborador`}
                message={`Vas a eliminar a "${userToDelete?.name || "este colaborador"}" y sus datos asociados. ¿Deseas continuar?`}
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
                loading={isDeleting}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </section>
    );
}
 
export default empleadosPage;