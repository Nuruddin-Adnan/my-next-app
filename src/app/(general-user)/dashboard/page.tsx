import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import React from "react";

const Dashboard = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  return (
    <div>
      <h1>General User Dashboard</h1>
      <p>{JSON.stringify(token)}</p>
    </div>
  );
};

export default Dashboard;
