"use client";

import { SignInButton } from "@clerk/react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Hero = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    return (
        <section className="w-full flex justify-center bg-[linear-gradient(to_bottom_right,rgba(48,170,133,0),rgba(48,170,133,0.22))]">
            <div className="w-full flex flex-col md:flex-row items-center justify-center max-w-300 px-8 my-16">
                <div className="order-1 md:order-0 w-full md:w-1/2 px-0 md:px-4 my-4 md:my-0">
                    <h1 className="text-5xl md:text-6xl text-center md:text-start font-extrabold text-[#1e293b] leading-[1.1] tracking-tight mb-6">Capacitación inteligente <br/>
                        <span className="text-default-500">desde tu CV</span>
                    </h1>
                    <p className="text-[20px] text-center md:text-start text-neutral-500 dark:text-neutral-300 mb-6">Analiza tu perfil, detecta tus áreas de mejora y aprende con una ruta personalizada diseñada para impulsar tu carrera.</p>
                    <div className="w-full flex justify-center md:justify-start">
                        {isLoading && (
                            <div className="cursor-not-allowed inline-block bg-[#009388]/60 text-white py-2 px-4 rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-default-400">
                                Cargando...
                            </div>
                        )}
                        
                        {!isAuthenticated && !isLoading && (
                            <SignInButton>
                                <button className="cursor-pointer inline-block bg-default-500 text-white py-2 px-4 rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-default-400">
                                    Iniciar Sesión
                                </button>
                            </SignInButton>
                        )}

                        {isAuthenticated && !isLoading && (
                            <Link href="/admin" className="cursor-pointer items-center gap-2 bg-default-500 text-white py-2 px-4 rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-default-400">Ir a mi ruta</Link>
                        )}
                    </div>
                </div>
                <div className="order-0 md:order-1 w-full md:w-1/2 flex justify-center">
                    <img className="w-full rounded-2xl max-w-150" src="/roadmap.png" alt="Roadmap illustration"/>
                </div>
            </div>
        </section>
    );
}
 
export default Hero;