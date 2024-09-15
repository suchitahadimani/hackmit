// convex/submitMusicPreferences.ts
import { mutation } from "./_generated/server";

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
      favoriteGenres,
      sadMusic,
      happyMusic,
      workoutMusic,
      angryMusic,
      otherPreferences
    });
    return musicPreferences;
  }
);