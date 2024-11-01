import { Box, Avatar } from "@chakra-ui/react";
import React from "react";

const ProfileHeader = () => {
  return (
    <Box position="relative" marginBottom={8}>
      <img
        src="https://images.pexels.com/photos/28176437/pexels-photo-28176437/free-photo-of-scented-candles-decor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        style={{
          maxHeight: 200,
          objectFit: "cover",
          width: "100%",
          borderRadius: 8,
        }}
      />
      <Avatar
        position="absolute"
        left={0}
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
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
