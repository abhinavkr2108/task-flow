"use client";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { Task, useMutation } from "../../../liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import uniqid from "uniqid";

export default function NewTaskCard({ columnId }: { columnId: string }) {
  const [task, setTask] = useState("");

  const addTask = useMutation(
    ({ storage }, taskName: string) => {
      return storage.get("tasks").push(
        new LiveObject<Task>({
          id: uniqid().toString(),
          name: taskName,
          index: 9999,
          columnId: columnId,
        })
      );
    },
    [columnId]
  );

  const handleAddNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };
  return (
    <form onSubmit={handleAddNewTask}>
      <InputGroup>
        <Input
          placeholder="Enter Task Name"
          type="text"
          bgColor={"white"}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <InputRightElement width="4.5rem" pr={2}>
          <Button h="1.75rem" size="sm" type="submit" pr={2}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}
