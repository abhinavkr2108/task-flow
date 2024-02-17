"use client";
import { Card, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { RoomInfo } from "@liveblocks/node";
import { useUpdateMyPresence } from "../../../../liveblocks.config";
import AvatarPresence from "@/components/AvatarPresence";

interface BoardCardProps {
  room: RoomInfo;
}
export default function BoardCard({ room }: BoardCardProps) {
  {
    !room && <Spinner />;
  }

  const router = useRouter();

  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    updateMyPresence({ boardId: room.id });
  }, [room.id]);

  console.log("PRESENCE:");
  // console.log(updateMyPresence);
  console.log(room.id);

  const navigateToBoardDetails = () => {
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
      <div className="relative flex h-full w-full justify-center items-center">
        <Heading fontSize={"md"}>{room.metadata.boardName}</Heading>
        <AvatarPresence presenceKey="boardId" presenceValue={room.id} />
      </div>
    </Card>
  );
}
