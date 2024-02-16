import NewColumn from "@/components/forms/NewColumn";
import { Button, Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useBoardContext } from "../../../../../context/boardTitle";
import ColumnCard from "./ColumnCard";
import { Column, useStorage } from "../../../../../liveblocks.config";
import { RoomInfo } from "@liveblocks/node";
import { ReactSortable } from "react-sortablejs";
import Link from "next/link";

interface ColumnsProps {
  boardInfo: RoomInfo;
}
export default function Columns({ boardInfo }: ColumnsProps) {
  const boardName = boardInfo.metadata.boardName;

  const columns = useStorage((root) => root.columns.map((c) => ({ ...c })));
  if (!columns) return;

  return (
    <div>
      <Flex alignItems={"center"} py={4}>
        <Heading fontSize={"2xl"}>{boardName}</Heading>
        <Spacer />
        <Link href={`/dashboard/${boardInfo.id}/settings`}>
          <Button
            colorScheme="blue"
            color={"white"}
            rightIcon={<IoSettingsSharp />}
          >
            Board Settings
          </Button>
        </Link>
      </Flex>
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
