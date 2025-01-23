"use client"

import { useState } from "react"
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
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ImageUp,
  Plus,
  Trash2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Custom TikTok Icon component
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export default function CreatePage() {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ title: "", url: "" })

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, newLink])
      setNewLink({ title: "", url: "" })
    }
  }

  const deleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-16">
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
              <Label htmlFor="photo">Profile Photo</Label>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <ImageUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="bg-background"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file && file.size > 99 * 1024) {
                      alert("File size must be less than 100 KiB")
                      e.target.value = ""
                    }
                  }}
                />
              </div>
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
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="text-primary hover:text-primary/90"
                  onClick={addLink}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="linkTitle">Title</Label>
                    <Input
                      id="linkTitle"
                      placeholder="Enter link title"
                      value={newLink.title}
                      onChange={(e) =>
                        setNewLink({ ...newLink, title: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkUrl">URL</Label>
                    <Input
                      id="linkUrl"
                      placeholder="Enter link URL"
                      value={newLink.url}
                      onChange={(e) =>
                        setNewLink({ ...newLink, url: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                {links.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links.map((link, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {link.title}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {link.url}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLink(index)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {[
                {
                  icon: <Twitter className="h-5 w-5" />,
                  id: "twitter",
                  placeholder: "https://x.com/username",
                },
                {
                  icon: <TikTokIcon className="h-5 w-5" />,
                  id: "tiktok",
                  placeholder: "https://www.tiktok.com/@username",
                },
                {
                  icon: <Instagram className="h-5 w-5" />,
                  id: "instagram",
                  placeholder: "https://www.instagram.com/username",
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  id: "facebook",
                  placeholder: "https://facebook.com/username",
                },
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  id: "linkedin",
                  placeholder: "https://linkedin.com/in/username",
                },
              ].map((social) => (
                <div key={social.id} className="flex items-center space-x-2">
                  <Label htmlFor={social.id} className="w-8">
                    {social.icon}
                  </Label>
                  <Input
                    id={social.id}
                    placeholder={social.placeholder}
                    className="bg-background flex-grow"
                  />
                </div>
              ))}
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
