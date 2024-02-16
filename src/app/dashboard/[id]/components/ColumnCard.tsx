"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
// import { TasksType } from "./Board";
import { ReactSortable } from "react-sortablejs";
import {
  Task,
  useMutation,
  useStorage,
} from "../../../../../liveblocks.config";
import NewTaskCard from "@/components/forms/NewTaskCard";
import { liveblocksClient } from "@/lib/liveBlocksClient";
import { FaCommentDots, FaTrash } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

interface ColumnCardProps {
  column: {
    name: string;
    id: string;
  };
}
export default function ColumnCard({ column }: ColumnCardProps) {
  const [renameMode, setRenameMode] = useState<boolean>(false);
  const [renameValue, setRenameValue] = useState<string>("");

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

  const updateColumn = useMutation(({ storage }, id, updatedName) => {
    const getCols = storage.get("columns");
    getCols.find((col) => col.toObject().id === id)?.set("name", updatedName);
  }, []);

  const deleteColumn = useMutation(({ storage }, id) => {
    const getCols = storage.get("columns");
    const colsIndex = getCols.findIndex((col) => col.toObject().id === id);
    getCols.delete(colsIndex);
  }, []);

  const handleNameSubmit = async () => {
    if (renameValue) {
      updateColumn(column.id, renameValue);
    }
    // window.location.reload();
    setRenameMode(!renameMode);
  };

  const handleDeleteColumn = async () => {
    await deleteColumn(column.id);
    setRenameMode(!renameMode);
  };

  return (
    <Card>
      <CardHeader>
        {!renameMode && (
          <>
            <Heading fontSize={"md"} onClick={() => setRenameMode(!renameMode)}>
              {column.name}
            </Heading>
          </>
        )}
        {renameMode && (
          <form action="">
            <form onSubmit={handleNameSubmit}>
              <InputGroup>
                <Input
                  defaultValue={column.name}
                  onChange={(e) => setRenameValue(e.target.value)}
                />
                <InputRightAddon
                  className="cursor-pointer"
                  onClick={handleNameSubmit}
                >
                  Rename
                </InputRightAddon>
              </InputGroup>
            </form>
          </form>
        )}
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
          <Button
            leftIcon={<FaTrash />}
            onClick={handleDeleteColumn}
            w={"full"}
            colorScheme="red"
          >
            Delete Column
          </Button>
        </List>
      </CardBody>
    </Card>
  );
}
