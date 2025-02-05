import { Link } from "arnext"
import { Menu, Plus, Twitter, Send, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DiscordIcon from "./icons/DiscordIcon"
import { useAppContext } from "@/context/AppContext"
import { useToast } from "@/hooks/use-toast"
import { LogOut } from "lucide-react"
import { useRouter } from "next/router"

export function AppHeader() {
  const { connectWallet, disconnectWallet, isConnected, userAddress } =
    useAppContext()

  const router = useRouter()
  const { toast } = useToast()
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center px-6 py-3">
        <Link href="/" className="font-bold text-3xl text-primary">
          Everlink
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/create">
            <Button
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-foreground hover:bg-muted border-input focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-popover text-popover-foreground"
            >
              <DropdownMenuItem>
                <div
                  className="flex items-center cursor-pointer w-full"
                  onClick={!isConnected ? connectWallet : undefined}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnected ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(userAddress)
                        toast({
                          description: "Wallet address copied to clipboard",
                          duration: 2000,
                        })
                        router.push(`/user/${userAddress}`)
                      }}
                    >
                      {userAddress?.slice(0, 5)}....{userAddress?.slice(-5)}
                    </span>
                  ) : (
                    "Connect Wallet"
                  )}
                </div>
              </DropdownMenuItem>
              {isConnected && (
                <DropdownMenuItem
                  onClick={async () => {
                    disconnectWallet()
                    toast({
                      description: "Wallet disconnected",
                      variant: "destructive",
                    })
                  }}
                >
                  <div className="flex items-center text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <a
                  href={`https://x.com/everlinkdotfun`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full"
                >
                  <Twitter className="mr-2 h-4 w-4" /> Twitter
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href={`https://t.me/everlinkdotfun`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Telegram
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full"
                >
                  <DiscordIcon strokeColor="#ffffff" size="18" />
                  <div className="ml-2">Discord</div>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
