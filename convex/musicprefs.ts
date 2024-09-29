// convex/submitMusicPreferences.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upsertMusicPreferences = mutation({
  args: {
    favoriteGenres: v.array(v.string()),
    sadMusic: v.array(v.string()),
    happyMusic: v.array(v.string()),
    workoutMusic: v.array(v.string()),
    angryMusic: v.array(v.string()),
    otherPreferences: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    const user_Id = identity.subject;

    // Check if the user already has preferences
    const existingPreferences = await ctx.db
      .query("musicPreferences")
      .withIndex("by_user", (q) => q.eq("user_Id", user_Id))
      .unique();

    if (existingPreferences) {
      // Update existing preferences
      return await ctx.db.patch(existingPreferences._id, args);
    } else {
      // Create new preferences
      return await ctx.db.insert("musicPreferences", {
        user_Id,
        ...args,
      });
    }
  },
});

/*
export const submitMusicPreferences = mutation(
  async ({ db }, {
    favoriteGenres,
    sadMusic,
    happyMusic,
    workoutMusic,
    angryMusic,
    otherPreferences
  }: {
    favoriteGenres: string[],
    sadMusic: string[],
    happyMusic: string[],
    workoutMusic: string[],
    angryMusic: string[],
    otherPreferences: string[]
  }) => {
    const musicPreferences = await db.insert("musicPreferences", {
      user_Id,
      favoriteGenres,
      sadMusic,
      happyMusic,
      workoutMusic,
      angryMusic,
      otherPreferences
    });
    return musicPreferences;
  }

); */