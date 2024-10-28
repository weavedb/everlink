import {
  Flex,
  Heading,
  Text,
  Link,
  ChakraProvider,
  Avatar,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"

const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"

export default function Home() {
  const [arnsDomain, setArnsDomain] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [links, setLinks] = useState([])

  const toast = useToast()

  useEffect(() => {
    ;(async () => {
      await getArnsDomain()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchDataFromSubdomain()
    })()
  }, [subdomain])

  const fetchDataFromSubdomain = async () => {
    await getRecord()
  }

  const getRecord = async () => {
    let tags = [
      { name: "Action", value: "Record" },
      {
        name: "Sub-Domain",
        value: subdomain,
      },
    ]

    const _result = await dryrun({
      process: MAIN_PROCESS_ID,
      tags,
    })
    console.log("_result", _result)

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
      return
    }

    const jsonObj = JSON.parse(result?.Messages[0]?.Data)
    console.log("jsonObj", jsonObj)

    setUsername(jsonObj.Username)
    setDescription(jsonObj.Description)

    if (typeof jsonObj.Urls === "string") {
      jsonObj.Urls = JSON.parse(jsonObj.Urls)
      setLinks(jsonObj.Urls)
      console.log("jsonObj.Urls", jsonObj.Urls)
    }
  }

  const getArnsDomain = async () => {
    if (typeof window !== "undefined") {
      const { hostname } = window.location
      const parts = hostname.split(".")

      const _arnsDomain = parts.length > 2 ? parts.slice(0, -2).join(".") : ""

      setArnsDomain(_arnsDomain)

      // Extract the subdomain from the Arns domain
      const _subdomain = _arnsDomain.split("_")[0]
      console.log("_subdomain:", _subdomain)
      setSubdomain(_subdomain)
    }
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
            color="gray.800"
            fontSize="16px"
            lineHeight="normal"
            fontFamily="Arial, sans-serif"
          >
            <Avatar name={username} src="" />

            <Heading as="h1" fontSize="24px" mb={2}>
              {username}
            </Heading>

            <Text color="gray.600" mb={5}>
              {description}
            </Text>

            <Flex direction="column" spacing={2} w="100%" gap={8}>
              {links.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link}
                    isExternal
                    w="100%"
                    bg="gray.800"
                    color="white"
                    p={3}
                    borderRadius="md"
                    textDecoration="none"
                    _hover={{
                      bg: "gray.700",
                    }}
                    transition="background-color 0.3s ease"
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
