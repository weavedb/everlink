import { Link, ssr } from "arnext"
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
import Head from "next/head"

const getDate = async (date) => date ?? Date.now()
const getFullUrl = async (url) => url ?? window.location.href

export const getStaticProps = ssr(async () => {
  return { props: { _date: Date.now(), _fullUrl: null }, revalidate: 100 }
})

const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const IS_TEST_DATA = true
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
  Links: `[{"title":"Website","url":"https://fizzlesmusic.com"}, {"title":"Spotify","url":"https://open.spotify.com/artist/0Upodw08tSULrSx6MrBybj"}, {"title":"YouTube","url":"https://www.youtube.com/channel/UCs6z6vm7-uIlntR3zwW_8Uw"}, {"title":"Forgetful Bob - YouTube","url":"https://www.youtube.com/forgetfulbob"}]`,
  Facebook: "https://facebook.com/fizzlesmusic",
}
console.log("testJsonData", testJsonData)

export default function Home({ _date = null, _fullUrl = null }) {
  const [date, setDate] = useState(_date)
  const [fullUrl, setFullUrl] = useState(_fullUrl)
  const [jsonData, setJsonData] = useState()
  const [links, setLinks] = useState([])
  const [subdomain, setSubdomain] = useState()
  const toast = useToast()

  useEffect(() => {
    ;(async () => {
      if (!_fullUrl) {
        const _fullUrl = await getFullUrl()
        setFullUrl(_fullUrl)
        console.log("_fullUrl", _fullUrl)

        const _subdomain = _fullUrl.split("//")[1].split("_")[0]
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

      _date ?? setDate(await getDate())
    })()
  }, [_fullUrl, _date])

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
      <Link target="_blank" rel="noopener noreferrer" href={formatUrl(url)}>
        <IconButton
          colorScheme="whiteAlpha"
          icon={icon}
          variant="ghost"
          aria-label={label}
        />
      </Link>
    ) : (
      <IconButton
        colorScheme="whiteAlpha"
        icon={icon}
        variant="ghost"
        aria-label={label}
        opacity={0.5}
        cursor="not-allowed"
      />
    )
  }

  const meta = {
    title: "Everlink",
    description: "Forever on Arweave",
    image: "z8i02U4dwqsuQmex-iAIQXcs-3LBU92tPZ8WGnCB5aM",
  }

  return (
    <>
      <ChakraProvider>
        <Head>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${meta.title}`} />
          <meta name="twitter:description" content={meta.description} />
          <meta
            name="twitter:image"
            content={`https://arweave.net/${meta.image}`}
          />
          <meta property="og:title" content={`${meta.title}`} />
          <meta name="og:description" content={meta.description} />
          <meta name="og:image" content={`https://arweave.net/${meta.image}`} />
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          backgroundColor="#000000"
          p={4}
        >
          {/* Main Content Container */}
          <Flex
            direction="column"
            alignItems="center"
            bg="#1f1f1f"
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
                colorScheme="whiteAlpha"
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
              bgGradient="linear(to-r, purple.800, teal.700)"
              borderRadius="full"
              mb={6}
            ></Flex>

            {/* Socials */}

            <Flex gap={[2, 4]} paddingBottom={4}>
              <SocialButton
                url={jsonData?.Twitter}
                icon={<TwitterIcon strokeColor="white" />}
                label="Twitter"
              />
              <SocialButton
                url={jsonData?.Tiktok}
                icon={<TiktokIcon strokeColor="white" />}
                label="Tiktok"
              />
              <SocialButton
                url={jsonData?.Instagram}
                icon={<InstagramIcon strokeColor="white" />}
                label="Instagram"
              />
              <SocialButton
                url={jsonData?.Facebook}
                icon={<FacebookIcon strokeColor="white" />}
                label="Facebook"
              />
              <SocialButton
                url={jsonData?.Linkedin}
                icon={<LinkedinIcon strokeColor="white" />}
                label="Linkedin"
              />
            </Flex>

            {/* Username */}
            <Text
              fontWeight="bold"
              fontSize="4xl"
              w="100%"
              textAlign="center"
              color="gray.200"
            >
              {jsonData?.Username}
            </Text>

            {/* Description */}
            <Text
              textAlign="center"
              mt={2}
              mb={6}
              fontSize="lg"
              w="100%"
              color={"gray.200"}
            >
              {jsonData?.Description}
            </Text>

            {/* Link Buttons */}
            {links?.map((link, index) => (
              <Flex width="100%" key={index}>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={formatUrl(link?.url)}
                  style={{ width: "100%", display: "block" }}
                >
                  <Button
                    size="md"
                    colorScheme="blackAlpha"
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

          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://everlink.fun"
          >
            <Button
              mt={8}
              size="md"
              colorScheme="whiteAlpha"
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
