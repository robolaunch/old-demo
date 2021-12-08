import React, { useState } from "react";

import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
interface Props {
  smallNav: boolean;
  icon: IconType;
  active: boolean;
  text: string;
}

const NavItem: React.FC<Props> = ({ smallNav, active, icon, text }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={smallNav ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          //@ts-ignore
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          //@ts-ignore
          w={smallNav && "100%"}
        >
          <MenuButton w="100%">
            <Flex
              justifyContent={smallNav ? "center" : "flex-start"}
              alignItems={"center"}
            >
              <Icon
                as={icon}
                fontSize="xl"
                mr={0}
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={smallNav ? "none" : "flex"}>
                {text}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
