"use client"

import { PlaylistDisplay } from "./PlaylistDisplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Your Music Dashboard</h1>
        <div className="flex flex-col gap-8 w-full">
          <PlaylistDisplay title="Liked Songs" playlistType="liked" />
          <PlaylistDisplay title="Recent Songs" playlistType="recent" />
        </div>
      </div>
    </main>
  );
}