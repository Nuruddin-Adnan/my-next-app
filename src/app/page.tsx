"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <h1>This is main home page</h1>

      <button onClick={() => signOut()}>Sign out</button>
    </main>
  );
}
