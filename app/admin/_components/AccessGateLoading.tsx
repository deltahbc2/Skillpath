import { Loader2, Sparkles } from "lucide-react";

const AccessGateLoading = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(48,170,133,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(0,147,136,0.12),transparent_34%),linear-gradient(to_bottom_right,rgba(250,250,250,0.98),rgba(240,252,248,0.98))]" />
            <div className="absolute -left-20 top-10 size-56 rounded-full bg-[#30aa85]/12 blur-3xl" />
            <div className="absolute -right-16 bottom-0 size-64 rounded-full bg-[#009388]/10 blur-3xl" />

            <div className="relative w-full max-w-lg rounded-4xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[#30aa85]/12 text-[#009388] ring-1 ring-[#30aa85]/15">
                        <Sparkles className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">SkillPath</p>
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Verificando acceso</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#009388] shadow-sm ring-1 ring-neutral-200">
                        <Loader2 className="size-5 animate-spin" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">Comprobando tu perfil</p>
                        <p className="text-sm text-neutral-500">Estamos buscando el registro interno asociado a tu sesión.</p>
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-neutral-500">
                    <span className="h-2 w-2 rounded-full bg-[#30aa85]" />
                    Solo los usuarios registrados pueden entrar al sistema.
                </div>
            </div>
        </section>
    );
};

export default AccessGateLoading;