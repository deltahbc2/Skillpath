import Link from "next/link";
import { Trash2, Edit2, Eye } from "lucide-react";

const puestosData = [
    {
        id: 1,
        nombre: "Desarrollador Front End",
        descripcion: "Especialista en desarrollo de interfaces web modernas",
        habilidades: ["React", "TypeScript", "Tailwind", "Next.js"],
        colaboradores: 3,
        creado: "2025-01-15"
    },
    {
        id: 2,
        nombre: "Desarrollador Back End",
        descripcion: "Experto en arquitectura de servidores y APIs",
        habilidades: ["Node.js", "SQL", "JavaScript", "Git"],
        colaboradores: 2,
        creado: "2025-01-10"
    },
    {
        id: 3,
        nombre: "Product Designer",
        descripcion: "Diseñador de experiencia y interfaz de usuario",
        habilidades: ["CSS", "HTML", "UX Design", "Figma"],
        colaboradores: 1,
        creado: "2025-01-20"
    }
];

const puestosPage = () => {
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-lg font-medium text-neutral-900">Directorio de Puestos</h2>
                    <h3 className="text-md font-medium text-neutral-500">Gestiona y monitorea los puestos existentes en tu organización.</h3>
                </div>

                <Link href='/admin/puestos/nuevo' className="py-2 px-3 bg-default-300 hover:bg-[#30aa8580] text-white rounded-md cursor-pointer">Añadir Puesto</Link>
            </div>

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
                        {puestosData.map((puesto) => (
                            <tr key={puesto.id} className="hover:bg-neutral-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-semibold text-neutral-900 text-md">{puesto.nombre}</div>
                                        <div className="text-sm text-neutral-500 mt-1">{puesto.descripcion}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {puesto.habilidades.slice(0, 2).map((skill) => (
                                            <span key={skill} className="px-2 py-1 border border-neutral-300 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {puesto.habilidades.length > 2 && (
                                            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">
                                                +{puesto.habilidades.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-neutral-800">{puesto.colaboradores}</div>
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
                    <span>Total: {puestosData.length} puestos</span>
                </div>
            </div>
        </section>
    );
}

export default puestosPage;