import NewColumn from "@/components/forms/NewColumn";
import { Button, Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useBoardContext } from "../../../../../context/boardTitle";
import ColumnCard from "./ColumnCard";
import {
  Column,
  useStorage,
  useUpdateMyPresence,
} from "../../../../../liveblocks.config";
import { RoomInfo } from "@liveblocks/node";
import { ReactSortable } from "react-sortablejs";
import Link from "next/link";
import BoardInfo from "./BoardInfo";

interface ColumnsProps {
  boardInfo: RoomInfo;
  boardId: string;
}
export default function Columns({ boardInfo, boardId }: ColumnsProps) {
  const boardName = boardInfo.metadata.boardName;
  const updateMyPresence = useUpdateMyPresence();
  useEffect(() => {
    updateMyPresence({ boardId: boardId });
  }, []);

  const columns = useStorage((root) => root.columns.map((c) => ({ ...c })));
  if (!columns) return;

  return (
    <div>
      <BoardInfo
        boardInfo={boardInfo}
        boardName={boardName}
        boardId={boardId}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} pt={5}>
        <>
          {columns.length > 0 &&
            columns.map((column) => (
              <ColumnCard
                key={column.id}
                column={column} /*tasks={[]} setTasks={() => {}}*/
              />
            ))}
          <NewColumn />
        </>
      </SimpleGrid>
    </div>
  );
}
