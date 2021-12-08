import "../styles/globals.css";
import type { AppProps } from "next/app";
import cookie from "cookie";
import { KeycloakConfig } from "keycloak-js";
import getConfig from "next/config";
import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import { ChakraProvider } from "@chakra-ui/react";

interface AppPropsWithCookies extends AppProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppPropsWithCookies) {
  const { publicRuntimeConfig } = getConfig();
  const keycloakCfg: KeycloakConfig = {
    realm: publicRuntimeConfig.keycloak.realm,
    url: publicRuntimeConfig.keycloak.url,
    clientId: publicRuntimeConfig.keycloak.clientId,
  };
  const keycloakInitOptions = {
    onLoad: "check-sso",
    silentCheckSsoRedirectUri: `${publicRuntimeConfig.baseUrl}/silent-check-sso.html`,
    pkceMethod: "S256",
  };
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={keycloakInitOptions}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SSRKeycloakProvider>
  );
}

export default MyApp;
