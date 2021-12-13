import { Box, Text } from "@chakra-ui/layout";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextPage } from "next";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import { LaunchServiceClient } from "../api/launch/launch_grpc_web_pb";
import { LaunchDetailRequest } from "../api/launch/launch_pb";
import withAuth from "../components/auth/withAuth";
import SendFeedback from "../components/feedback/SendFeedback";
import Stream from "../components/stream/Stream";

const StreamPage: NextPage = () => {
  const url = new URL(window.location.href);
  const name = url.searchParams.get("name");
  const namespace = url.searchParams.get("namespace");
  const { publicRuntimeConfig } = getConfig();

  const client = new LaunchServiceClient(publicRuntimeConfig.launchSvc);
  const detailsReq = new LaunchDetailRequest();
  if (name && namespace) {
    detailsReq.setName(name);
    detailsReq.setNamespace(namespace);
    detailsReq.setUsername(namespace);
  }
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
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
          let initPort = response.getLaunch()?.getNodePort();
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
      {port === 0 || ip === "" || !name || !namespace ? (
        <Text>Wait for it...</Text>
      ) : (
        <>
          <Stream port={port} ip={ip} />
          <SendFeedback username={namespace} name={name} />
        </>
      )}
    </>
  );
};

export default withAuth(StreamPage);
