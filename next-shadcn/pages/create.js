import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
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
  Copy,
  ExternalLink,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppContext } from "@/context/AppContext"
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"

import { MAIN_PROCESS_ID } from "@/context/AppContext"
import { ToastAction } from "@/components/ui/toast"

const PINK_TEMPLATE_TXID = "ma-GzZRRNQvvd-JdqwdmBYwxgbmQn-O4SavYndec4e0"

// Custom TikTok Icon component
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export default function CreatePage() {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const [subdomain, setSubdomain] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [twitter, setTwitter] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [instagram, setInstagram] = useState("")
  const [facebook, setFacebook] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const { toast } = useToast()
  const {
    checkAvailability,
    handleMessageResultError,
    connectWallet,
    isConnected,
    userAddress,
    getRecords,
  } = useAppContext()

  // Set initial template to Pink
  const [templates, setTemplates] = useState({
    Pink: PINK_TEMPLATE_TXID,
  })
  const [selectedTemplateTxId, setSelectedTemplateTxId] =
    useState(PINK_TEMPLATE_TXID)

  const socialMediaConfig = [
    {
      name: "twitter",
      icon: Twitter,
      placeholder: "https://x.com/username",
      state: [twitter, setTwitter],
    },
    {
      name: "tiktok",
      icon: TikTokIcon,
      placeholder: "https://tiktok.com/@username",
      state: [tiktok, setTiktok],
    },
    {
      name: "instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/username",
      state: [instagram, setInstagram],
    },
    {
      name: "facebook",
      icon: Facebook,
      placeholder: "https://facebook.com/username",
      state: [facebook, setFacebook],
    },
    {
      name: "linkedin",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
      state: [linkedin, setLinkedin],
    },
  ]

  useEffect(() => {
    ;(async () => {
      await getTemplates()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      console.log("useEffect() userAddress", userAddress)
    })()
  }, [userAddress])

  const getTemplates = async () => {
    try {
      const _templatesResult = await dryrun({
        process: MAIN_PROCESS_ID,
        tags: [{ name: "Action", value: "Templates" }],
      })
      if (handleMessageResultError(_templatesResult)) return
      const _templatesResultData = _templatesResult.Messages[0].Data
      const jsonTemplates = JSON.parse(_templatesResultData)
      console.log("jsonTemplates", jsonTemplates)
      setTemplates(jsonTemplates)
    } catch (e) {
      console.error("getTemplates() error!", e)
      toast({
        description: "Failed to fetch templates",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  const publishProfile = async () => {
    if (!subdomain || !selectedTemplateTxId || !username) {
      toast({
        title: "Subdomain, Template, and Name are required",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    try {
      const _connected = await connectWallet()
      console.log("_connected", _connected)
      if (_connected.success === false) {
        return
      }

      const messageId = await message({
        process: MAIN_PROCESS_ID,
        tags: [
          {
            name: "Action",
            value: "Set-Record",
          },
          {
            name: "Sub-Domain",
            value: subdomain,
          },
          {
            name: "Transaction-Id",
            value: selectedTemplateTxId,
          },
          {
            name: "TTL-Seconds",
            value: "900",
          },
          {
            name: "Username",
            value: username,
          },
          {
            name: "Description",
            value: description,
          },
          {
            name: "Links",
            value: JSON.stringify(links),
          },
          {
            name: "Twitter",
            value: twitter,
          },
          {
            name: "Tiktok",
            value: tiktok,
          },
          {
            name: "Instagram",
            value: instagram,
          },
          {
            name: "Facebook",
            value: facebook,
          },
          {
            name: "Linkedin",
            value: linkedin,
          },
        ],
        signer: createDataItemSigner(globalThis.arweaveWallet),
      })
      console.log("messageId", messageId)

      const _result = await result({
        message: messageId,
        process: MAIN_PROCESS_ID,
      })
      console.log("_result", _result)

      if (handleMessageResultError(_result)) return

      toast({
        description: "Profile published successfully",
        action: (
          <ToastAction altText="View">
            <a
              href={`https://${subdomain}_everlink.ar.io`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </ToastAction>
        ),
      })
    } catch (e) {
      console.error("publishProfile() error!", e)
      toast({
        title: "Failed to publish profile",
        description: `${e.message}`,
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`
    }
    return url
  }

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const _url = formatUrl(newLink.url)
      setNewLink({ ...newLink, url: _url })
      setLinks([...links, { ...newLink, url: _url }])
      setNewLink({ title: "", url: "" })
    }
  }

  const deleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-20 sm:pb-30 md:pb-40">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Create Profile</h1>
            {/* <p className="text-muted-foreground">Fill in your details</p> */}
          </div>

          <div className="space-y-8">
            <p className="text-sm text-muted-foreground mb-4">
              Fields marked with <span className="text-destructive">*</span> are
              required.
            </p>
            {/* Profile section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <div className="space-y-2">
                <Label htmlFor="subdomain">
                  Subdomain <span className="text-destructive">*</span>
                </Label>
                <div className="flex overflow-hidden rounded-md bg-background border border-input">
                  <Input
                    id="subdomain"
                    type="text"
                    placeholder="yoursubdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="flex items-center bg-muted px-3 text-muted-foreground font-medium text-sm">
                    _everlink.ar.io
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full"
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

              <div className="space-y-2">
                <Label htmlFor="username">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  className="bg-background"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">
                  Template <span className="text-destructive">*</span>
                </Label>
                <Select
                  defaultValue={selectedTemplateTxId}
                  id="template"
                  onValueChange={(value) => {
                    console.log("value", value)
                    setSelectedTemplateTxId(value)
                  }}
                >
                  <SelectTrigger id="template" className="bg-background">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templates).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTemplateTxId && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 text-sm text-muted-foreground mt-2">
                    <span className="break-all">{selectedTemplateTxId}</span>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedTemplateTxId)
                          toast({
                            description: "Transaction ID copied to clipboard",
                            duration: 2000,
                          })
                        }}
                        className="p-1 hover:bg-muted rounded-full"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <a
                        href={`https://viewblock.io/arweave/tx/${selectedTemplateTxId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted rounded-full"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Custom Links
              </h2>
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
                    <Label htmlFor="linkTitle">Label</Label>
                    <Input
                      id="linkTitle"
                      placeholder="Enter link label"
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
                      <TableRow className="border-b border-muted">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Link Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links.map((link, index) => (
                        <TableRow key={index} className="border-b border-muted">
                          <TableCell className="w-[50px]">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLink(index)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{link.title}</div>
                              <div className="font-mono text-sm text-muted-foreground">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {link.url}
                                </a>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>

            {/* Profile Photo section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Profile Photo
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <ImageUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="photoInput">Upload Photo</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="photoInput"
                        type="file"
                        accept="image/*"
                        className="bg-background flex-1"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file && file.size > 99 * 1024) {
                            toast({
                              title: "File size must be less than 100 KiB",
                              variant: "destructive",
                              duration: 2000,
                            })
                            e.target.value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          // Simulated upload success
                          toast({
                            description: "This feature is not yet available",
                            variant: "destructive",
                            duration: 2000,
                          })
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Or enter Transaction ID</Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter Arweave Tx ID for existing photo"
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Social media section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Social Media
              </h2>

              {socialMediaConfig.map(
                ({
                  name,
                  icon: Icon,
                  placeholder,
                  state: [value, setValue],
                }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <Label className="w-8">
                      <Icon className="h-5 w-5" />
                    </Label>
                    <Input
                      placeholder={placeholder}
                      className="bg-background flex-grow"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                )
              )}
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={async (event) => {
                const button = event.target
                button.disabled = true
                await publishProfile()
                button.disabled = false
              }}
            >
              Publish
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
