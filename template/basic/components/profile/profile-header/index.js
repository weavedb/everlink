import { Box, Avatar } from "@chakra-ui/react";
import React from "react";

const ProfileHeader = ({ Username, ...props }) => {
  return (
    <Box position="relative" marginBottom={8}>
      <Box
        w="100%"
        h="200px"
        bgGradient="linear(to-r, green.200, pink.500)"
        borderRadius={5}
      />
      <Avatar
        background="orange.400"
        position="absolute"
        left={0}
        name={Username || "John Doe"}
        width={24}
        height={24}
        border="2px solid white"
        style={{
          bottom: -42,
          marginRight: 16,
          marginLeft: 32,
        }}
      />
    </Box>
  );
};

export default ProfileHeader;
