'use client';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MusicOptionCards } from "./MusicOptionCards";
import { useState } from "react";
import { Button } from "react-day-picker";

export default function Dashboard() {
  const genres = ["Pop", "Rock", "Hip Hop", "Electronic", "Classical", "Jazz", "R&B", "Country"];
  const moods = ["Happy", "Sad", "Energetic", "Calm", "Romantic", "Angry", "Nostalgic", "Excited"];
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to MoodMix</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Your Favorite Genres:</h2>
          <MusicOptionCards options={genres} onSelect={setSelectedGenres} />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Your Current Mood:</h2>
          <MusicOptionCards options={moods} onSelect={setSelectedMoods} />
        </div>
        <Button className="mt-8">Generate Playlist</Button>
    </div>
  );
}