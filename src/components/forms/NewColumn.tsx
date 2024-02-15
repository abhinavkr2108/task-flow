"use client";
import { Button, Input } from "@chakra-ui/react";
import React from "react";
import { useMutation } from "../../../liveblocks.config";
import uniqid from "uniqid";
import { LiveObject } from "@liveblocks/client";

export default function NewColumn() {
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    console.log(name);
  }, [name]);

  const addColumn = useMutation(({ storage }, columnName: string) => {
    const columns = storage.get("columns");
    return columns.push(
      new LiveObject({
        id: uniqid(),
        name: columnName,
        index: 9999,
      })
    );
  }, []);

  const handleAddNewColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    addColumn(name);
    setName("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <form className="max-w-sm" onSubmit={handleAddNewColumn}>
      <label className="block text-md font-medium text-gray-700">
        Enter Column Name:
      </label>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Enter Column Name"
          onChange={handleInputChange}
          value={name}
          bgColor={"white"}
        />
        <Button colorScheme="blue" type="submit" w={"full"}>
          Create Column
        </Button>
      </div>
    </form>
  );
}
