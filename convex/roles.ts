import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { createSkillInternal } from "./skills";

export const createRole = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        skills: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("roles")
            .filter(q => q.eq(q.field("name"), args.name))
            .first();

        if (existing) return

        const skillIds = await Promise.all(
            args.skills.map((skillName: string) =>
                createSkillInternal(ctx, { name: skillName, description: "" })
            )
        );

        const roleId = await ctx.db.insert("roles", {
            name: args.name,
            description: args.description,
        });

        await Promise.all(
            skillIds.map((skillId: any) => linkRoleSkillInternal(ctx, {roleId, skillId}))
        );

        return roleId;
    }
});

const linkRoleSkillInternal = async (ctx: any, { roleId, skillId }: { roleId: any, skillId: any }) => {
    const linkExists = await ctx.db.query("rolesSkills")
        .filter((q: any) =>
            q.and(
                q.eq(q.field("roleId"), roleId),
                q.eq(q.field("skillId"), skillId)
            )
        )
        .first();

    if (!linkExists) {
        await ctx.db.insert("rolesSkills", { roleId, skillId });
    }
};


export const getRoles = query({
    handler: async (ctx) => {
        const roles = await ctx.db.query("roles")
            .collect();
            
        return roles;
    }
});