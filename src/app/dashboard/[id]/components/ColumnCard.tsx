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
// import { TasksType } from "./Board";
import { ReactSortable } from "react-sortablejs";
import {
  Task,
  useMutation,
  useStorage,
} from "../../../../../liveblocks.config";
import NewTaskCard from "@/components/forms/NewTaskCard";

interface ColumnCardProps {
  column: {
    name: string;
    id: string;
  };
}
export default function ColumnCard({ column }: ColumnCardProps) {
  const tasksCards = useStorage<Task[]>((root) => {
    return root.tasks
      .filter((task) => task.columnId === column.id)
      .map((t) => ({ ...t }));
  });

  const sortedTasks = tasksCards?.sort((a, b) => a.index - b.index);
  if (!sortedTasks || sortedTasks === undefined) return;

  const updateTasks = useMutation(({ storage }, index, updatedData) => {
    const task = storage.get("tasks").get(index);
    console.log("TASK WITH INDEX:");
    console.log(task);
    console.log(index);
    if (!task) return;
    for (let key in updatedData) {
      task?.set(key as keyof Task, updatedData[key]);
    }
  }, []);

  const setTasksColumn = useMutation(
    ({ storage }, sortedTasks: Task[], columnId) => {
      console.log(sortedTasks, columnId);
      const idsOfSortedTasks = sortedTasks.map((task: Task) =>
        task.id.toString()
      );
      const allTasks = [...storage.get("tasks").map((t) => t.toObject())];
      idsOfSortedTasks.forEach((id, index) => {
        const taskStorageIndex = allTasks.findIndex(
          (t) => t.id.toString() === id
        );
        updateTasks(taskStorageIndex, { columnId: columnId, index: index });
      });
    },
    []
  );

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
              className="min-h-12"
              ghostClass="opacity-20"
            >
              {sortedTasks?.map((task) => (
                <div key={task.id} className="mt-3">
                  <div className="border rounded-md p-4">{task.name}</div>
                </div>
              ))}
            </ReactSortable>
          </ListItem>
          <NewTaskCard columnId={column.id} />
        </List>
      </CardBody>
    </Card>
  );
}
