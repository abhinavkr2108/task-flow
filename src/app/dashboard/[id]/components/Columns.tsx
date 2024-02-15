import NewColumn from "@/components/forms/NewColumn";
import { Button, Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useBoardContext } from "../../../../../context/boardTitle";
import ColumnCard from "./ColumnCard";
import { useStorage } from "../../../../../liveblocks.config";
import { RoomInfo } from "@liveblocks/node";

interface ColumnsProps {
  boardInfo: RoomInfo;
}
export default function Columns({ boardInfo }: ColumnsProps) {
  //   const { id, name } = useBoardContext();
  const boardName = boardInfo.metadata.boardName;

  const columns = useStorage((root) => root.columns);
  if (!columns) return;

  return (
    <div>
      <Flex alignItems={"center"} py={4}>
        <Heading fontSize={"2xl"}>{boardName}</Heading>
        <Spacer />
        <Button
          colorScheme="blue"
          color={"white"}
          rightIcon={<IoSettingsSharp />}
        >
          Board Settings
        </Button>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={10}
        pt={8}
      >
        {columns.length > 0 &&
          columns.map((column) => (
            <div key={column.id}>
              <ColumnCard column={column} /*tasks={[]} setTasks={() => {}}*/ />
            </div>
          ))}
        <NewColumn />
      </SimpleGrid>
    </div>
  );
}
