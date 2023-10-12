import React from "react";
import LoginForm from "@/components/view/LoginForm";
import { NextRequest } from "next/server";

export default async function Login(request: NextRequest) {
  console.log(request);
  return (
    <div className="min-h-screen grid place-items-center">
      <LoginForm />
    </div>
  );
}
