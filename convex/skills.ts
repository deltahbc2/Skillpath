import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export async function createSkillInternal(ctx: any, args: { name: string; description?: string }) {
    const existing = await ctx.db.query("skills")
        .filter((q: any) => q.eq(q.field("name"), args.name))
        .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("skills", {
        name: args.name,
        description: args.description ?? "",
    });

    return id;
}

export const createSkill = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await createSkillInternal(ctx, args);
    }
});

export const getSkillsByRoleId = query({
    args: {
        roleId: v.id("roles")
    },
    handler: async (ctx, args) => {
        const skills = await ctx.db.query("rolesSkills")
            .filter((q: any) => q.eq(q.field("roleId"), args.roleId))
            .collect();

        const skillNames = await Promise.all(skills.map((link: any) =>
            ctx.db.get("skills", link.skillId)
        ));

        return skillNames;
    }
});