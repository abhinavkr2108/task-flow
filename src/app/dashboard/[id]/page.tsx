import { useParams, useRouter } from "next/navigation";
import React from "react";
import Board from "./components/Board";

export default function BoardItemPage() {
  //   const { id } = useParams();
  return (
    <div>
      <Board />
    </div>
  );
}
