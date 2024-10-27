import HamburgerIcon from "./icons/HamburgerIcon"
import LoginModal from "./LoginModal"
import { Flex, Text, useToast } from "@chakra-ui/react"

const AppHeader = () => {
  const toast = useToast()
  return (
    <>
      <Flex
        flex="1" //fill the available space
        paddingY={4}
        paddingX={{ base: 2, md: 20 }}
        alignItems="center"
        bg="#1a2c38"
        boxShadow="0px 4px 0px rgba(0, 0, 0, 0.25)"
        justifyContent="space-between"
        color="gray.200"
        flexWrap="wrap"
      >
        {/* HamburgerIcon Container */}
        <Flex
          display={{ base: "flex", md: "none" }}
          onClick={() => {
            toast({
              title: "This feature is not available yet",
              duration: 1000,
              isClosable: true,
              position: "top",
            })
          }}
        >
          <HamburgerIcon />
        </Flex>

        {/* Logo */}
        <Text
          color="white"
          fontSize={"2xl"}
          fontFamily={"Arial, Helvetica, sans-serif"}
          fontWeight="bold"
          letterSpacing="wide"
          noOfLines={1}
        >
          EverLink
        </Text>

        {/* LoginModal Container */}
        <Flex alignItems="center" gap={2}>
          <LoginModal />
        </Flex>
      </Flex>
    </>
  )
}
export default AppHeader
