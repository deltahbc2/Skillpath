import { Eye, Search, Trash2 } from "lucide-react";

const skillOptions = [
    "React",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Tailwind",
    "Git",
    "SQL",
];

const puestoNombrePage = () => {
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <h2 className="text-lg font-medium text-neutral-900">Datos del puesto</h2>
            <h3 className="text-md font-medium text-neutral-500">Edita y valida la información del puesto y sus habilidades requeridas.</h3>

            <form className="flex w-full flex-col md:flex-row justify-center gap-4 mt-4 mb-8">
                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6 text-neutral-800 dark:text-neutral-100">Desarrollador Front End</h3>

                    <p className='text-md font-normal text-neutral-700 dark:text-neutral-100 w-full rounded-md mb-4 min-h-15 max-h-30'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6">Habilidades requeridas</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {skillOptions.map((skill) => {
                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 border-neutral-300 bg-neutral-100 text-neutral-800"
                                >
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                    
                    <button type="submit" className="bg-default-300 cursor-pointer font-semibold text-white h-10 w-38 rounded-lg transition-colors duration-300">EDITAR</button>
                </div>
            </form>

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
 
export default puestoNombrePage;