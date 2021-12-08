import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import withAuth from "../components/auth/withAuth";

const ProtectedPage: NextPage = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [username, setUsername] = useState<KeycloakTokenParsed>();
  useEffect(() => {
    if (initialized && keycloak) {
      // @ts-ignore
      setUsername(keycloak.idTokenParsed?.preferred_username);
    }
  });
  return (
    <div>
      <h1>Hello {username}</h1>
    </div>
  );
};

export default withAuth(ProtectedPage);
