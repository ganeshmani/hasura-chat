import React from "react";
import { Box, Flex, Input } from "@chakra-ui/core";
const Chat = () => {
  return (
    <Box h="100vh" w="40%" margin="auto">
      <Flex direction="column" h="100%">
        <Box bg="blue" h="90%" w="100%" border="solid 1px">
          {" "}
          Chat{" "}
        </Box>
        <Box bg="green" h="10%" w="100%">
          <Input placeholder="Enter a message" size="md" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Chat;
