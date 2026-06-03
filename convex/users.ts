import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        photo: v.optional(v.string()),
        role: v.id("roles"),
        cv: v.string(),
        // admin: v.boolean(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("users")
            .filter(q => q.eq(q.field("userId"), args.userId))
            .first();

        if (existing) return existing;

        return await ctx.db.insert("users", {
            userId: args.userId,
            name: args.name,
            email: args.email,
            phone: args.phone,
            photo: args.photo,
            role: args.role,
            cv: args.cv,
            admin: false,
        });
    },
});

export const getUsers = query({
    handler: async (ctx) => {
        const roles = await ctx.db.query("users")
            .filter(q => q.eq(q.field("admin"), false))
            .collect();
            
        return roles;
    }
});

export const getUsersByRoleId = query({
    args: {
        roleId: v.id("roles"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("users")
            .filter(q => q.eq(q.field("role"), args.roleId))
            .collect();
    }
})

export const deleteUserById = mutation({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete("users", args.userId);
    },
});