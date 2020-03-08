import React from "react";

import { Box, Flex, Avatar, Heading, Text } from "@chakra-ui/core";

const ChatItem = ({ item }) => {
  console.log("item", item);
  return (
    <Box h="50px">
      <Flex direction="row">
        <Avatar size="sm" />
        <Flex direction="column">
          <Text>{item.user.name}</Text>
          <Text>{item.text}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatItem;
