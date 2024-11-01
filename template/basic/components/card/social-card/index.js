import { Card, CardBody, Box, Avatar, Text, Button } from "@chakra-ui/react";
import React from "react";

const SocialCard = () => {
  return (
    <Card border="1px solid gray" borderColor="gray.300" active>
      <CardBody padding={4} display="flex" flexDir="column" gap={4}>
        <Box display="flex" gap={2}>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box>
            <Text fontSize={18} fontWeight="bold">
              Facebook
            </Text>
            <Text fontSize={14} color="gray.400">
              @username
            </Text>
          </Box>
        </Box>

        <Button variant="outline" width="100%">
          Visit
        </Button>
      </CardBody>
    </Card>
  );
};

export default SocialCard;
