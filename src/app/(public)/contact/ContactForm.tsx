"use client";

import serviceRevalidate from "./serviceRevalidate";

// import { redirect } from "next/navigation";

export default function ContactForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.email.value);
    await serviceRevalidate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="name" defaultValue={name} />
      <input
        type="text"
        name="email"
        placeholder="email"
        defaultValue={email}
      />
      <button>submit</button>
    </form>
  );
}
