import { Text } from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextPage } from "next";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import { LaunchServiceClient } from "../api/launch/launch_grpc_web_pb";
import { LaunchDetailRequest } from "../api/launch/launch_pb";
import withAuth from "../components/auth/withAuth";
import GeneralLayout from "../components/layout/layout";

const Ide: NextPage = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const { publicRuntimeConfig } = getConfig();

  const url = new URL(window.location.href);
  const name = url.searchParams.get("name");
  const namespace = url.searchParams.get("namespace");
  const client = new LaunchServiceClient(publicRuntimeConfig.launchSvc);

  const detailsReq = new LaunchDetailRequest();

  if (name && namespace) {
    detailsReq.setName(name);
    detailsReq.setNamespace(namespace);
    detailsReq.setUsername(namespace);
  }
  const [port, setPort] = useState(0);
  const [ip, setIp] = useState("");
  useEffect(() => {
    if (keycloak?.token) {
      client.getLaunch(
        detailsReq,
        { authorization: keycloak?.token },
        (err, response) => {
          if (err !== null) {
            console.log(err);
            return;
          }
          let initPort = response.getLaunch()?.getTheiaPort();
          let initIp = response.getLaunch()?.getNodeIp();

          if (initPort) setPort(initPort);
          if (initIp) setIp(initIp);
          console.log(ip, "selected");
          console.log(port, "selected");
        }
      );
    }
  }, []);
  return (
    <>
      {port === 0 || ip === "" ? (
        <Text>Legen.. wait for it</Text>
      ) : (
        <iframe style={{ height: "100%" }} src={`http://${ip}:${port}`} />
      )}
    </>
  );
};

export default withAuth(Ide);
