"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export default async function serviceRevalidate() {
  revalidateTag("service"); // Update cached
  //   redirect("service");
}
