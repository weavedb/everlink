import "@/styles/globals.css"
import { ArNext } from "arnext"
import { Toaster } from "@/components/ui/toaster"
import { AppContextProvider } from "@/context/AppContext"
import { Analytics } from "@vercel/analytics/next"

export default function App(props) {
  return (
    <>
      <AppContextProvider>
        <ArNext {...props} />
        <Toaster />
        <Analytics />
      </AppContextProvider>
    </>
  )
}
