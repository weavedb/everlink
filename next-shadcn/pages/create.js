"use client"

import { AppHeader } from "@/components/AppHeader"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react"

// Custom TikTok Icon component
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Create Profile</h1>
            <p className="text-muted-foreground">Fill in your details</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select defaultValue="dark">
                <SelectTrigger id="template" className="bg-background">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </div>
                </Label>
                <Input
                  id="twitter"
                  placeholder="https://x.com/username"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok">
                  <div className="flex items-center gap-2">
                    <TikTokIcon className="h-4 w-4" />
                    TikTok
                  </div>
                </Label>
                <Input
                  id="tiktok"
                  placeholder="https://www.tiktok.com/@username"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </div>
                </Label>
                <Input
                  id="instagram"
                  placeholder="https://www.instagram.com/username"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">
                  <div className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </div>
                </Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/username"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </div>
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  className="bg-background"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
