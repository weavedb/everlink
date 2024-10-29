import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import UserIcon from "./icons/UserIcon"
import WalletIcon from "./icons/WalletIcon"
import LoginKeyIcon from "./icons/LoginKeyIcon"
import { useAppContext } from "@/context/AppContext"
import { useState } from "react"

const LoginModal = () => {
  const { connectWallet } = useAppContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [isConnected, setIsConnected] = useState(false)

  const disconnectWallet = async () => {
    try {
      await window.arweaveWallet.disconnect()
      return { success: true }
    } catch (e) {
      console.error("disconnectWallet() error!", e)
      toast({
        description: "Something went wrong with your wallet. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return { success: false, error: e }
    }
  }

  const login = async () => {
    const _connected = await connectWallet()
    if (_connected.success === false) {
      return
    }

    setIsConnected(true)

    toast({
      title: "Connected",
      description: "Click the user icon to set up wallet auto-sign.",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  const logout = async () => {
    const _connected = await disconnectWallet()
    if (_connected.success === false) {
      return
    }

    setIsConnected(false)
    toast({
      description: "Account disconnected",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
    onClose()
  }

  return (
    <>
      {isConnected ? (
        <Flex _hover={{ cursor: "pointer" }} onClick={onOpen}>
          <UserIcon />
        </Flex>
      ) : (
        <Flex
          _hover={{ cursor: "pointer" }}
          onClick={async () => {
            // await login()
            toast({
              title: "This feature is not available yet",
              duration: 1000,
              isClosable: true,
              position: "top",
            })
          }}
        >
          <WalletIcon />
        </Flex>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a2c38" color="gray.200">
          <ModalHeader>
            <Flex justifyContent="center" alignItems="center" gap={2}>
              <LoginKeyIcon />
              Wallet Setup
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={4}>
              <Flex w="100%" gap={4} flexDirection="column">
                <Text>
                  To enable wallet auto sign, first disconnect your account.
                </Text>
                <Text>
                  Then, sign in with ArConnect and select &apos;Always
                  allow&apos;
                </Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex gap={4}>
              <Button
                bg="#213743"
                color="white"
                _hover={{ bg: "#213743" }}
                onClick={logout}
              >
                Disconnect
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
