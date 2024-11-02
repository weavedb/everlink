import { Link, useParams, ssr } from "arnext"
import { useEffect, useState } from "react"
import {
  Flex,
  Text,
  ChakraProvider,
  useToast,
  IconButton,
  Button,
} from "@chakra-ui/react"
import { dryrun } from "@permaweb/aoconnect"
import InstagramIcon from "@/components/icons/InstagramIcon"
import TwitterIcon from "@/components/icons/TwitterIcon"
import TiktokIcon from "@/components/icons/TiktokIcon"
import FacebookIcon from "@/components/icons/FacebookIcon"
import LinkedinIcon from "@/components/icons/LinkedinIcon"
import { ExternalLinkIcon, SunIcon } from "@chakra-ui/icons"

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}

const getID = async (id, pid) => `post-${pid ?? id}`
const getFullUrl = async (url) => url ?? window.location.href

export async function getStaticProps({ params: { id } }) {
  return { props: { pid: await getID(id) } }
}

const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const IS_TEST_DATA = false
const testJsonData = {
  Tiktok: "",
  Instagram: "https://instagram.com/fizzlesmusic",
  Username: "Fizzles",
  Twitter: "https://x.com/fizzlesmusic",
  Description:
    "3 friends share the same passion as music enthusiasts from the southern outskirts of Cebu.",
  Linkedin: "",
  TTL: "900",
  Subdomain: "fizzles",
  TransactionId: "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U",
  Owner: "8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw",
  Links: `[{"title":"Website","url":"https://fizzlesmusic.com"}, {"title":"Spotify","url":"https://open.spotify.com/artist/0Upodw08tSULrSx6MrBybj"}, {"title":"YouTube","url":"https://www.youtube.com/channel/UCs6z6vm7-uIlntR3zwW_8Uw"}]`,
  Facebook: "https://facebook.com/fizzlesmusic",
}
console.log("testJsonData", testJsonData)

export default function Home({ _id = null, _fullUrl = null }) {
  const { id } = useParams()
  const [pid, setPid] = useState(_id)
  const [fullUrl, setFullUrl] = useState()
  const [jsonData, setJsonData] = useState()
  const [links, setLinks] = useState([])
  const [subdomain, setSubdomain] = useState()
  const toast = useToast()

  useEffect(() => {
    ;(async () => {
      _id ?? setPid(await getID(id, _id))
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!_fullUrl) {
        const _fullUrl = await getFullUrl()
        setFullUrl(_fullUrl)
        console.log("_fullUrl", _fullUrl)

        const parsedUrl = new URL(_fullUrl)
        const pathname = parsedUrl.pathname
        const segments = pathname.split("/").filter(Boolean)
        const _subdomain = segments[0] || null
        console.log("_subdomain:", _subdomain)
        setSubdomain(_subdomain)

        let tags = [
          { name: "Action", value: "Record" },
          {
            name: "Sub-Domain",
            value: _subdomain,
          },
        ]

        const _result = await dryrun({
          process: MAIN_PROCESS_ID,
          tags,
        })
        console.log("_result", _result)
        if (handleMessageResultError(_result)) {
          if (IS_TEST_DATA) {
            setJsonData(testJsonData)
            console.log("setJsonData(testJsonData)", testJsonData)
            if (typeof testJsonData.Links === "string") {
              try {
                const _links = JSON.parse(testJsonData.Links)
                if (Array.isArray(_links)) {
                  setLinks(_links)
                  console.log("_links", _links)
                }
              } catch (error) {
                console.log("Invalid JSON format in Links")
                setLinks([])
              }
            }
            return
          } else {
            return
          }
        }
        const _resultData = _result.Messages[0].Data
        console.log("_resultData", _resultData)
        const _jsonData = JSON.parse(_resultData)
        console.log("_jsonData", _jsonData)
        setJsonData(_jsonData)
        if (typeof _jsonData.Links === "string") {
          try {
            const _links = JSON.parse(_jsonData.Links)
            if (Array.isArray(_links)) {
              setLinks(_links)
              console.log("_links", _links)
            }
          } catch (error) {
            console.log("Invalid JSON format in Links")
            setLinks([])
          }
        }
      }
    })()
  }, [_fullUrl])

  const handleMessageResultError = (_result) => {
    const errorTag = _result?.Messages?.[0]?.Tags.find(
      (tag) => tag.name === "Error"
    )
    console.log("errorTag", errorTag)
    if (errorTag) {
      toast({
        description: _result.Messages[0].Data,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
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

  const SocialButton = ({ url, icon, label }) => {
    return url ? (
      <Link target="_blank" href={formatUrl(url)}>
        <IconButton icon={icon} variant="ghost" aria-label={label} />
      </Link>
    ) : (
      <IconButton
        icon={icon}
        variant="ghost"
        aria-label={label}
        opacity={0.5}
        cursor="not-allowed"
      />
    )
  }

  return (
    <>
      <ChakraProvider>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          backgroundColor="#F4C7C3"
          p={4}
        >
          {/* Main Content Container */}
          <Flex
            direction="column"
            alignItems="center"
            bg="white"
            borderRadius="lg"
            paddingX={8}
            paddingTop={2}
            paddingBottom={8}
            boxShadow="lg"
            maxW="lg"
            width="100%"
          >
            <Flex w="100%" justifyContent="flex-end">
              <IconButton
                icon={<ExternalLinkIcon />}
                variant="ghost"
                aria-label="Share"
                onClick={() => {
                  const text = `Check out this Everlink! - `
                  const url = window.location.href
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text
                  )}&url=${encodeURIComponent(url)}`
                  window.open(twitterUrl, "_blank")
                }}
              />
            </Flex>

            {/* Profile Image */}
            <Flex
              w={24}
              h={24}
              bgGradient="linear(to-r, pink.400, teal.400)"
              borderRadius="full"
              mb={6}
            ></Flex>

            {/* Socials */}

            <Flex gap={[2, 4]} paddingBottom={4}>
              <SocialButton
                url={jsonData?.Twitter}
                icon={<TwitterIcon />}
                label="Twitter"
              />
              <SocialButton
                url={jsonData?.Tiktok}
                icon={<TiktokIcon />}
                label="Tiktok"
              />
              <SocialButton
                url={jsonData?.Instagram}
                icon={<InstagramIcon />}
                label="Instagram"
              />
              <SocialButton
                url={jsonData?.Facebook}
                icon={<FacebookIcon />}
                label="Facebook"
              />
              <SocialButton
                url={jsonData?.Linkedin}
                icon={<LinkedinIcon />}
                label="Linkedin"
              />
            </Flex>

            {/* Username */}
            <Text fontWeight="bold" fontSize="4xl" w="100%" textAlign="center">
              {jsonData?.Username}
            </Text>

            {/* Description */}
            <Text
              textAlign="center"
              mt={2}
              mb={6}
              fontSize="lg"
              w="100%"
              color="blackAlpha.700"
            >
              {jsonData?.Description}
            </Text>

            {/* Link Buttons */}
            {links?.map((link, index) => (
              <Flex width="100%" key={index}>
                <Link
                  target="_blank"
                  href={formatUrl(link?.url)}
                  style={{ width: "100%", display: "block" }}
                >
                  <Button
                    size="md"
                    colorScheme="pink"
                    variant="solid"
                    width="100%"
                    mb={4}
                  >
                    {link.title}
                  </Button>
                </Link>
              </Flex>
            ))}
          </Flex>

          <Link target="_blank" href="https://everlink.ar.io">
            <Button
              mt={8}
              size="md"
              colorScheme="blackAlpha"
              variant="solid"
              borderRadius="full"
            >
              <SunIcon />
              <Flex paddingX={1}></Flex>Join {jsonData?.Username || "us"} on
              Everlink
            </Button>
          </Link>
        </Flex>
      </ChakraProvider>
    </>
  )
}
