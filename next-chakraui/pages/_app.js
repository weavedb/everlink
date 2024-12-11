import { AppContextProvider } from "@/context/AppContext"
import { ArNext } from "arnext"

export default function App(props) {
  return (
    <>
        <AppContextProvider>
          <ArNext {...props} />
        </AppContextProvider>
    </>
  )
}
