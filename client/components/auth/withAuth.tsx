import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth =
  <PageProps extends Record<string, unknown>>(Page: NextPage<PageProps>) =>
  ({ ...props }) => {
    const router = useRouter();
    const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
    useEffect(() => {
      if (initialized && !keycloak?.authenticated) {
        router.push("/");
      }
    }, [initialized, keycloak?.authenticated]);
    return (
      <>
        {initialized && keycloak?.authenticated && (
          <Page {...(props as PageProps)} />
        )}
      </>
    );
  };

export default withAuth;
