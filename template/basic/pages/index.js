import {
  Flex,
  Heading,
  Text,
  ChakraProvider,
  Avatar,
  useToast,
} from "@chakra-ui/react"

import { Link, ssr } from "arnext"
import { useEffect, useState } from "react"
import { dryrun } from "@permaweb/aoconnect"

const getDate = async (date) => date ?? Date.now()
const getFullUrl = async (url) => url ?? window.location.href

export const getStaticProps = ssr(async () => {
  return { props: { _date: Date.now(), _fullUrl: null }, revalidate: 100 }
})

const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"

export default function Home({ _date = null, _fullUrl = null }) {
  const toast = useToast()

  const [date, setDate] = useState(_date)
  const [fullUrl, setFullUrl] = useState(_fullUrl)
  const [username, setUsername] = useState()
  const [description, setDescription] = useState()
  const [links, setLinks] = useState([])
  const [subdomain, setSubdomain] = useState()

  useEffect(() => {
    ;(async () => {
      if (!_fullUrl) {
        const _fullUrl = await getFullUrl()
        setFullUrl(_fullUrl)
        console.log("_fullUrl", _fullUrl)

        const _subdomain = _fullUrl.split("//")[1].split("_")[0]
        console.log("_subdomain:", _subdomain)
        setSubdomain(_subdomain)

        const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
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
        const _resultData = _result.Messages[0].Data
        console.log("_resultData", _resultData)
        const jsonData = JSON.parse(_resultData)
        console.log("jsonData", jsonData)

        setUsername(jsonData.Username)
        setDescription(jsonData.Description)
        console.log("jsonData.Username", jsonData.Username)
        console.log("jsonData.Description", jsonData.Description)

        if (typeof jsonData.Urls === "string") {
          const _links = JSON.parse(jsonData.Urls)
          setLinks(_links)
          console.log("_links", _links)
        }
      }

      _date ?? setDate(await getDate())
    })()
  }, [_fullUrl, _date])

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`
    }
    return url
  }
  return (
    <>
      <ChakraProvider>
        <Flex height="100vh" align="center" justify="center">
          <Flex
            direction="column"
            align="center"
            bg="gray.50"
            boxShadow="0 0 10px rgba(0,0,0,0.1)"
            maxW="400px"
            w="100%"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="8px"
            p={5}
          >
            <Avatar name={username} src="" />

            <Heading as="h1" fontSize="24px" mb={2}>
              {username}
            </Heading>

            <Text color="gray.500" mb={5}>
              {description}
            </Text>

            <Flex direction="column" w="100%" gap={8}>
              {links.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={formatUrl(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </Link>
                )
              })}
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}
