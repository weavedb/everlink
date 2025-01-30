import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("https://discord.gg/bWU5e3cVuW")
  }, [router])

  return null // No content is displayed on this page
}
