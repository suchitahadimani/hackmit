"use client"

import { useRouter } from 'next/navigation';
import { Authenticated, Unauthenticated } from "convex/react";
import { PlaylistDisplay } from "./PlaylistDisplay";
import { Link } from "@/components/typography/link"; // Adjust the import based on your project structure

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Authenticated>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold mb-8">Your Music Dashboard</h1>
          <div className="flex flex-col gap-8 w-full">
            <PlaylistDisplay title="Liked Songs" playlistType="liked" />
            <PlaylistDisplay title="Recent Songs" playlistType="recent" />
          </div>
        </div>
      </Authenticated>
      
      <Unauthenticated>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You need to be signed in to view this page.</p>
          <Link href="/" className="text-blue-500 underline">
            Go back to Home
          </Link>
        </div>
      </Unauthenticated>
    </main>
  );
}