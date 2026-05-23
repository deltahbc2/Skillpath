import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";
import { parseRoadmapData } from "../nuevo/parseRoadmap";

type CreateLessonMutation = (args: {
    roleId: Id<"roles">;
    skillName: string;
    title: string;
    order: number;
    level?: number;
    content: string;
    example: string;
    quiz: Array<{
        question: string;
        options: string[];
        correct: number;
    }>;
}) => Promise<unknown>;

export const generateRoadmapsForNewSkills = async (
    newSkills: string[],
    editedName: string,
    editedDescription: string,
    roleId: Id<"roles">,
    createLesson: CreateLessonMutation
) => {
    
    const generatePromises = newSkills.map((skill) =>
        fetch("/api/generate-roadmap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skill, role: editedName.trim(), description: editedDescription.trim() }),
        }).then(async (res) => {
            if (!res.ok) throw new Error("Error al generar roadmap");
            const json = await res.json();
            return { skill, json };
        })
    );

    const results = await Promise.allSettled(generatePromises);
    const fulfilled = results.filter((result): result is PromiseFulfilledResult<{ skill: string; json: { data: string } }> => result.status === "fulfilled");

    if (fulfilled.length === 0) {
        toast.error("No se generaron roadmaps para las nuevas habilidades.");
        return;
    }

    const lessonPromises = fulfilled.flatMap((result) => {
        const roadmap = parseRoadmapData(result.value.json.data) as {
            lessons?: Array<{
                title: string;
                order?: number;
                level?: number;
                content: string;
                example: string;
                quiz?: Array<{
                    question: string;
                    options: string[];
                    correct: number;
                }>;
            }>;
        } | null;

        if (!roadmap?.lessons?.length) return [];

        return roadmap.lessons.map((lesson, index) =>
            createLesson({
                roleId,
                skillName: result.value.skill,
                title: lesson.title,
                order: lesson.order ?? index + 1,
                level: lesson.level,
                content: lesson.content,
                example: lesson.example,
                quiz: lesson.quiz ?? [],
            })
        );
    });

    await Promise.allSettled(lessonPromises);
    toast.success(`Roadmaps generados: ${fulfilled.length}/${newSkills.length}`);
};