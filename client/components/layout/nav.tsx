import { Avatar } from "@chakra-ui/avatar";
import { Divider, Flex, Heading, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { FiActivity, FiBox, FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import NavItem from "./navitem";

const Nav: React.FC = () => {
  const [smallNav, setsmallNav] = useState(false);
  return (
    <Flex
      background="#fff"
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      borderRadius={smallNav ? "15px" : "30px"}
      w={smallNav ? "75px" : "230px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={smallNav ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          aria-label="button"
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            setsmallNav(!smallNav);
          }}
        />
        <NavItem
          smallNav={smallNav}
          icon={FiBox}
          active={false}
          text="Marketplace"
        />
        <NavItem
          smallNav={smallNav}
          icon={FiActivity}
          active={false}
          text="Launches"
        />
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        mb={4}
        alignItems={smallNav ? "center" : "flex-start"}
      >
        <Divider display={smallNav ? "none" : "center"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" />
          <Flex flexDir="column" ml={4} display={smallNav ? "none" : "flex"}>
            <Heading as="h3" size="small">
              Username
            </Heading>
            <Text color="gray">Role</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Nav;
