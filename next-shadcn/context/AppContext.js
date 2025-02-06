import { useToast } from "@/hooks/use-toast"
import { createContext, useContext, useState } from "react"
import { ANT } from "@ar.io/sdk/web"

const AppContext = createContext()
const BASE_UNIT = 10
const DENOMINATION = 12

export const ANT_PROCESS_ID = "0MV4IRiORl-mw5FKx7PzwIQrdrz6eC8qJNd-52sAJNI"
export const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"

export const AppContextProvider = ({ children }) => {
  const { toast } = useToast()
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
        title: "Something went wrong",
        description: `Install arconnect.io or reload page. ${e}`,
        variant: "destructive",
        duration: 2000,
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
        title: "Something went wrong.",
        description: `Install arconnect.io or reload page. ${e}`,
        variant: "destructive",
        duration: 2000,
      })
      return { success: false, error: e }
    }
  }

  const multiplyByPower = (v, denomination = DENOMINATION) => {
    return v * Math.pow(BASE_UNIT, denomination)
  }

  const divideByPower = (v, denomination = DENOMINATION) => {
    return (v / Math.pow(BASE_UNIT, denomination)).toFixed(denomination)
  }

  const handleMessageResultError = (_result) => {
    const errorTag = _result?.Messages?.[0]?.Tags.find(
      (tag) => tag.name.toLowerCase() === "error"
    )
    console.log("errorTag", errorTag)
    if (errorTag) {
      const errorMsg = _result.Messages[0]?.Data ?? errorTag.value
      toast({
        description: errorMsg,
        variant: "destructive",
        duration: 2000,
      })
      return true
    }
    return false
  }

  const getRecords = async () => {
    try {
      const ant = ANT.init({
        processId: ANT_PROCESS_ID,
      })
      const _records = await ant.getRecords()
      console.log("_records", _records)
      return _records
    } catch (e) {
      console.error("getRecords() error!", e)
    }
  }

  const checkAvailability = async (subdomain = "") => {
    try {
      if (!subdomain || subdomain.trim() === "") {
        toast({
          description: "Subdomain cannot be empty",
          variant: "destructive",
          duration: 2000,
        })
        return
      }

      const _records = await getRecords()
      if (_records.hasOwnProperty(subdomain)) {
        toast({
          description: "Subdomain already exists in the records",
          variant: "destructive",
          duration: 2000,
        })
      } else {
        toast({
          description: `${subdomain}_everlink.ar.io is available for registration`,
          duration: 2000,
        })
      }
    } catch (e) {
      console.error("checkAvailability() error!", e)
      toast({
        description: "Failed to check subdomain availability",
        variant: "destructive",
        duration: 2000,
      })
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
        multiplyByPower,
        divideByPower,
        handleMessageResultError,
        getRecords,
        checkAvailability,
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
