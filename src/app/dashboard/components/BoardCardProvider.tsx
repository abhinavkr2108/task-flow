"use client";
import { RoomInfo } from "@liveblocks/node";
import React from "react";
import BoardCard from "./BoardCard";
import { RoomProvider } from "../../../../liveblocks.config";
import { Card, Heading, SimpleGrid } from "@chakra-ui/react";
import AvatarPresence from "@/components/AvatarPresence";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BoardCardProviderProps {
  rooms: RoomInfo[];
}
export default function BoardCardProvider({ rooms }: BoardCardProviderProps) {
  const router = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
      {rooms.map((room) => (
        <div key={room.id}>
          <Link href={`/dashboard/${room.id}`}>
            <Card
              w={"full"}
              h={150}
              cursor={"pointer"}
              key={room.id}
              className="relative"
            >
              <div className="relative flex h-full w-full justify-center items-center">
                <Heading fontSize={"md"}>{room.metadata.boardName}</Heading>
                <RoomProvider
                  initialPresence={{ boardId: null, columnId: null }}
                  id={room.id}
                >
                  <div className="absolute right-4 bottom-4">
                    <AvatarPresence
                      presenceKey="boardId"
                      presenceValue={room.id}
                    />
                  </div>
                </RoomProvider>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </SimpleGrid>
  );
}
