import { NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        if (!(globalThis as { pdfjsWorker?: unknown }).pdfjsWorker) {
            // pdfjs-dist does not ship TS types for this worker module.
            // @ts-expect-error missing declaration for legacy worker module
            (globalThis as { pdfjsWorker?: unknown }).pdfjsWorker = await import("pdfjs-dist/legacy/build/pdf.worker.mjs");
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Debes enviar un archivo PDF." },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const typedArray = new Uint8Array(arrayBuffer);

        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdfDocument = await loadingTask.promise;

        const pagesText: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
            const page = await pdfDocument.getPage(pageNumber);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ");
            pagesText.push(pageText);
            page.cleanup();
        }

        await pdfDocument.destroy();

        return NextResponse.json({ text: pagesText.join("\n\n") });
    } catch (error) {
        const message = error instanceof Error ? error.message : "No se pudo procesar el PDF.";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}