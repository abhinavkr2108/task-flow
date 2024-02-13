"use client";
import { Button, Input } from "@chakra-ui/react";
import React from "react";

export default function NewColumn() {
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    console.log(name);
  }, [name]);

  const handleAddNewColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(name);
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
