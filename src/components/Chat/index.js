import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Box, Flex, Input } from "@chakra-ui/core";
import { bindActionCreators } from "redux";

import { fetchMessages, submitMessage } from "../../store/messages/action";

import ChatItem from "../ChatItem";

const Chat = ({ submitMessage, fetchMessages, messages, user }) => {
  const [state, setState] = useState({
    text: ""
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  const onInputChage = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onEnter = e => {
    if (e.key === "Enter") {
      console.log("enter", user);
      submitMessage({
        text: state.text,
        userid: user.id
      });
    }
  };

  return (
    <Box h="100vh" w="40%" margin="auto">
      <Flex direction="column" h="100%">
        <Box bg="blue" h="90%" w="100%" border="solid 1px">
          {messages.map(message => {
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

const mapStateToProps = state => ({
  messages: state.messages.messages,
  user: state.users
});

const dispatchActionToProps = dispatch => ({
  submitMessage: bindActionCreators(submitMessage, dispatch),
  fetchMessages: bindActionCreators(fetchMessages, dispatch)
});

export default connect(mapStateToProps, dispatchActionToProps)(Chat);
