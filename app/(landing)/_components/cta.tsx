"use client";

import { SignInButton } from "@clerk/react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const CallToAction = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <section id="cta" className="relative overflow-hidden py-24">
            <div className="absolute inset-0 z-0 bg-[#1e293b]"></div>
            <div className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
                <div className="absolute left-[-10%] top-[-20%] h-[70%] w-[50%] rounded-full bg-[#5cbb80]/20 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[40%] rounded-full bg-blue-500/20 blur-[100px]"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-200 px-6 text-center">
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    Impulsa la capacitacion de tu equipo con IA
                </h2>
                <p className="mb-10 text-xl text-neutral-300">
                    Analiza perfiles, detecta brechas y genera rutas de capacitacion personalizadas para cada colaborador.
                </p>

                <div className="inline-flex w-full max-w-md flex-col gap-2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm sm:flex-row">
                    {isLoading && (
                        <div className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#009388]/60 px-8 py-4 text-lg font-semibold text-white transition-all shadow-glow">
                            Cargando...
                        </div>
                    )}

                    {!isAuthenticated && !isLoading && (
                        <SignInButton mode="modal">
                            <button
                                type="button"
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-default-500 px-8 py-4 text-lg font-semibold text-white transition-all shadow-glow hover:bg-primary-hover"
                            >
                                Iniciar Sesion
                            </button>
                        </SignInButton>
                    )}

                    {isAuthenticated && !isLoading && (
                        <Link
                            href="/admin"
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-default-500 px-8 py-4 text-lg font-semibold text-white transition-all shadow-glow hover:bg-primary-hover"
                        >
                            Ir a mi ruta
                        </Link>
                    )}
                </div>
                <p className="mt-6 text-sm text-slate-400">
                    Inicia con el perfil de un colaborador y genera su ruta de capacitacion.
                </p>
            </div>
        </section>
    );
};

export default CallToAction;
