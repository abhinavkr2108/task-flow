"use client";
import { Card, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useBoardContext } from "../../../../context/boardTitle";

interface BoardCardProps {
  board: {
    id: number;
    name: string;
  };
}
export default function BoardCard({ board }: BoardCardProps) {
  const { id, name, setId, setName } = useBoardContext();
  const router = useRouter();

  const navigateToBoardDetails = () => {
    setId(board.id);
    setName(board.name);
    router.push(`/dashboard/${board.id}`);
  };
  return (
    <Card
      w={"full"}
      h={150}
      cursor={"pointer"}
      key={board.id}
      onClick={navigateToBoardDetails}
    >
      <div className="flex h-full w-full justify-center items-center">
        <Heading fontSize={"md"}>{board.name}</Heading>
      </div>
    </Card>
  );
}
