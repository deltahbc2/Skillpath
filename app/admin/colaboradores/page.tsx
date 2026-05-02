import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";

const empleadosPage = () => {
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-lg font-medium text-neutral-900">Directorio de Colaboradores</h2>
                    <h3 className="text-md font-medium text-neutral-500">Gestiona y monitorea el nivel de preparación de tu equipo.</h3>
                </div>

                <Link href='/admin/colaboradores/nuevo' className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md cursor-pointer">Añadir Colaborador</Link>
            </div>

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
                        <tr className="hover:bg-neutral-50/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Elena Rojas" className="size-12 rounded-xl object-cover border border-neutral-200 shadow-sm group-hover:border-[#5cbb80]/20 transition-colors"/>
                                    <div className="font-semibold text-neutral-900 text-sm">Elena Rojas</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-neutral-800 font-medium">Product Designer</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-neutral-600">elena.rojas@skillpath.ai</div>
                                <div className="text-xs text-neutral-400 mt-0.5">+52 55 1234 5678</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-default-100 rounded-full w-[92%] relative"></div>
                                    </div>
                                    <span className="text-sm font-bold text-neutral-700 w-10 text-right">92%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right min-w-35">
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
                    </tbody>
                </table>
                
                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-600">
                    <span>Total: 10 colaboradores</span>
                </div>
            </div>
        </section>
    );
}
 
export default empleadosPage;