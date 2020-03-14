import React from "react";

import { Box, Flex, Avatar, Heading, Text } from "@chakra-ui/core";

const ChatItem = ({ item }) => {
  return (
    <Box h="60px">
      <Flex direction="row" alignItems="center" height="100%">
        <Avatar size="sm" padding="4px" marginLeft="10px" />
        <Flex direction="column" margin="5px">
          <Text fontSize="xl" margin="0">
            {item.users.name}
          </Text>
          <Text margin="0">{item.text}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatItem;
