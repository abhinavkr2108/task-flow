// "use server";
// import { getUserEmail } from "@/lib/getUserEmail";
// import { liveblocksClient } from "@/lib/liveBlocksClient";
// import { RoomInfo } from "@liveblocks/node";
// import React, { useState } from "react";
// import CreateBoard from "./CreateBoard";

// export default async function FetchBoards() {
//   // TODO: fetch boards from liveblocks

//   const email = await getUserEmail();
//   const data = await liveblocksClient.getRooms({ userId: email });
//   const rooms = data.data;

//   return (
//     <>
//       <CreateBoard rooms={rooms} />
//     </>
//   );
// }
