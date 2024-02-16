"use client";
import { liveblocksClient } from "@/lib/liveBlocksClient";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
} from "@chakra-ui/react";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

interface BoardInfoProps {
  boardInfo: RoomInfo;
  boardName: string | string[];
  boardId: string;
}
export default function BoardInfo({
  boardInfo,
  boardName,
  boardId,
}: BoardInfoProps) {
  const [renameMode, setRenameMode] = useState<boolean>(false);
  const [renameValue, setRenameValue] = useState<string>("");

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (renameValue) {
      const boardInfo = await liveblocksClient.updateRoom(boardId, {
        metadata: {
          boardName: renameValue,
        },
      });
    }
    setRenameMode(!renameMode);
    window.location.reload();
  };

  return (
    <Flex alignItems={"center"} py={4}>
      {!renameMode && (
        <Heading fontSize={"2xl"} onClick={() => setRenameMode(!renameMode)}>
          {boardName}
        </Heading>
      )}

      {renameMode && (
        <form onSubmit={handleNameSubmit}>
          <InputGroup>
            <Input
              defaultValue={boardName}
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
      )}
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
  );
}
