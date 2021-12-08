import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  IconButton,
  Button,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";

const CreateLaunch = () => {
  const onOpen = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <Flex>
        <IconButton
          ml={"auto"}
          fontSize="xl"
          background="none"
          aria-label="add"
          alignSelf="flex-end"
          icon={<IoAdd />}
          onClick={onOpen}
        />
      </Flex>

      <Modal isOpen={show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Launch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Launch name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Namespace</FormLabel>
              <Input value="username" isDisabled={true} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLaunch;
