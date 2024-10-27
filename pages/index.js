import { useState } from "react"
import { Button, Flex, Input, Text } from "@chakra-ui/react"
import AppHeader from "@/components/AppHeader"

export default function Home({ _date = null }) {
  return (
    <>
      <Flex minH="100vh" bg="#0e2229">
        {/* Main Body Container */}
        <Flex
          flexDirection="column"
          flex="1" //fill available width horizontally
          gap={1}
          color="gray.200"
        >
          {/* AppHeader Container */}
          <Flex>
            <AppHeader />
          </Flex>

          {/* Main Content Container */}
          <Flex
            flex="1" //fill available height vertically
            bg="#1a2c38"
            padding={[2, 12]}
          >
            <Flex flexDirection="column" gap={2}>
              <Text>Welcome to EverLink</Text>
              <Text>Choose your EverLink undername.</Text>
              <Input placeholder="ar://xyz_everlink" />
              <Button>Continue</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
