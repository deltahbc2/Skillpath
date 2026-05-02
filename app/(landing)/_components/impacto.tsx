import { Check } from "lucide-react";

const Impacto = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-300 mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">Impacto real en tu organización</h2>
                    <p className="text-lg text-neutral-500 mb-8">SkillPath no solo ayuda a los individuos a crecer, sino que transforma la forma en que las empresas gestionan el talento y la capacitación.</p>
                    
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 mt-1 bg-[#5cbb80]/30 text-default-500 rounded-full flex items-center justify-center shrink-0">
                                <Check/>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1e293b] text-lg">Reduce el tiempo de onboarding</h4>
                                <p className="text-neutral-500">Acelera la integración de nuevos empleados con rutas de aprendizaje específicas para su rol desde el día uno.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 mt-1 bg-[#5cbb80]/30 text-default-500 rounded-full flex items-center justify-center shrink-0">
                                <Check/>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1e293b] text-lg">Mejora el rendimiento</h4>
                                <p className="text-neutral-500">Cierra las brechas de habilidades rápidamente, permitiendo a tu equipo ejecutar tareas complejas con mayor eficiencia.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-8 h-8 mt-1 bg-[#5cbb80]/30 text-default-500 rounded-full flex items-center justify-center shrink-0">
                                <Check/>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1e293b] text-lg">Mide la preparación para un rol</h4>
                                <p className="text-neutral-500">Obtén métricas objetivas sobre si un candidato o empleado interno está listo para asumir nuevas responsabilidades.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 rounded-4xl p-8 border border-slate-100 relative">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-default-500 rounded-full opacity-10 blur-xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-default-900 rounded-full opacity-10 blur-xl"></div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-neutral-800 font-semibold text-heading">Porcentaje de Avance</span>
                            <span className="text-default-700 font-bold">85%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-default-100 h-2 rounded-full w-[85%]"></div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                            <div className="text-neutral-800 text-3xl font-bold text-heading mb-1">-40%</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide">Tiempo Onboarding</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                            <div className="text-neutral-800 text-3xl font-bold text-heading mb-1">+2.5x</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide">Retención Conocimiento</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Impacto;