import React, { useState, useEffect } from "react";

import { Box, Flex, Input } from "@chakra-ui/core";

import ChatItem from "../ChatItem";

import { useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messages {
      id
      text
      users {
        id
        name
      }
    }
  }
`;

const SUBMIT_MESSAGES = gql`
  mutation InsertMessages($text: String!, $userid: Int!) {
    insert_messages(objects: { text: $text, created_user: $userid }) {
      returning {
        text
        created_user
        users {
          name
          id
        }
        id
      }
    }
  }
`;

const Chat = () => {
  const [state, setState] = useState({
    text: ""
  });

  const [insert_messages, { returnData }] = useMutation(SUBMIT_MESSAGES);

  const { loading, error, data: { messages } = [] } = useSubscription(
    MESSAGES_SUBSCRIPTION
  );

  const onInputChage = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onEnter = e => {
    if (e.key === "Enter") {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);

      insert_messages({ variables: { text: state.text, userid: user.id } });

      setState({ text: "" });
    }
  };

  return (
    <Box h="100vh" w="40%" margin="auto">
      <Flex direction="column" h="100%">
        <Box bg="blue" h="90%" w="100%" border="solid 1px" overflowY="scroll">
          {messages &&
            messages.map(message => {
              return <ChatItem item={message} />;
            })}
        </Box>
        <Box bg="green" h="10%" w="100%">
          <Input
            placeholder="Enter a message"
            name="text"
            value={state.text}
            onChange={onInputChage}
            onKeyDown={onEnter}
            size="md"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
