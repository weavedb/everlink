import "@/styles/globals.css"
import { ArNext } from "arnext"
import { Toaster } from "@/components/ui/toaster"
import { AppContextProvider } from "@/context/AppContext"

export default function App(props) {
  return (
    <>
      <AppContextProvider>
        <ArNext {...props} />
        <Toaster />
      </AppContextProvider>
    </>
  )
}
