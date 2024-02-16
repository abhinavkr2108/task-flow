import { liveblocksClient } from "@/lib/liveBlocksClient";

export async function addUserAccessToBoard(
  boardId: string,
  email: string
): Promise<boolean> {
  try {
    liveblocksClient.updateRoom(boardId, {
      usersAccesses: { [email]: ["room:write"] },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
