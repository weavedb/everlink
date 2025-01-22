import "@/styles/globals.css"
import { ArNext } from "arnext"
import { Toaster } from "@/components/ui/toaster"

export default function App(props) {
  return (
    <>
    <ArNext {...props} />
    <Toaster />
    </>
  )
}
