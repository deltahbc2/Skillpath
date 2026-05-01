import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { skill, role } = await req.json();

    const prompt = `
Genera un roadmap de aprendizaje para la habilidad "${skill}" enfocado a un rol de "${role}".

Devuelve un JSON con este formato:

{
  "skill": "${skill}",
  "lessons": [
    {
      "title": "string",
      "content": "string",
      "example": "string",
      "quiz": [
        {
          "question": "string",
          "options": ["A","B","C"],
          "correct": 0
        }
      ]
    }
  ]
}

Máximo 5 lecciones. Contenido breve.
Responde SOLO con JSON válido. No agregues texto adicional.
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
      { success: false, error: "Error generating roadmap" },
      { status: 500 }
    );
  }
}