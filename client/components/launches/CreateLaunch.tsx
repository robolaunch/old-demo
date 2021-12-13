import React, { useEffect, useState } from "react";

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
  Text,
  Icon,
} from "@chakra-ui/react";
import { IoAdd, IoSend, IoCheckmarkCircle } from "react-icons/io5";
import { Launch, LaunchCreateRequest } from "../../api/launch/launch_pb";
import { LaunchServiceClient } from "../../api/launch/launch_grpc_web_pb";
import getConfig from "next/config";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

interface Props {
  onCreate: Function;
}
const CreateLaunch: React.FC<Props> = ({ onCreate }) => {
  // Get config from Next.config.js
  const { publicRuntimeConfig } = getConfig();

  //Launch gRPC connection declaration
  const client = new LaunchServiceClient(publicRuntimeConfig.launchSvc);
  const launchRequest = new LaunchCreateRequest();
  const launch = new Launch();

  //Get user information from auth provider
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  //State for paramaters of create launch request
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  // const [namespace, setNamespace] = useState("");
  //Predefined
  const [type, setType] = useState("DemoType");
  const [result, setResult] = useState(false);
  // Username should taken from Auth provider
  useEffect(() => {
    if (initialized && keycloak) {
      // @ts-ignore
      setUsername(keycloak.idTokenParsed?.preferred_username);
    }
  });

  const createLaunch = () => {
    if (username === "" || name === "") {
      console.error("Operation failed");
      return;
    }
    launch.setUsername(username);
    launch.setNamespace(username);
    launch.setName(name);
    launch.setRobotType(type);
    launchRequest.setLaunch(launch);
    if (initialized && keycloak?.token) {
      client.createLaunch(
        launchRequest,
        {
          authorization: keycloak?.token,
        },
        (err, response) => {
          if (err !== null) {
            console.log(err);
            return;
          }
          if (response.getIsOk()) {
            setResult(true);
            console.log("Launch created");
            onCreate();
            setTimeout(() => {
              setShow(false);
              setResult(false);
              setName("");
            }, 500);
          }
        }
      );
    }
  };
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
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of deployment"
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Type</FormLabel>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Robot Type"
                disabled
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Namespace</FormLabel>
              <Input value={username} isDisabled={true} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={createLaunch}>
              {result ? <Icon as={IoCheckmarkCircle} /> : <Icon as={IoSend} />}
              <Text ml={2}>Submit</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLaunch;
