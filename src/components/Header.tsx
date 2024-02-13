import { authOptions } from "@/lib/authOptions";
import { Button, Container } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-12 w-screen px-12 bg-gray-200 z-30 shadow-md flex items-center justify-between">
      <Image src={"/task_flow_logo.png"} width={200} height={100} alt="logo" />
      <div className="flex gap-4 items-center">
        Welcome, {session?.user?.name}
        <Button colorScheme="red">Logout</Button>
      </div>
    </div>
  );
}
