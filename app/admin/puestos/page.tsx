"use client";

import Link from "next/link";
import { Trash2, Eye } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "../_components/EmptyState";
import Spinner from "@/components/Spinner";

const puestosPage = () => {
    const roles = useQuery(api.roles.getRoles);

    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
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
                            <tr key={role._id} className="hover:bg-neutral-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-semibold text-neutral-900 text-md">{role.name}</div>
                                        <div className="text-sm text-neutral-500 mt-1">{role.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {/* {role.habilidades.slice(0, 2).map((skill) => (
                                            <span key={skill} className="px-2 py-1 border border-neutral-300 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {role.habilidades.length > 2 && (
                                            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                                                +{role.habilidades.length - 2}
                                            </span>
                                        )} */}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {/* <div className="text-sm font-medium text-neutral-800">{role.colaboradores}</div> */}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors" title="Ver">
                                            <Eye className="size-4 text-neutral-600" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar">
                                            <Trash2 className="size-4 text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-600">
                    <span>Total: {roles.length} puestos</span>
                </div>
            </div>
            )}
        </section>
    );
}

export default puestosPage;