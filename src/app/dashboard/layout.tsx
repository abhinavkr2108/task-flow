import Header from "@/components/Header";
import { Container } from "@chakra-ui/react";
import React from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-gray-50">
      <Header />
      <Container maxW={"7xl"} m={"auto"} pt={5}>
        {children}
      </Container>
    </div>
  );
}
