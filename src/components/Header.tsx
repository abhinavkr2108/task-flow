import { authOptions } from "@/lib/authOptions";
import { Button, Container } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getUserEmail } from "@/lib/getUserEmail";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-12 w-screen px-12 bg-gray-200 z-30 shadow-md flex items-center justify-between">
      <Image src={"/task_flow_logo.png"} width={200} height={100} alt="logo" />
      <div className="flex gap-4 items-center">
        {session && (
          <div className="flex gap-3 items-center">
            Welcome {session.user?.name}
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
