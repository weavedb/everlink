import {
  Flex,
  Text,
  Input,
  Button,
  ChakraProvider,
  useToast,
  Box,
} from "@chakra-ui/react"
import { useState } from "react"
import { ANT } from "@ar.io/sdk/web"
import { useAppContext } from "@/context/AppContext"

const ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const BASIC_TEMPLATE_TX_ID = "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"

export default function Home() {
  const [newSubdomain, setNewSubdomain] = useState("")
  const toast = useToast()
  const { connectWallet, setUserAddress, isConnected, setIsConnected } =
    useAppContext()

  const getRecords = async () => {
    const ant = ANT.init({
      processId: ANT_PROCESS_ID,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const checkAvailability = async () => {
    console.log("checkAvailability", newSubdomain)
    if (!newSubdomain || newSubdomain.trim() === "") {
      toast({
        title: "Subdomain cannot be empty",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      })
      return
    }

    console.log("newSubdomain", newSubdomain)

    const _records = await getRecords()
    if (_records.hasOwnProperty(newSubdomain)) {
      await getOwner()
      toast({
        title: "Subdomain already exists in the records",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    } else {
      toast({
        title: "Subdomain is available",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const loadUserProfile = async () => {
    const _connected = await connectWallet()
    if (_connected.success === false) {
      return
    }
    setUserAddress(_connected.userAddress)
    console.log("_connected.userAddress", _connected.userAddress)
    setIsConnected(true)

    toast({
      title: "Connected",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  return (
    <ChakraProvider>
      {isConnected ? (
        <>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="#7023b6"
            height="100vh"
            padding="4"
          >
            {/* TODO: add user input for
1. Subdomain
2. Username
3. Description
 */}
          </Flex>
        </>
      ) : (
        <>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="#7023b6"
            height="100vh"
            padding="4"
          >
            <Text fontSize="4xl" fontWeight="bold" color="white" mb="2">
              Welcome to Everlink!
            </Text>
            <Text fontSize="md" color="white" mb="6">
              Choose your Everlink subdomain. You can always change it later.
            </Text>
            <Flex
              align="center"
              bg="white"
              borderRadius="md"
              width="100%"
              maxW="md"
              mb="4"
            >
              <Input
                placeholder="yoursubdomain"
                border="none"
                focusBorderColor="none"
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => setNewSubdomain(e.target.value)}
              />
              <Text px="4" color="gray.500">
                _everlink.ar.io
              </Text>
            </Flex>
            <Button
              colorScheme="purple"
              width="100%"
              maxW="md"
              onClick={async (event) => {
                const button = event.target
                button.disabled = true

                await checkAvailability()
                button.disabled = false
              }}
            >
              Available?
            </Button>
            <Text mt="4" fontSize="sm" color="white">
              Ready to create your profile?{" "}
              <Button
                variant="link"
                color="#9f7aea"
                onClick={async (event) => {
                  const button = event.target
                  button.disabled = true

                  await loadUserProfile()
                  button.disabled = false
                }}
              >
                Log in
              </Button>
            </Text>
          </Flex>
        </>
      )}
    </ChakraProvider>
  )
}
