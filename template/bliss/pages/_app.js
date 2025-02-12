import "@/styles/globals.css"
import { ArNext } from "arnext"
import { Toaster } from "@/components/ui/toaster"
import HeadTag from "@/components/HeadTag"

export default function App(props) {
  return (
    <>
      <HeadTag />
      <ArNext {...props} />
      <Toaster />
    </>
  )
}
