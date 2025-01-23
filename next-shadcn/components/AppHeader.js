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

export function AppHeader() {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center px-6 py-3">
        <Link href="/" className="font-bold text-3xl text-primary">
          Everlink
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-popover text-popover-foreground"
            >
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
    </header>
  )
}
