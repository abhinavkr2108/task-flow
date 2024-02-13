"use server";
import { authOptions } from "@/lib/authOptions";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";

export async function createBoardAction(
  name: string
): Promise<false | RoomInfo> {
  const liveblocksClient = new Liveblocks({
    secret:
      "sk_dev_bWhFzT5z0jb37_mzCcRk1X2SsEi1nWf48H0UyJ-S8MhqrG379Hxj_nM_U_PWz2jP",
  });
  const roomId = new Date().getTime().toString();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString() || "";
  console.log(email);
  console.log(roomId);
  if (email) {
    const room = await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
      },
    });
    console.log(room);
    return room;
  }

  return false;
}
