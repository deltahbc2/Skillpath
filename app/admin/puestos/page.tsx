"use client";

import { ChangeEvent, useEffect, useId, useState } from "react";

const puestosPage = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [pdfError, setPdfError] = useState<string>("");
    const fileInputId = useId();

    useEffect(() => {
        if (!pdfFile) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(pdfFile);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [pdfFile]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;

        if (!selected) {
            setPdfFile(null);
            setPdfError("");
            return;
        }

        const isPdfByType = selected.type === "application/pdf";
        const isPdfByExt = selected.name.toLowerCase().endsWith(".pdf");

        if (!isPdfByType && !isPdfByExt) {
            setPdfFile(null);
            setPdfError("Solo se permiten archivos PDF.");
            return;
        }

        setPdfError("");
        setPdfFile(selected);
    };

    return (
        <section className="w-full max-w-300 flex items-center justify-center py-8 px-8 mx-auto min-h-screen">
            <form className="flex w-full flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <div className="w-full max-w-xl h-96 md:h-120 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-4">
                        <label
                            htmlFor="file"
                            className=" flex flex-col items-center justify-center h-full group cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 p-4 text-center transition-colors duration-300 hover:border-[#2da984]/60 dark:hover:border-[#60be7f] hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        >
                            <input
                                id="file"
                                type="file"
                                name="file"
                                accept="application/pdf,.pdf"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                            <span className="mb-3 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200 transition-colors duration-300 group-hover:text-[#008f86] dark:group-hover:text-neutral-900">Seleccionar CV</span>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Sube un archivo PDF para validar la información.</p>
                            {pdfFile && <p className="mt-4 truncate text-xs font-medium text-neutral-700 dark:text-neutral-400">{pdfFile.name}</p>}
                        </label>

                        {pdfError && <p className="mt-2 text-xs font-semibold text-red-600">{pdfError}</p>}

                        {previewUrl && (
                            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-300 bg-white">
                                <div className="border-b border-neutral-200 bg-neutral-50 px-3 py-2">
                                    <p className="text-xs font-semibold text-neutral-700">Previsualizacion</p>
                                </div>
                                <iframe
                                    title="Previsualizacion del PDF"
                                    src={previewUrl}
                                    className="h-72 w-full"
                                />
                            </div>
                        )}

                        {pdfFile && !previewUrl && (
                            <p className="mt-3 rounded-lg bg-neutral-100 px-3 py-2 text-xs text-neutral-700">
                                Archivo listo: <span className="font-semibold">{pdfFile.name}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col md:w-1/2 md:ml-4">
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className='text-[30px] font-semibold mb-2 focus:outline-none w-full max-w-215 rounded-md'
                        placeholder="Nombre"
                    />
                    <div className="flex gap-x-2">
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            className='text-2xl font-semibold text-[#B86112] mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Precio"
                        />
                        <input
                            type="number"
                            id="envio"
                            name="envio"
                            className='text-2xl font-semibold text-[#B86112] mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Envio"
                        />
                    </div>
                    <input 
                        type="text"
                        id="url"
                        name="url"
                        className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-80 rounded-md'
                        placeholder="Slug"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            id='categoria'
                            name="categoria"
                            className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Categoría"
                        />
                        <input
                            type="text"
                            id='subcategoria'
                            name="subcategoria"
                            className='text-lg font-semibold text-neutral-700 mb-2 focus:outline-none w-full max-w-50 rounded-md'
                            placeholder="Subcategoría"
                        />
                    </div>
                        
                    <button type="submit" className="bg-[#B86112] hover:bg-[#cb7818] font-semibold text-white h-12 w-36 rounded-lg transition-colors duration-300">GUARDAR</button>
                </div>
            </form>
        </section>
    );
}
 
export default puestosPage;