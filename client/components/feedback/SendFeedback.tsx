import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  IconButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import getConfig from "next/config";
import React, { useState } from "react";
import { IoCheckmarkCircle, IoSend } from "react-icons/io5";
import { FeedbackServiceClient } from "../../api/feedback/feedback_grpc_web_pb";
import { Comment, CommentRequest } from "../../api/feedback/feedback_pb";

interface Props {
  username: string;
  name: string;
}

const SendFeedback: React.FC<Props> = ({ username, name }) => {
  const { publicRuntimeConfig } = getConfig();
  const client = new FeedbackServiceClient(publicRuntimeConfig.feedbackSvc);
  const fbRequest = new CommentRequest();
  const fb = new Comment();
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [userComment, setUserComment] = useState("");
  const [rating, setRating] = useState(0);
  const [result, setResult] = useState(false);
  const sendComment = () => {
    fb.setName(name);
    fb.setComment(userComment);
    fb.setRating(rating);
    fb.setUsername(username);
    fbRequest.setComment(fb);
    if (keycloak?.token) {
      client.sendFeedback(
        fbRequest,
        { authorization: keycloak?.token },
        (err, response) => {
          if (err != null) {
            console.log(err);
            return;
          }
          setResult(true);

          console.log("feedback sended");
        }
      );
    }
  };
  const onOpen = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <IconButton
        ml={"auto"}
        background="none"
        aria-label="add"
        alignSelf="flex-end"
        icon={<IoSend />}
        onClick={onOpen}
      />

      <Modal isOpen={show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Launch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>Comment</FormLabel>
              <Input
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="What do you think about us?"
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Rating</FormLabel>
              <Input
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                placeholder="Name of deployment"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={sendComment}>
              {result ? <Icon as={IoCheckmarkCircle} /> : <Icon as={IoSend} />}
              <Text ml={2}>Submit</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendFeedback;
