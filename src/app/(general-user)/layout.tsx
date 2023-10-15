"use client";

import { Spin } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function GeneraLUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <Spin />
      </div>
    );
  }
  return (
    <main>
      <h1>This is main home page</h1>
      <nav>
        <Link className="p-2" href="/home">
          Home
        </Link>
        <Link className="p-2" href="/about">
          about
        </Link>
        <Link className="p-2" href="/my-profile">
          My Profile
        </Link>
        <Link className="p-2" href="/dashboard">
          Dashboard
        </Link>
        <Link className="p-2" href="/seller/dashboard">
          Seller Dashboard
        </Link>
        <Link className="p-2" href="/buyer/dashboard">
          Buyer/Dashboard
        </Link>
        {sessionData ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link className="p-2" href="/auth/login">
            <button>Login</button>
          </Link>
        )}
      </nav>
      {JSON.stringify(sessionData)}
      {children}
    </main>
  );
}
