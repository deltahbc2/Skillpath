import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { createskillInternal } from "./skills";

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

        if (existing) return existing;

        await Promise.all(
            args.skills.map(skillName =>
                createskillInternal(ctx, {
                    name: skillName,
                    description: "",
                })
            )
        )

        const roleId = await ctx.db.insert("roles", {
            name: args.name,
            description: args.description,
        });
        
        return roleId;
    }
})