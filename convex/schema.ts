import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.number()),
        photo: v.optional(v.string()),
        role: v.optional(v.id("roles")),
        cv: v.optional(v.string()),
        admin: v.boolean(),
    }),

    skills: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
    }),
    
    roles: defineTable({
        name: v.string(),
        description: v.string(),
    }),
    
    userSkills: defineTable({
        userId: v.id("users"),
        skillId: v.id("skills"),
        level: v.optional(v.number()),
    }),

    rolesSkills: defineTable({
        roleId: v.id("roles"),
        skillId: v.id("skills"),
    }),

    lessons: defineTable({
        skillId: v.id("skills"),
        title: v.string(),
        level: v.optional(v.number()),
        description: v.optional(v.string()),
        content: v.string(),
        example: v.string(),
        order: v.number(),
    }),

    quizzes: defineTable({
        lessonId: v.id("lessons"),
        question: v.string(),
        options: v.array(v.string()),
        answer: v.number(),
    }),

    // roleLessons: defineTable({
    //     roleId: v.id("roles"),
    //     lessonId: v.id("lessons"),
    //     order: v.number(),
    // }),

    userLessons: defineTable({
        userId: v.id("users"),
        lessonId: v.id("lessons"),
        completed: v.boolean(),
        score: v.optional(v.number()),
    }),
});