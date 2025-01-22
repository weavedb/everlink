import Link from "next/link"
import {
  Menu,
  Plus,
  Twitter,
  MessageCircle,
  Wallet,
  Gift,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="font-bold text-2xl text-primary">
          Everlink
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="mr-2 h-4 w-4" />
                Telegram
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Gift className="mr-2 h-4 w-4" />
                Offer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* </div> */}
    </header>
  )
}
