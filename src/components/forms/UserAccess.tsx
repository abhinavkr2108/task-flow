"use client";
import { addUserAccessToBoard } from "@/app/actions/addUserAccessAction";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserAccess({ boardId }: { boardId: string }) {
  const [email, setEmail] = React.useState<string>("");
  const router = useRouter();

  const addUser = async (formData: FormData) => {
    const email = formData.get("email");
    await addUserAccessToBoard(boardId, email as string);
    router.refresh();
  };

  return (
    <form className="max-w-sm mt-4 flex flex-col gap-4" action={addUser}>
      <label className="block text-md font-medium text-gray-700">
        Add Email:
      </label>
      <Input
        placeholder="Enter Email"
        type="text"
        bgColor={"white"}
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button colorScheme="blue" type="submit" w={"full"}>
        Add User
      </Button>
    </form>
  );
}
