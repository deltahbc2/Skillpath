import { Search } from "lucide-react";

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

const NuevoPuestoPage = () => {
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto min-h-screen">
            <h2 className="text-lg font-medium text-neutral-900">Agregar puesto</h2>
            <h3 className="text-md font-medium text-neutral-500">Define un nuevo puesto y registra sus habilidades requeridas.</h3>

            <form className="flex w-full flex-col md:flex-row justify-center gap-4 mt-4">
                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6">Información del puesto</h3>

                    <label className="mb-2" htmlFor="nombre">Nombre del puesto</label>
                    <input
                        type="text"
                        id='nombre'
                        name="nombre"
                        className='text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4'
                        placeholder="Ej. Desarrollador Front End"
                    />

                    <label htmlFor="descripcion" className="mb-2">Descripción</label>
                    <textarea
                        id='descripcion'
                        name="descripcion"
                        className='text-md font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 focus:outline-none w-full rounded-md mb-4 min-h-15 max-h-30'
                        placeholder="Breve descripción del puesto"
                        rows={4}
                    />
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:mr-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <h3 className="text-lg font-medium mb-6">Habilidades requeridas</h3>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
                        <input
                            type="text"
                            id='habilidades'
                            name="habilidades"
                            className='text-sm font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 py-2 px-3 pl-9 focus:outline-none w-full rounded-md'
                            placeholder="Agregar habilidades..."
                        />
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 mb-6">
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades seleccionadas</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {skillOptions.map((skill) => {
                                return (
                                    <button
                                        key={skill}
                                        type="button"
                                        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 border-neutral-300 bg-neutral-100 text-neutral-700 hover:border-[#30aa85]/60 hover:text-[#30aa85] dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 cursor-pointer"
                                    >
                                        {skill}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button type="submit" className="bg-default-300 cursor-pointer font-semibold text-white h-10 w-38 rounded-lg transition-colors duration-300">GUARDAR</button>
                </div>
            </form>
        </section>
    );
}
 
export default NuevoPuestoPage;