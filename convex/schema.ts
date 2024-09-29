// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),

    musicPreferences: defineTable({
      user_Id: v.string(),
      favoriteGenres: v.array(v.string()),
      sadMusic: v.array(v.string()),
      happyMusic: v.array(v.string()),
      workoutMusic: v.array(v.string()),
      angryMusic: v.array(v.string()),
      otherPreferences: v.array(v.string()),
    }).index("by_user", ["user_Id"]),
    songs: defineTable({
      user_Id: v.string(),
      title: v.string(),
      author: v.string(),
      timestamp: v.number(),
      isLiked: v.boolean(), 
    }).index("by_timestamp", ["timestamp"])
    .index("by_liked", ["isLiked"])
    .index("by_user", ["user_Id"])
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
