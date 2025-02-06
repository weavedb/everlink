import "@/styles/globals.css"
import { ArNext } from "arnext"
import { Toaster } from "@/components/ui/toaster"
import { AppContextProvider } from "@/context/AppContext"
import { Analytics } from "@vercel/analytics/next"
import HeadTag from "@/components/HeadTag"

export default function App(props) {
  return (
    <>
      <AppContextProvider>
        <HeadTag />
        <ArNext {...props} />
        <Toaster />
        <Analytics />
      </AppContextProvider>
    </>
  )
}
