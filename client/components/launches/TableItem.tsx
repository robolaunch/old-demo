import React from "react";
import { Th, Tr, Td, Icon } from "@chakra-ui/react";
import { IoStop, IoPlay } from "react-icons/io5";
interface Props {
  status: boolean;
  name: string;
  namespace: string;
  type: string;
}

const TableItem: React.FC<Props> = ({ status, name, namespace, type }) => {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td fontWeight="600" color="gray.500">
        {type}
      </Td>
      <Td>{namespace}</Td>
      <Td>
        <Icon
          as={status ? IoStop : IoPlay}
          _hover={{ color: status ? "red.500" : "green.500" }}
        />
      </Td>
    </Tr>
  );
};

export default TableItem;
