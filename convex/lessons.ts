import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createLesson = mutation({
    args: {
        skillName: v.string(),
        title: v.string(),
        order: v.number(),
        level: v.optional(v.number()),
        content: v.string(),
        example: v.string(),
        quiz: v.array(v.object({
            question: v.string(),
            options: v.array(v.string()),
            correct: v.number(),
        })),
    }, handler: async (ctx, args)=>{
        const skill =  await ctx.db.query("skills")
            .filter(q => q.eq(q.field("name"), args.skillName)).
            first();

        if(!skill) return;

        const lessonId = await ctx.db.insert("lessons", {
            skillId: skill._id,
            title: args.title,
            order: args.order,
            level: args.level,
            content: args.content,
            example: args.example
        });

        if(!lessonId) return;

        // Crear quizzes asociados a la lección
        for(const quiz of args.quiz){
            await ctx.db.insert("quizzes",{
                lessonId: lessonId,
                question: quiz.question,
                options: quiz.options,
                answer: quiz.correct,
            });
        }

        return lessonId;
    }
});

export const getLessonCountsBySkillIds = query({
    args: { skillIds: v.array(v.id("skills")) },
    handler: async (ctx, args) => {
        const counts = await Promise.all(
            args.skillIds.map(async (skillId) => {
                const lessons = await ctx.db.query("lessons")
                    .filter(q => q.eq(q.field("skillId"), skillId))
                    .collect();
                return { skillId, count: lessons.length };
            })
        );
        return counts;
    }
});