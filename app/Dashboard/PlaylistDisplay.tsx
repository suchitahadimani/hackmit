//THIS CREATES THE CARDS WHICH THE SONGS ARE DISPLAYED ON

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface PlaylistDisplayProps {
  title: string;
  playlistType: "liked" | "recent";
}

export function PlaylistDisplay({ title, playlistType }: PlaylistDisplayProps) {
  const songs = useQuery(
    playlistType === "liked" ? api.songs.getLikedSongs : api.songs.getRecentSongs
  );
  const toggleLike = useMutation(api.songs.toggleLike);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      {songs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song) => (
            <Card key={song._id} className="w-full">
              <CardHeader>
                <CardTitle className="text-white">{song.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">{song.author}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => toggleLike({ id: song._id })}
                  variant={song.isLiked ? "default" : "outline"}
                >
                  {song.isLiked ? "Unlike" : "Like"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-black">Loading songs...</p>
      )}
    </div>
  );
}