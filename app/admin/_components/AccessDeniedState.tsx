import Link from "next/link";
import { LockKeyhole, ArrowLeft, Sparkles } from "lucide-react";

const AccessDeniedState = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,93,93,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(48,170,133,0.12),transparent_32%),linear-gradient(to_bottom_right,rgba(250,250,250,0.98),rgba(255,247,247,0.98))]" />
            <div className="absolute -left-20 top-12 size-56 rounded-full bg-red-300/20 blur-3xl" />
            <div className="absolute -right-16 bottom-0 size-64 rounded-full bg-[#30aa85]/10 blur-3xl" />

            <div className="relative w-full max-w-xl rounded-4xl border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                        <LockKeyhole className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Acceso restringido</p>
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Tu cuenta aún no está habilitada</h2>
                    </div>
                </div>

                <p className="max-w-lg text-sm leading-6 text-neutral-600">
                    Iniciaste sesión con Clerk, pero todavía no existe un registro interno asociado a tu correo o identidad. Por seguridad no mostramos el sistema hasta que un administrador te dé de alta.
                </p>

                <div className="mt-6 grid gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                    <div className="flex items-start gap-3">
                        <span className="mt-1 size-2 rounded-full bg-[#30aa85]" />
                        <span>Si ya te registraron, vuelve a iniciar sesión para refrescar tu acceso.</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-1 size-2 rounded-full bg-[#009388]" />
                        <span>Si no, pide a un administrador que cree tu perfil primero.</span>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#009388] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#007781]"
                    >
                        <ArrowLeft className="size-4" />
                        Volver al inicio
                    </Link>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-600">
                        <Sparkles className="size-4 text-[#30aa85]" />
                        Esperando alta interna
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccessDeniedState;