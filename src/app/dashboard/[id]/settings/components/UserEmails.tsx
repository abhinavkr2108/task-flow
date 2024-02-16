"use client";
import { liveblocksClient } from "@/lib/liveBlocksClient";
import { IconButton } from "@chakra-ui/react";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa6";

interface UserEmailsProps {
  boardId: string;
  userAccesses: RoomAccesses;
  email: string;
}

export default function UserEmails({
  boardId,
  email,
  userAccesses,
}: UserEmailsProps) {
  const router = useRouter();

  const handleDelete = async (email: string) => {
    const room = await liveblocksClient.getRoom(boardId);
    const userAccesses: any = room.usersAccesses;
    userAccesses[email] = null;
    await liveblocksClient.updateRoom(boardId, { usersAccesses: userAccesses });
    router.refresh();
  };

  return (
    <div className="max-w-sm flex gap-2 justify-between items-center">
      <p>{email}</p>
      <IconButton
        colorScheme="red"
        aria-label="Delete Access"
        icon={<FaTrash />}
        onClick={() => {
          handleDelete(email);
        }}
      />
    </div>
  );
}
