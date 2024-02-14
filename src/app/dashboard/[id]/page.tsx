"use server";
import React from "react";
import Board from "./components/Board";
import { getUserEmail } from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveBlocksClient";

export default async function BoardItemPage(props: { params: { id: string } }) {
  console.log("ID FROM URL: ");
  const boardId = props.params.id;
  const email = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);

  return (
    <div>
      <Board />
    </div>
  );
}
