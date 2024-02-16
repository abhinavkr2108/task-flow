import { liveblocksClient } from "@/lib/liveBlocksClient";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, update } = await request.json();
  await liveblocksClient.updateRoom(id, update);
  return Response.json(true);
}
