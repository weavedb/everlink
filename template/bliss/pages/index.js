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
} from "lucide-react"

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

function App() {
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
          <Heart className="text-pink-400 animate-pulse" size={20} />
          <button
            className="text-pink-400 hover:text-pink-500 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              // You might want to add a toast notification here to inform the user that the value has been copied
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
          <a
            href="https://x.com/drumfeet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter
              size={20}
              className="text-blue-400 hover:scale-125 transition-transform cursor-pointer"
            />
          </a>
          <a
            href="https://t.me/drumfeet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send
              size={20}
              className="text-purple-400 hover:scale-125 transition-transform cursor-pointer"
            />
          </a>
          <a
            href="https://youtube.com/@drumfeet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube
              size={20}
              className="text-red-400 hover:scale-125 transition-transform cursor-pointer"
            />
          </a>
          <a
            href="https://github.com/drumfeet"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github
              size={20}
              className="text-blue-500 hover:scale-125 transition-transform cursor-pointer"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/ethanronoelsalazar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              size={20}
              className="text-blue-600 hover:scale-125 transition-transform cursor-pointer"
            />
          </a>
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

export default App
