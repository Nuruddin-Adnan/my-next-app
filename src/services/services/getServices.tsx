export default async function getServices() {
  const res = await fetch(
    "https://hospital-management-server-alpha.vercel.app/api/v1/services",
    {
      cache: "no-cache",
      next: { tags: ["service"] },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Fail to fetch data");
  }

  return res.json();
}
