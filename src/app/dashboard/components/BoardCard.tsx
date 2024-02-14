"use client";
import { Card, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useBoardContext } from "../../../../context/boardTitle";
import { RoomInfo } from "@liveblocks/node";

interface BoardCardProps {
  room: RoomInfo;
}
export default function BoardCard({ room }: BoardCardProps) {
  {
    !room && <Spinner />;
  }
  const { id, name, setId, setName } = useBoardContext();
  const router = useRouter();

  const navigateToBoardDetails = () => {
    setId(room.id);
    setName(room.metadata.boardName as string);
    router.push(`/dashboard/${room.id}`);
  };
  return (
    <Card
      w={"full"}
      h={150}
      cursor={"pointer"}
      key={room.id}
      onClick={navigateToBoardDetails}
    >
      <div className="flex h-full w-full justify-center items-center">
        <Heading fontSize={"md"}>{room.metadata.boardName}</Heading>
      </div>
    </Card>
  );
}
