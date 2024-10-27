import { ChakraProvider } from "@chakra-ui/react"
import { ArNext } from "arnext"

export default function App(props) {
  return (
    <>
      <ChakraProvider>
        <ArNext {...props} />
      </ChakraProvider>
    </>
  )
}
