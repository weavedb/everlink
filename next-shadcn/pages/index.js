import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { TextIcon as Telegram, Twitter } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/context/AppContext"

export default function Home() {
  const [subdomain, setSubdomain] = useState("")
  const { toast } = useToast()
  const { connectWallet } = useAppContext()

  const checkAvailability = async () => {
    if (!subdomain || subdomain.trim() === "") {
      toast({
        description: "Subdomain cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Simulated availability check - in real app would check against actual records
    toast({
      title: "Subdomain is available",
      description: `${subdomain}_everlink.ar.io is available for registration`,
    })
  }

  const login = async () => {
    const _connected = await connectWallet()
    if (_connected.success === false) {
      return
    }
    window.location.href = `/profile/${_connected.userAddress}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#7023b6] px-4">
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
          <div className="flex w-full overflow-hidden rounded-md bg-white">
            <Input
              type="text"
              placeholder="yoursubdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center bg-white px-4 text-gray-500">
              _everlink.ar.io
            </div>
          </div>

          <Button
            className="w-full bg-[#805ad5] hover:bg-[#6b46c1]"
            onClick={checkAvailability}
          >
            Available?
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
            href="https://t.me/everlinkdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200"
          >
            <Telegram className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/everlinkdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
