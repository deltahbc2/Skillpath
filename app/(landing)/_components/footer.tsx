const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[#1e293b] text-white mt-[-1px]">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]"></div>

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-default-500/30 blur-3xl"></div>
                <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-default-100/20 blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-300 px-6 pb-8 pt-12">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-8 grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.6fr_1fr_1fr]">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-default-100">SkillPath by DeltaHBC</p>
                            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">Capacitacion inteligente para equipos de alto impacto</h3>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200">
                                Convertimos perfiles profesionales en rutas accionables de aprendizaje para cerrar brechas y acelerar resultados.
                            </p>
                        </div>

                        <div className="space-y-3 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Contacto</p>
                            <a
                                href="mailto:contacto@deltahbc.com"
                                className="block rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-medium transition-colors hover:bg-white/20"
                            >
                                contacto@deltahbc.com
                            </a>
                            <p className="text-xs text-slate-300">¿Necesitas más información? Escríbenos y con gusto te ayudamos.</p>
                        </div>

                        <div className="space-y-3 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Sobre Nosotros</p>
                            <a
                                href="https://deltahbc.com"
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-xl border border-default-100/40 bg-default-500/20 px-4 py-3 font-medium text-default-100 transition-colors hover:bg-default-500/35"
                            >
                                deltahbc.com
                            </a>
                            <p className="text-xs text-slate-300">Conoce al equipo detrás de SkillPath y nuestra visión.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 text-xs text-slate-300 md:flex-row md:items-center md:justify-between">
                        <p>© {currentYear} DeltaHBC. Todos los derechos reservados.</p>
                        <p>SkillPath. Capacitación Inteligente desde tu CV.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
