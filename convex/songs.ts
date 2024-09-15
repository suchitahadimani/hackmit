import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addSong = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    isLiked: v.boolean(), // Add this argument
  },
  handler: async (ctx, args) => {
    const songId = await ctx.db.insert("songs", {
      title: args.title,
      author: args.author,
      timestamp: Date.now(),
      isLiked: args.isLiked, // Include isLiked in the insert
    });
    return songId;
  },
});

export const getRecentSongs = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("songs")
      .order("desc")
      .take(10);
  },
});

export const getLikedSongs = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("songs")
      .filter(q => q.eq(q.field("isLiked"), true))
      .take(10);
  },
});

export const toggleLike = mutation({
  args: { id: v.id("songs") },
  handler: async (ctx, args) => {
    const song = await ctx.db.get(args.id);
    if (!song) throw new Error("Song not found");
    await ctx.db.patch(args.id, { isLiked: !song.isLiked });
  },
});