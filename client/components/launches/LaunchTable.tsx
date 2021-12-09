import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Icon,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { FiPlay } from "react-icons/fi";
import { IoStop, IoPlay } from "react-icons/io5";
import CreateLaunch from "./CreateLaunch";
import TableItem from "./TableItem";
import getConfig from "next/config";
import { LaunchServiceClient } from "../../api/launch_grpc_web_pb";
import {
  Launch,
  LaunchDeleteRequest,
  ListLaunchRequest,
  ListLaunchResponse,
} from "../../api/launch_pb";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

const LaunchTable: React.FC = () => {
  const { publicRuntimeConfig } = getConfig();

  const client = new LaunchServiceClient(publicRuntimeConfig.launchSvc);
  const launchRequest = new ListLaunchRequest();

  const [username, setUsername] = useState("");
  const [elements, setElements] = useState<Launch[] | undefined>(undefined);

  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const deleteLaunch = (name: string, namespace: string) => {
    const deleteRequest = new LaunchDeleteRequest();

    deleteRequest.setName(name);
    deleteRequest.setNamespace(namespace);
    deleteRequest.setUsername(namespace);
    if (!keycloak?.token) {
      console.log("Keycloak not initialized");
      return;
    }
    client.deleteLaunch(
      deleteRequest,

      { authorization: keycloak?.token },
      (err, response) => {
        if (err != null) {
          console.error("Deletion operation failed");
        } else if (response.getIsOk()) {
          console.log("Launch deleted");
          getList();
        }
      }
    );
  };
  useEffect(() => {
    if (initialized && keycloak) {
      // @ts-ignore
      setUsername(keycloak.idTokenParsed?.preferred_username);
      getList();
    }
  }, []);
  const getList = () => {
    if (keycloak?.token)
      client.listLaunch(
        launchRequest,
        { authorization: keycloak?.token },
        (err, response) => {
          if (err !== null) {
            console.log("Could not fetched", err);
          } else {
            setElements(response.getLaunchesList());
            console.log(elements);
          }
        }
      );
  };
  return (
    <Box>
      <CreateLaunch onCreate={()=>getList()} />

      <Table>
        <Thead>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Namespace</Th>
          <Th></Th>
          <Th></Th>
        </Thead>
        <Tbody>
          {/* @ts-ignore */}
          {elements &&
            elements.map((element) => (
              <TableItem
                name={element.getName()}
                namespace={element.getNamespace()}
                status={element.getWorkloadStatus()}
                type={element.getRobotType()}
                onDelete={() =>
                  deleteLaunch(element.getName(), element.getNamespace())
                }
              />
            ))}
        </Tbody>
        <TableCaption>All launches listed</TableCaption>
      </Table>
    </Box>
  );
};

export default LaunchTable;
