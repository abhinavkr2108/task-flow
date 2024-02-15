"use client";
import NewColumn from "@/components/forms/NewColumn";
import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import { useBoardContext } from "../../../../../context/boardTitle";
import { IoSettingsSharp } from "react-icons/io5";
import { getUserEmail } from "@/lib/getUserEmail";
import { RoomProvider } from "../../../../../liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import { RoomInfo } from "@liveblocks/node";

const dummyColumns = [
  { name: "To Do", id: "col1", index: 0 },
  { name: "In Progress", id: "col2", index: 1 },
  { name: "Done", id: "col3", index: 2 },
];

const dummyTasks = [
  {
    id: "one",
    name: "Task 1",
    index: 5,
    columnId: "col1",
  },
  {
    id: "five",
    name: "Task 5",
    index: 1,
    columnId: "col1",
  },
  {
    id: "two",
    name: "Task 2",
    index: 2,
    columnId: "col2",
  },
  {
    id: "three",
    name: "Task 3",
    index: 3,
    columnId: "col3",
  },
];

export type TasksType = {
  id: string;
  name: string;
  index: number;
  columnId: string;
};

interface BoardProps {
  boardId: string;
  boardInfo: RoomInfo;
}

export default function Board({ boardId, boardInfo }: BoardProps) {
  const [tasks, setTasks] = useState<TasksType[]>(dummyTasks);
  const [columns, setColumns] = useState(dummyColumns);
  // const boardId = id.toString();
  // localStorage.setItem("boardId", boardId);

  return (
    <>
      <RoomProvider
        id={boardId}
        initialPresence={{}}
        initialStorage={{ columns: new LiveList(), tasks: new LiveList() }}
      >
        <ClientSideSuspense
          fallback={
            <div className="text-center h-screen">
              <Spinner />
            </div>
          }
        >
          {() => (
            <>
              <Columns boardInfo={boardInfo} />
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </>
  );
}
