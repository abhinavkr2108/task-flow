"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { TasksType } from "./Board";
import { ReactSortable } from "react-sortablejs";

interface ColumnCardProps {
  column: {
    name: string;
    id: number | string;
  };
  tasks: TasksType[];
  //   setTasks: (tasks: TasksType[]) => void;
  setTasks: React.Dispatch<React.SetStateAction<TasksType[]>>;
}
export default function ColumnCard({
  column,
  tasks,
  setTasks,
}: ColumnCardProps) {
  const sortedTasks = tasks.sort((a, b) => a.index - b.index);
  const setTasksColumn = (tasks: TasksType[], id: string | number) => {
    const taskIds = tasks.map((task) => task.id);

    setTasks((prevTasks: TasksType[]) => {
      const newTasks = [...prevTasks];
      newTasks.forEach((task) => {
        if (taskIds.includes(task.id)) {
          task.columnId = id;
          console.log(`Task Name: ${task.name} moved to ${column.name}`);
        }
      });
      return newTasks;
    });
  };

  return (
    <Card>
      <CardHeader>
        <Heading fontSize={"md"}>{column.name}</Heading>
      </CardHeader>
      <CardBody>
        <List spacing={3}>
          <ListItem className="cursor-grab">
            <ReactSortable
              list={sortedTasks}
              setList={(sortedTasks) => setTasksColumn(sortedTasks, column.id)}
              group={"cards"}
            >
              {sortedTasks.map((task) => (
                <div key={task.id} className="mt-3">
                  <div className="border rounded-md p-4">{task.name}</div>
                </div>
              ))}
            </ReactSortable>
          </ListItem>
        </List>
      </CardBody>
    </Card>
  );
}
