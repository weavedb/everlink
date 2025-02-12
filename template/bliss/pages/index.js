import { Link } from "arnext"
import { useToast } from "@/hooks/use-toast"
import {
  Twitter,
  Youtube,
  Linkedin,
  ExternalLink,
  Heart,
  Star,
  Sparkles,
  Github,
  Send,
  Facebook,
  Instagram,
} from "lucide-react"
import { useState } from "react"

const LINKS = [
  { text: "Schedule a meeting", url: "https://calendly.com/drumfeet/30min" },
  { text: "Permaweb ArNS", url: "https://drumfeet.arweave.dev" },
  { text: "DUMPET", url: "https://dumpet.fun" },
  { text: "DINDIN", url: "https://dindin.dumpet.fun" },
  { text: "Everlink", url: "https://everlink.fun" },
  { text: "WeaveDB", url: "https://github.com/weavedb" },
  { text: "ArweavePH", url: "https://github.com/ArweavePH" },
  {
    text: "Forgetful Bob",
    url: "https://open.spotify.com/artist/36cp7b4ZqNlAHnDmV0DMeq",
  },
  {
    text: "Fizzles",
    url: "https://open.spotify.com/artist/0Upodw08tSULrSx6MrBybj",
  },
  {
    text: "Marssmarsshan",
    url: "https://open.spotify.com/artist/7LrUyckRcDq8ziPFvsjgjG",
  },
]

const GRADIENTS = [
  "from-pink-400 to-pink-500",
  "from-purple-400 to-purple-500",
  "from-blue-400 to-blue-500",
  "from-yellow-400 to-yellow-500",
  "from-green-400 to-green-500",
  "from-red-400 to-red-500",
  "from-indigo-400 to-indigo-500",
  "from-orange-400 to-orange-500",
  "from-teal-400 to-teal-500",
  "from-cyan-400 to-cyan-500",
  "from-rose-400 to-rose-500",
  "from-emerald-400 to-emerald-500",
]

const TikTokIcon = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 290"
    className={className}
    fill="currentColor"
  >
    <path d="M189.72022 104.42148c18.67797 13.3448 41.55932 21.19661 66.27233 21.19661V78.08728c-4.67694.001-9.34196-.48645-13.91764-1.4554v37.41351c-24.71102 0-47.5894-7.85181-66.27232-21.19563v96.99656c0 48.5226-39.35537 87.85513-87.8998 87.85513-18.11308 0-34.94847-5.47314-48.93361-14.85978 15.96175 16.3122 38.22162 26.4315 62.84826 26.4315 48.54742 0 87.90477-39.33253 87.90477-87.85712v-96.99457h-.00199Zm17.16896-47.95275c-9.54548-10.4231-15.81283-23.89299-17.16896-38.78453v-6.11347h-13.18894c3.31982 18.92715 14.64335 35.09738 30.3579 44.898ZM69.67355 225.60685c-5.33316-6.9891-8.21517-15.53882-8.20226-24.3298 0-22.19236 18.0009-40.18631 40.20915-40.18631 4.13885-.001 8.2529.6324 12.19716 1.88328v-48.59308c-4.60943-.6314-9.26154-.89945-13.91167-.80117v37.82253c-3.94726-1.25089-8.06328-1.88626-12.20313-1.88229-22.20825 0-40.20815 17.99196-40.20815 40.1873 0 15.6937 8.99747 29.28075 22.1189 35.89954Z M175.80259 92.84876c18.68293 13.34382 41.5613 21.19563 66.27232 21.19563V76.63088c-13.79353-2.93661-26.0046-10.14114-35.18573-20.16215-15.71554-9.80162-27.03808-25.97185-30.3579-44.898H141.8876v189.84333c-.07843 22.1318-18.04855 40.05229-40.20915 40.05229-13.05889 0-24.66039-6.22169-32.00788-15.8595-13.12044-6.61879-22.1179-20.20683-22.1179-35.89854 0-22.19336 17.9999-40.1873 40.20815-40.1873 4.255 0 8.35614.66217 12.20312 1.88229v-37.82254c-47.69165.98483-86.0473 39.93316-86.0473 87.83429 0 23.91184 9.55144 45.58896 25.05353 61.4276 13.98514 9.38565 30.82053 14.85978 48.9336 14.85978 48.54544 0 87.89981-39.33452 87.89981-87.85612V92.84876h-.00099Z M242.07491 76.63088V66.51456c-12.4384.01886-24.6326-3.46278-35.18573-10.04683 9.34196 10.22255 21.64336 17.27121 35.18573 20.16315Zm-65.54363-65.06015a67.7881 67.7881 0 0 1-.72869-5.45726V0h-47.83362v189.84531c-.07644 22.12883-18.04557 40.04931-40.20815 40.04931-6.50661 0-12.64987-1.54375-18.09025-4.28677 7.34749 9.63681 18.949 15.8575 32.00788 15.8575 22.15862 0 40.13171-17.9185 40.20915-40.0503V11.57073h34.64368ZM99.96593 113.58077V102.8112c-3.9969-.54602-8.02655-.82003-12.06116-.81805C39.35537 101.99315 0 141.32669 0 189.84531c0 30.41846 15.46735 57.22621 38.97116 72.99536-15.5021-15.83765-25.05353-37.51576-25.05353-61.42661 0-47.90014 38.35466-86.84847 86.0483-87.8333Z" />
  </svg>
)

export default function Home() {
  const { toast } = useToast()
  const [jsonData, setJsonData] = useState()
  const [links, setLinks] = useState([])

  const handleMessageResultError = (_result) => {
    const errorTag = _result?.Messages?.[0]?.Tags.find(
      (tag) => tag.name.toLowerCase() === "error"
    )
    console.log("errorTag", errorTag)
    if (errorTag) {
      toast({
        description: errorMsg,
        variant: "destructive",
        duration: 2000,
      })
      return true
    }
    return false
  }

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`
    }
    return url
  }

  const SocialButton = ({
    url,
    icon: Icon,
    label,
    color = "text-gray-600",
  }) => {
    return url ? (
      <Link target="_blank" rel="noopener noreferrer" href={formatUrl(url)}>
        <Icon
          size={20}
          className={`${color} hover:scale-125 transition-transform cursor-pointer`}
          aria-label={label}
        />
      </Link>
    ) : (
      <Icon
        size={20}
        className="text-gray-400 cursor-not-allowed opacity-50"
        aria-label={label}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Floating Bubbles */}
      <div className="absolute inset-0">
        <div className="absolute w-24 sm:w-32 h-24 sm:h-32 bg-pink-200 rounded-full -top-8 -left-8 animate-pulse"></div>
        <div className="absolute w-20 sm:w-24 h-20 sm:h-24 bg-purple-200 rounded-full top-1/4 right-12 animate-bounce"></div>
        <div className="absolute w-12 sm:w-16 h-12 sm:h-16 bg-blue-200 rounded-full bottom-20 left-12 animate-pulse"></div>
        <div className="absolute w-16 sm:w-20 h-16 sm:h-20 bg-yellow-200 rounded-full -bottom-8 right-20 animate-bounce"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-8 w-full max-w-md mx-2 relative">
        {/* Share Button with Heart */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            className="text-pink-400 hover:text-pink-500 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast({
                description: "Link copied to clipboard",
                duration: 2000,
              })
            }}
          >
            <Heart className="text-pink-400 animate-pulse" size={20} />
          </button>
          <button
            className="text-pink-400 hover:text-pink-500 transition-colors"
            onClick={() => {
              const text = `🚀 Just created a permanent profile page with @everlinkdotfun powered by @ar_io_network\n\nCheck it out here -`
              const url = window.location.href
              const createProfileText = `\n\nCreate your personalized profile page for free on https://everlink.ar.io`
              const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
              )}&url=${encodeURIComponent(url)}${encodeURIComponent(
                createProfileText
              )}`
              window.open(twitterUrl, "_blank")
            }}
          >
            <ExternalLink size={18} />
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-4 sm:mb-6 relative">
          <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-1 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"></div>
          </div>
          <Sparkles
            className="absolute -right-2 top-0 text-yellow-400 animate-bounce"
            size={20}
          />
          <Star
            className="absolute -left-2 bottom-0 text-yellow-400 animate-bounce delay-100"
            size={20}
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <SocialButton
            url="https://x.com/drumfeet"
            icon={Twitter}
            label="Twitter"
            color="text-blue-400"
          />
          <SocialButton
            url="https://tiktok.com/@drumfeet"
            icon={TikTokIcon}
            label="TikTok"
            color="text-purple-500"
          />
          <SocialButton
            url="https://youtube.com/@drumfeet"
            icon={Instagram}
            label="YouTube"
            color="text-red-400"
          />
          <SocialButton
            url="https://github.com/drumfeet"
            icon={Facebook}
            label="GitHub"
            color="text-blue-500"
          />
          <SocialButton
            url="https://www.linkedin.com/in/ethanronoelsalazar"
            icon={Linkedin}
            label="LinkedIn"
            color="text-blue-600"
          />
        </div>

        {/* Title and Description */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
            drumfeet
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            ✨ Software Development. Music. Drums. Cycling. Tech. Blockchain.
            Crypto. Technical Analysis. ✨
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 sm:space-y-3">
          {LINKS.map(({ text, url }, index) => (
            <a
              key={text}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center transition-all hover:scale-105 hover:shadow-lg text-sm sm:text-base bg-gradient-to-r ${
                GRADIENTS[index % GRADIENTS.length]
              }`}
            >
              {text}
            </a>
          ))}
        </div>

        {/* Everlink Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href="https://everlink.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 text-xs sm:text-sm group transition-colors cursor-pointer"
          >
            <span className="text-base sm:text-lg group-hover:scale-125 transition-transform">
              🌸
            </span>
            Join drumfeet on Everlink
          </a>
        </div>
      </div>
    </div>
  )
}
