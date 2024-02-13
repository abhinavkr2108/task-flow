"use client";
import React, { createContext, useContext, useState } from "react";

interface BoardContextProps {
  id: number | string;
  name: string;
  setId: React.Dispatch<React.SetStateAction<number | string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const BoardContext = createContext<BoardContextProps>({
  id: 0,
  name: "",
  setId: () => {},
  setName: () => {},
});

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<number | string>(0);
  const [name, setName] = useState("");
  return (
    <BoardContext.Provider value={{ id, name, setId, setName }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
