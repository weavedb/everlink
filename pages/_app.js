import { AppContextProvider } from "@/context/AppContext"
import { ChakraProvider } from "@chakra-ui/react"
import { ArNext } from "arnext"

export default function App(props) {
  return (
    <>
      <ChakraProvider>
        <AppContextProvider>
          <ArNext {...props} />
        </AppContextProvider>
      </ChakraProvider>
    </>
  )
}
