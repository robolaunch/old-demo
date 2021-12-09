import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import withAuth from "../components/auth/withAuth";
import CreateLaunch from "../components/launches/CreateLaunch";
import LaunchTable from "../components/launches/LaunchTable";
import GeneralLayout from "../components/layout/layout";
import Nav from "../components/layout/nav";

const LaunchPage: NextPage = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [username, setUsername] = useState<KeycloakTokenParsed>();
  useEffect(() => {
    if (initialized && keycloak) {
      // @ts-ignore
      setUsername(keycloak.idTokenParsed?.preferred_username);
    }
  });
  return (
    <>
      <CreateLaunch />

      <LaunchTable />
    </>
  );
};

export default withAuth(LaunchPage);
