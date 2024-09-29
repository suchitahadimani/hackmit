"use client"

import { useRouter } from 'next/navigation';
import { Authenticated, Unauthenticated } from "convex/react";
import Home from "./Home/page";
import Dashboard from './Dashboard/page';

export default function Page() {
  const router = useRouter();

  return (
    <Home/>
  );
}