import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
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
        selectedSkills: v.array(v.string()),
        // admin: v.boolean(),
    },
    handler: async (ctx, args) => {
        const normalizedEmail = args.email.trim().toLowerCase();

        const existingByClerkId = args.clerkUserId
            ? await ctx.db.query("users")
                .filter(q => q.eq(q.field("clerkUserId"), args.clerkUserId))
                .first()
            : null;

        const user = existingByClerkId ?? null;

        const existingByEmail = await ctx.db.query("users")
            .filter(q => q.eq(q.field("email"), normalizedEmail))
            .first();

        const existingUser = user ?? existingByEmail ?? null;
        const userId = existingUser?._id ?? await ctx.db.insert("users", {
            clerkUserId: args.clerkUserId,
            name: args.name,
            email: normalizedEmail,
            phone: args.phone,
            photo: args.photo,
            role: args.role,
            cv: args.cv,
            admin: false,
        });

        if (args.selectedSkills.length === 0) {
            return userId;
        }

        const existingUserSkills = await ctx.db.query("userSkills")
            .filter(q => q.eq(q.field("userId"), userId))
            .collect();

        const existingSkillIds = new Set(existingUserSkills.map((userSkill) => userSkill.skillId));
        const skills = await ctx.db.query("skills").collect();
        const skillsByName = new Map(
            skills.map((skill) => [skill.name.trim().toLowerCase(), skill._id] as const)
        );

        const skillsToInsert = args.selectedSkills
            .map((skillName) => skillsByName.get(skillName.trim().toLowerCase()))
            .filter((skillId): skillId is Id<"skills"> => skillId !== undefined)
            .filter((skillId) => !existingSkillIds.has(skillId));

        await Promise.all(
            skillsToInsert.map((skillId) =>
                ctx.db.insert("userSkills", {
                    userId,
                    skillId,
                })
            )
        );

        return userId;
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
