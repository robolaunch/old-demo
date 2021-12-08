import React, { useState } from "react";
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

const LaunchTable: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [status2, setStatus2] = useState(false);

  return (
    <Box>
      <CreateLaunch />

      <Table>
        <Thead>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Namespace</Th>
          <Th></Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td>new-robot</Td>
            <Td fontWeight="600" color="gray.500">
              Default Robot
            </Td>
            <Td>username</Td>
            <Td>
              <Icon
                as={status ? IoStop : IoPlay}
                _hover={{ color: status ? "red.500" : "green.500" }}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>new-robot</Td>
            <Td fontWeight="600" color="gray.500">
              Default Robot
            </Td>
            <Td>username</Td>
            <Td>
              <Icon
                as={status2 ? IoStop : IoPlay}
                _hover={{ color: status2 ? "red.500" : "green.500" }}
              />
            </Td>
          </Tr>
        </Tbody>
        <TableCaption>All launches listed</TableCaption>
      </Table>
    </Box>
  );
};

export default LaunchTable;
