"use client";
import React from "react";
import { Presence, useOthers } from "../../liveblocks.config";
import { shallow } from "@liveblocks/client";
import { Avatar } from "@chakra-ui/react";

interface AvatarPresenceProps {
  presenceKey: keyof Presence;
  presenceValue: string;
}
export default function AvatarPresence({
  presenceKey,
  presenceValue,
}: AvatarPresenceProps) {
  const others = useOthers((users) => {
    return users.filter(
      (user) => user.presence?.[presenceKey] === presenceValue
    );
  }, shallow);
  console.log(others);

  return (
    <div>
      {others.map((user) => (
        <Avatar src={user.info?.picture?.toString() || ""} size={"sm"} />
      ))}
    </div>
  );
}
