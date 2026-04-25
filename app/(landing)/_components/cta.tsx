const CallToAction = () => {
    return (
        <section id="cta" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#1e293b] z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-[#5cbb80]/20 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]"></div>
            </div>

            <div className="max-w-200 mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Impulsa la capacitación de tu equipo con IA</h2>
                <p className="text-xl text-neutral-300 mb-10">Analiza perfiles, detecta brechas y genera rutas de capacitación personalizadas para cada colaborador.</p>
                
                <div className="bg-white/10 p-2 rounded-full inline-flex flex-col sm:flex-row gap-2 backdrop-blur-sm border border-white/20 w-full max-w-md mx-auto">
                    <button className="bg-default-500 hover:bg-primary-hover text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-glow flex-1 flex items-center justify-center gap-2">
                        Iniciar Sesión
                    </button>
                </div>
                <p className="text-sm text-slate-400 mt-6">Inicia con el perfil de un colaborador y genera su ruta de capacitación.</p>
            </div>
        </section>
    );
}
 
export default CallToAction;