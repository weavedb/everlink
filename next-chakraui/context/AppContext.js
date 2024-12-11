import { useToast } from "@chakra-ui/react"
import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const toast = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")

  const connectWallet = async () => {
    try {
      await globalThis.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
      ])
      const _userAddress = await globalThis.arweaveWallet.getActiveAddress()
      console.log("_userAddress", _userAddress)
      setUserAddress(_userAddress)
      setIsConnected(true)
      return { success: true, userAddress: _userAddress }
    } catch (e) {
      console.error("connectWallet() error!", e)
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

  const disconnectWallet = async () => {
    try {
      await globalThis.arweaveWallet.disconnect()
      setUserAddress("")
      setIsConnected(false)
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

  return (
    <AppContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
