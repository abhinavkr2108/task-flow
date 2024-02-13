"use client";
import { createBoardAction } from "@/app/actions/createBoardAction";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useBoardContext } from "../../../../context/boardTitle";
import { redirect, useRouter } from "next/navigation";
import { RoomInfo } from "@liveblocks/node";

export default function CreateBoardBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setId, setName } = useBoardContext();
  const router = useRouter();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleCreateNewBoard = async (formData: FormData) => {
    const boardName = formData.get("name");
    console.log(boardName);

    setName(boardName as string);
    // Create board action function:
    const roomInfo = await createBoardAction(boardName as string);
    if (roomInfo) {
      setId(roomInfo.id);
      redirect(`/dashboard/${roomInfo.id}`);
    }
  };

  return (
    <Box pt={5}>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        rightIcon={<FaArrowRightLong />}
      >
        Create Board
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form action={handleCreateNewBoard}>
              <FormLabel>Board Name</FormLabel>
              <Input
                type="text"
                name="name"
                ref={initialRef}
                placeholder="Name of your board"
              />
              <Button colorScheme="blue" mt={5} type="submit">
                Create
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
