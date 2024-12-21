import { AppContextProvider } from "@/context/AppContext"
import { ArNext } from "arnext"
import { Analytics } from "@vercel/analytics/next"

export default function App(props) {
  return (
    <>
      <AppContextProvider>
        <ArNext {...props} />
        <Analytics />
      </AppContextProvider>
    </>
  )
}
