import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({apiKey: process.env.GROQ_API_KEY,});

export async function POST(req: Request) {
    try {
        const { skill, role, description } = await req.json();

        const prompt = `
            Genera un roadmap de aprendizaje para la habilidad "${skill}" enfocado a un rol de "${role}", para "${description}".

            Devuelve un JSON con este formato:
            {
            "skill": "string",
            "lessons": [
                {
                "title": "string",
                "order": number,
                "level": "basic = 1 | intermediate = 2 | advanced = 3",
                "content": "explicación clara y útil (3-5 líneas)",
                "example": "ejemplo práctico real con código si aplica",
                "quiz": [
                    {
                    "question": "string",
                    "options": ["A","B","C"],
                    "correct": number
                    },
                    {
                    "question": "string",
                    "options": ["A","B","C"],
                    "correct": number
                    }
                ]
                }
            ]
            }

            Reglas:
            - Responde solo con JSON valido, sin texto adicional.
            - El nombre de la habildad NO debe cambiar al proporcionado.
            - Máximo 5 lecciones
            - Contenido práctico, no genérico
            - Ejemplos claros
            - 2 preguntas por lección
        `;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            });

            const text = completion.choices[0]?.message?.content || "";

            return NextResponse.json({
                success: true,
                data: text,
            });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "Error generado roadmap." },
            { status: 500 }
        );
    }
}