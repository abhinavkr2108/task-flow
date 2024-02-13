"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Container maxW={"3xl"} m={"auto"}>
        <Card w={"full"}>
          <CardHeader>
            <Heading fontSize={"2xl"} fontWeight={"bold"}>
              Login
            </Heading>
            <Text fontSize={"16px"} color={"gray.500"} fontWeight={"bold"}>
              to continue with TaskFlow
            </Text>
          </CardHeader>
          <CardBody>
            <Button
              variant={"outline"}
              colorScheme="gray"
              w={"full"}
              leftIcon={<FcGoogle />}
              onClick={() => signIn("google")}
            >
              Continue with Google
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
