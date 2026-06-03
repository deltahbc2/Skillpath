import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        clerkUserId: v.optional(v.string()),
        name: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        photo: v.optional(v.string()),
        role: v.id("roles"),
        cv: v.string(),
        // admin: v.boolean(),
    },
    handler: async (ctx, args) => {
        const normalizedEmail = args.email.trim().toLowerCase();

        const existingByClerkId = args.clerkUserId
            ? await ctx.db.query("users")
                .filter(q => q.eq(q.field("clerkUserId"), args.clerkUserId))
                .first()
            : null;

        if (existingByClerkId) return existingByClerkId;

        const existingByEmail = await ctx.db.query("users")
            .filter(q => q.eq(q.field("email"), normalizedEmail))
            .first();

        if (existingByEmail) return existingByEmail;

        return await ctx.db.insert("users", {
            clerkUserId: args.clerkUserId,
            name: args.name,
            email: normalizedEmail,
            phone: args.phone,
            photo: args.photo,
            role: args.role,
            cv: args.cv,
            admin: false,
        });
    },
});

export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return null;
        }

        const byClerkUserId = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkUserId"), identity.subject))
            .first();

        return byClerkUserId;
    }
});

export const getCurrentUserByEmail = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const normalizedEmail = args.email.trim().toLowerCase();
        const users = await ctx.db.query("users").collect();

        return users.find((user) => user.email.trim().toLowerCase() === normalizedEmail) ?? null;
    }
});

export const syncCurrentUser = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return null;
        }

        const existingByClerkUserId = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkUserId"), identity.subject))
            .first();

        if (existingByClerkUserId) {
            return existingByClerkUserId;
        }

        return null;
    }
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