import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Nav from "./nav";
interface Props {
  title: string;
}
const GeneralLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <Flex background="gray.50" h={"100vh"}>
      <Nav />
      <Flex
        background="#fff"
        ml={20}
        mr={20}
        mt={30}
        flexDir="column"
        pos="sticky"
        left="5"
        h="95vh"
        marginTop="2.5vh"
        p="2%"
        boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
        borderRadius={"30px"}
        w={"100%"}
      >
        <Heading as="h3" size="md" color="gray.600">
          {title}
        </Heading>

        {children}
      </Flex>
    </Flex>
  );
};

export default GeneralLayout;
