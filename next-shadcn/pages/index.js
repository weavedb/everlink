import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Send as Telegram, Twitter } from "lucide-react"
import { Link } from "arnext"
import { useAppContext } from "@/context/AppContext"
import DiscordIcon from "@/components/icons/DiscordIcon"

export default function Home() {
  const [subdomain, setSubdomain] = useState("")
  const { toast } = useToast()
  const { connectWallet, checkAvailability } = useAppContext()

  const login = async () => {
    const _connected = await connectWallet()
    if (_connected.success === false) {
      return
    }
    window.location.href = `/user/${_connected.userAddress}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-900 px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-4xl font-bold text-white text-center">
            Welcome to Everlink!
          </h1>
          <p className="text-md text-white md:whitespace-nowrap">
            Choose your Everlink subdomain. You can always change it later.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex overflow-hidden rounded-md bg-white shadow-inner">
            <Input
              type="text"
              placeholder="yoursubdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 placeholder:text-gray-400 text-base hover:bg-gray-50"
            />
            <div className="flex items-center bg-indigo-100 px-3 text-indigo-700 font-medium text-sm">
              _everlink.ar.io
            </div>
          </div>

          <Button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
            onClick={async (event) => {
              const button = event.target
              button.disabled = true
              await checkAvailability(subdomain)
              button.disabled = false
            }}
          >
            Check Availability
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-white">Ready to create your profile?</p>
            <Button
              variant="link"
              className="text-purple-300 hover:text-purple-200 p-0"
              onClick={async (event) => {
                const button = event.target
                button.disabled = true
                await login()
                button.disabled = false
              }}
            >
              Login
            </Button>
          </div>
          <Link href="/create">
            <Button
              variant="link"
              className="text-purple-200 hover:text-purple-100 text-sm font-medium transition-colors"
            >
              Continue without login
            </Button>
          </Link>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-5 w-5 text-white hover:text-purple-200"
          >
            <DiscordIcon strokeColor="currentColor" className="h-5 w-5" />
          </Link>
          <Link
            href="https://t.me/everlinkdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-5 w-5 text-white hover:text-purple-200"
          >
            <Telegram className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/everlinkdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-5 w-5 text-white hover:text-purple-200"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
