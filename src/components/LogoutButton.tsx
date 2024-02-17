"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LogoutButton() {
  return (
    <Link href={"/"}>
      <Button colorScheme="red" onClick={() => signOut()}>
        Logout
      </Button>
    </Link>
  );
}
