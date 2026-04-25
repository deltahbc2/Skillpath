import { Brain, Compass, File, GitCompare, Target } from "lucide-react";

const Proceso = () => {
    return (
        <section id="how-it-works" className="py-24 bg-white relative">
            <div className="max-w-300 mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">Capacitación personalizada en 5 pasos</h2>
                    <p className="text-lg text-neutral-500">Un proceso inteligente impulsado por IA que transforma perfiles en talento preparado para el puesto.</p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
                        <div className="flex flex-col items-center text-center group">
                            <div className="size-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-[#007781] group-hover:border-[#007781] group-hover:border-primary transition-all mb-6 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-default-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">1</div>
                                <File className="size-10"/>
                            </div>
                            <h3 className="font-bold text-heading mb-2">Asignación del Perfil</h3>
                            <p className="text-sm text-neutral-500">Carga el perfil profesional del colaborador</p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="size-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-[#007781] group-hover:border-[#007781] group-hover:border-primary transition-all mb-6 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-default-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">2</div>
                                <Brain className="size-10"/>
                            </div>
                            <h3 className="font-bold text-heading mb-2">Análisis del Perfil</h3>
                            <p className="text-sm text-neutral-500">Analizamos habilidades actuales y su experiencia</p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="size-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-[#007781] group-hover:border-[#007781] transition-all mb-6 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-default-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">3</div>
                                <GitCompare className="size-10"/>
                            </div>
                            <h3 className="font-bold text-heading mb-2">Comparación</h3>
                            <p className="text-sm text-neutral-500">Comparamos el perfil con los requerimientos del puesto.</p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="size-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-[#007781] group-hover:border-[#007781] transition-all mb-6 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-default-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">4</div>
                                <Target className="size-10"/>
                            </div>
                            <h3 className="font-bold text-heading mb-2">Brechas identificadas</h3>
                            <p className="text-sm text-neutral-500">Detectamos áreas de mejor especificas.</p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="size-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-2xl text-slate-400 group-hover:text-[#007781] group-hover:border-[#007781] transition-all mb-6 relative">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-default-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">5</div>
                                <Compass className="size-10"/>
                            </div>
                            <h3 className="font-bold text-heading mb-2">Ruta personalizada</h3>
                            <p className="text-sm text-neutral-500">Genera ruta de aprendizaje adaptado al rol.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Proceso;