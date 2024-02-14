"use server";
import { Button, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import BoardCard from "./BoardCard";
import { FaArrowRightLong } from "react-icons/fa6";
import CreateBoardBtn from "./CreateBoardBtn";
import { RoomInfo } from "@liveblocks/node";
import { getUserEmail } from "@/lib/getUserEmail";
import { liveblocksClient } from "@/lib/liveBlocksClient";

export default async function CreateBoard() {
  const email = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email });
  const boardItems = [
    {
      id: 1,
      name: "To Do",
    },
    {
      id: 2,
      name: "In Progress",
    },
    {
      id: 3,
      name: "Done",
    },
  ];
  console.log(rooms);
  return (
    <div className="pt-5">
      <>
        <Heading fontSize={"2xl"}>Your Boards:</Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={10}
          pt={5}
        >
          {rooms.map((room) => (
            <div key={room.id}>
              <BoardCard room={room} />
            </div>
          ))}
        </SimpleGrid>

        <CreateBoardBtn />
      </>
    </div>
  );
}
