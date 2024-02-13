import { Button, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import BoardCard from "./BoardCard";
import { FaArrowRightLong } from "react-icons/fa6";
import CreateBoardBtn from "./CreateBoardBtn";

export default function CreateBoard() {
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
  return (
    <div className="pt-5">
      <>
        <Heading fontSize={"2xl"}>Your Boards:</Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={10}
          pt={5}
        >
          {boardItems.map((board) => (
            <div key={board.id}>
              <BoardCard board={board} />
            </div>
          ))}
        </SimpleGrid>

        <CreateBoardBtn />
      </>
    </div>
  );
}
