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
import TableItem from "./TableItem";

const LaunchTable: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [status2, setStatus2] = useState(false);

  return (
    <Box>
      <Table>
        <Thead>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Namespace</Th>
          <Th></Th>
        </Thead>
        <Tbody>
          <TableItem
            name="new-robot"
            namespace="default"
            status={false}
            type="DefaultRobot"
          />
          <TableItem
            name="new-robot"
            namespace="default"
            status={true}
            type="DefaultRobot"
          />
          <TableItem
            name="new-robot"
            namespace="default"
            status={false}
            type="DefaultRobot"
          />
        </Tbody>
        <TableCaption>All launches listed</TableCaption>
      </Table>
    </Box>
  );
};

export default LaunchTable;
