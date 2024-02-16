"use server";
import UserAccess from "@/components/forms/UserAccess";
import { Button, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { getUserEmail } from "@/lib/getUserEmail";
import UserEmails from "./components/UserEmails";
import DeleteBoard from "./components/DeleteBoard";
import { liveblocksClient } from "@/lib/liveBlocksClient";

export default async function SettingsPage(props: { params: { id: string } }) {
  const boardId = props.params.id;
  const boardInfo = await liveblocksClient.getRoom(boardId);

  const emailsWithAccess = [];
  const info = boardInfo.usersAccesses;
  const userEmail = await getUserEmail();
  if (!userEmail) {
    return (
      <p className="text-center font-bold text-lg">
        You are not logged in! Please login to access this page
      </p>
    );
  }
  if (!boardInfo.usersAccesses[userEmail]) {
    return (
      <p className="text-center font-bold text-lg">
        You do not have access to this board
      </p>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <Link href={`/dashboard/${boardId}`}>
          <Button colorScheme="gray" my={5} leftIcon={<FaArrowLeft />}>
            Go back to board
          </Button>
        </Link>
        <DeleteBoard boardId={boardId} />
      </div>
      <Heading fontSize={"lg"}>
        Users with Access to board {boardInfo.metadata.boardName}:
      </Heading>
      <div className="flex flex-col gap-3">
        {Object.keys(boardInfo.usersAccesses).map((email) => {
          return (
            <UserEmails
              key={email}
              boardId={boardId}
              email={email}
              userAccesses={info}
            />
          );
        })}
      </div>

      <UserAccess boardId={boardId} />
    </div>
  );
}
