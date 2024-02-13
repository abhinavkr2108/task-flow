import Header from "@/components/Header";
import LoginPage from "@/components/LoginPage";
import { authOptions } from "@/lib/authOptions";
import { Session, getServerSession } from "next-auth";
import React from "react";
import CreateBoard from "./components/CreateBoard";

export default async function DashboardPage() {
  const session: Session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    return <LoginPage />;
  }
  return (
    <div>
      <CreateBoard />
    </div>
  );
}
