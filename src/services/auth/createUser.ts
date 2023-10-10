import { IUser } from "@/interfaces/shared";

export default async function createUser(payload: IUser) {
  const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  // if (!res.ok) {
  //   throw new Error("Fail to fetch data");
  // }

  return res.json();
}
