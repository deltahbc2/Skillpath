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

const empleadoIdPage = () => {
    return (
        <section className="w-full max-w-300 flex flex-col py-8 px-8 mx-auto">
            <h2 className="text-lg font-medium text-neutral-900">Perfil del colaborador</h2>
            <h3 className="text-md font-medium text-neutral-500">Consulta los datos del colaborador, su puesto y su progreso en la capacitación.</h3>
            <form className="flex w-full flex-col md:flex-row items-center justify-center gap-4 mt-4">
                <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <div className="w-full max-w-xl h-[60vh] md:h-[80vh] max-h-150 rounded-2xl bg-neutral-200 dark:bg-neutral-800">
                        <div className="h-full overflow-hidden rounded-xl border bg-neutral-100 dark:bg-neutral-700">
                            <iframe
                                title="Previsualizacion del PDF"
                                src="/CV_CesarOliva.pdf"
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:ml-4 gap-y-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 p-5">
                    <div className="datos flex items-center space-x-4">
                        <img className="rounded-full size-20 object-cover border border-neutral-200 dark:border-neutral-700" src="/perfil.jpg" alt="Employee Profile Image"/>
                        <div>
                            <h2 className="text-2xl font-semibold text-neutral-800">César Emilio Oliva Vázquez</h2>
                            <p className="text-lg text-neutral-600">Front End Developer</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full">
                        <a href="mailto:cesaroliva.work@gmail.com" className=" py-2 px-3 rounded-md border border-neutral-300 text-md w-full sm:w-[60%] text-neutral-800 overflow-hidden">cesaroliva.work@gmail.com</a>
                        <a href="tel:8130416824" className=" py-2 px-3 rounded-md border border-neutral-300 text-md w-full sm:w-[40%] text-neutral-800">8130416824</a>
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">Habilidades</p>
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">10 / 10</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {skillOptions.map((skill) => {
                                return (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                                                "border-[#30aa85] bg-[#30aa85] text-white"
                                        }`}
                                    >
                                        {skill}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                        
                    <div>
                        <button type="submit" className="py-2 px-4 bg-default-300 cursor-pointer font-semibold text-white rounded-lg transition-colors duration-300">EDITAR</button>
                    </div>
                </div>
            </form>
        </section>
    );
}
 
export default empleadoIdPage;