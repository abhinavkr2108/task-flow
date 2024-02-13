"use client";
import NewColumn from "@/components/forms/NewColumn";
import { Container, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import ColumnCard from "./ColumnCard";

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
  columnId: number | string;
};

export default function Board() {
  const [tasks, setTasks] = useState<TasksType[]>(dummyTasks);
  const [columns, setColumns] = useState(dummyColumns);
  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
        {dummyColumns.map((column) => (
          <div key={column.id}>
            <ColumnCard
              column={column}
              tasks={dummyTasks.filter((task) => task.columnId === column.id)}
              setTasks={setTasks}
            />
          </div>
        ))}
        <NewColumn />
      </SimpleGrid>
    </>
  );
}
