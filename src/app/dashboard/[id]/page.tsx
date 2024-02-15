"use server";
import React from "react";
import Board from "./components/Board";
import { getUserEmail } from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveBlocksClient";

export default async function BoardItemPage(props: { params: { id: string } }) {
  console.log("ID FROM URL: ");
  console.log(props.params.id);
  const boardId = props.params.id;
  const email = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  //Access
  const userAccess = boardInfo.usersAccesses?.[email]; // user access with key as email
  let hasAccess = userAccess && [...userAccess].includes("room:write"); // user access is not an array and includes only works on arrays

  if (!boardInfo) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-bold">
        Board Not Found
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="h-screen flex justify-center items-center text-lg font-bold">
        Access Denied
      </div>
    );
  }

  return (
    <div>
      <Board boardId={boardId} boardInfo={boardInfo} />
    </div>
  );
}
