import { Bot, ChartLine, CircleQuestionMark, Loader, LoaderCircle, Route, Star } from "lucide-react";

const Caracteristicas = () => {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-300 mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1e293b] mb-4">Características principales</h2>
                    <p className="text-lg text-neutral-500">Todo lo que necesitas para acelerar tu aprendizaje en una sola plataforma.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-default-100 rounded-bl-full opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <div className="size-14 bg-[#5cbb80]/20 text-default-500 rounded-3xl flex items-center justify-center text-2xl mb-6">
                            <Route className="size-6"/>
                        </div>
                        <h3 className="text-neutral-800 text-xl font-bold mb-3">Rutas de capacitación personalizadas</h3>
                        <p className="text-neutral-500 mb-6">El contenido se adapta al perfil del colaborador y a los requerimientos del puesto.</p>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                            <div className="bg-default-100 h-2.5 rounded-full w-[45%]"></div>
                        </div>
                        <div className="text-xs text-neutral-400 text-right">45% completado</div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-default-100 rounded-bl-full opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <div className="size-14 bg-[#5cbb80]/20 text-default-500 rounded-3xl flex items-center justify-center text-2xl mb-6">
                            <LoaderCircle className="size-6"/>
                        </div>
                        <h3 className="text-neutral-800 text-xl font-bold text-heading mb-3">Progreso y motivación</h3>
                        <p className="text-slate-500 mb-6">Impulsa el avance con indicadores de progreso y logros que fomentan la participación.</p>
                        <div className="flex gap-2">
                            <div className="bg-[#5cbb80]/20 px-3 py-1 text-xs text-default-900 font-semibold flex items-center gap-1 rounded-md">
                                <Star className="size-4"/>
                                <p> +50 XP</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-default-100 rounded-bl-full opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <div className="size-14 bg-[#5cbb80]/20 text-default-500 rounded-3xl flex items-center justify-center text-2xl mb-6">
                            <ChartLine className="size-6"/>
                        </div>
                        <h3 className="text-neutral-800 text-xl font-bold mb-3">Seguimiento en tiempo real</h3>
                        <p className="text-neutral-500 mb-6">Visualiza tu avance con métricas claras y paneles de control sobre tus nuevas habilidades.</p>
                        <div className="flex items-end gap-2 h-12">
                            <div className="w-8 bg-default-100 rounded-t-md h-1/3"></div>
                            <div className="w-8 bg-default-300 rounded-t-md h-1/2"></div>
                            <div className="w-8 bg-default-500 rounded-t-md h-3/4"></div>
                            <div className="w-8 bg-default-700 rounded-t-md h-full"></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-default-100 rounded-bl-full opacity-0 group-hover:opacity-5 transition-opacity"></div>
                        <div className="size-14 bg-[#5cbb80]/20 text-default-500 rounded-3xl flex items-center justify-center text-2xl mb-6">
                            <Bot className="size-6"/>
                        </div>
                        <h3 className="text-neutral-800 text-xl font-bold mb-3">Recomendaciones Inteligentes</h3>
                        <p className="text-neutral-500 mb-6">La inteligencia artificial sugiere contenidos y capacitaciones adicionales según el perfil y desempeño.</p>
                        <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="w-8 h-8 bg-default-300 text-white rounded-full flex items-center justify-center text-xs">
                                <CircleQuestionMark className="size-4"/>
                            </div>
                            <div className="text-sm font-medium text-slate-700">Sugerencia: Curso de React Avanzado</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Caracteristicas;