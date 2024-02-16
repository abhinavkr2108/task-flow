"use client";
import { liveblocksClient } from "@/lib/liveBlocksClient";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa6";

export default function DeleteBoard({ boardId }: { boardId: string }) {
  const router = useRouter();
  const deleteBoard = async () => {
    await liveblocksClient.deleteRoom(boardId);
  };
  return (
    <Link href={`/dashboard`}>
      <Button
        colorScheme="red"
        my={5}
        leftIcon={<FaTrash />}
        onClick={deleteBoard}
      >
        Delete Board
      </Button>
    </Link>
  );
}
