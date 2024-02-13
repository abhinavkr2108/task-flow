"use client";
import { Card, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface BoardCardProps {
  board: {
    id: number;
    name: string;
  };
}
export default function BoardCard({ board }: BoardCardProps) {
  const router = useRouter();
  return (
    <Card
      w={"full"}
      h={150}
      cursor={"pointer"}
      key={board.id}
      onClick={() => router.push(`dashboard/${board.id}`)}
    >
      <div className="flex h-full w-full justify-center items-center">
        <Heading fontSize={"md"}>{board.name}</Heading>
      </div>
    </Card>
  );
}
