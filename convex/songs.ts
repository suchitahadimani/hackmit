import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to get the authenticated user's ID
const getUserId = async (ctx:any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity.subject;
};

export const getUserSongs = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    // Fetch songs for the authenticated user
    const songs = await ctx.db
      .query("songs")
      .withIndex("by_user", (q) => q.eq("user_Id", userId))
      .collect();

    return songs;
  },
});

export const addSong = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    isLiked: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const songId = await ctx.db.insert("songs", {
      user_Id: userId,
      title: args.title,
      author: args.author,
      timestamp: Date.now(),
      isLiked: args.isLiked,
    });
    return songId;
  },
});

export const getRecentSongs = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("songs")
      .withIndex("by_user", (q) => q.eq("user_Id", userId))
      .order("desc")
      .take(10);
  },
});

export const getLikedSongs = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("songs")
      .withIndex("by_user", (q) => q.eq("user_Id", userId))
      .filter(q => q.eq(q.field("isLiked"), true))
      .take(10);
  },
});

export const toggleLike = mutation({
  args: { id: v.id("songs") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const song = await ctx.db.get(args.id);
    if (!song) throw new Error("Song not found");
    if (song.user_Id !== userId) throw new Error("Not authorized to modify this song");

    await ctx.db.patch(args.id, { isLiked: !song.isLiked });
  },
});