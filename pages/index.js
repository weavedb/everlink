import { useState } from "react"
import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react"
import AppHeader from "@/components/AppHeader"
import { ANT } from "@ar.io/sdk/web"
import { message, createDataItemSigner, result } from "@permaweb/aoconnect"
import Head from "next/head"
import { Link } from "arnext"

const ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const BASIC_TEMPLATE_TX_ID = "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"

export default function Home({ _date = null }) {
  const [newSubdomain, setNewSubdomain] = useState("")
  const [newRecordTxId, setNewRecordTxId] = useState(BASIC_TEMPLATE_TX_ID) // TODO: add more templates
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [links, setLinks] = useState([])
  const [gateway, setGateway] = useState([])

  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")

  const toast = useToast()

  const getRecords = async () => {
    const ant = ANT.init({
      processId: ANT_PROCESS_ID,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const setRecord = async () => {
    try {
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
      ])

      const messageId = await message({
        process: MAIN_PROCESS_ID,
        tags: [
          {
            name: "Action",
            value: "Set-Record",
          },
          {
            name: "Sub-Domain",
            value: newSubdomain,
          },
          {
            name: "Transaction-Id",
            value: newRecordTxId,
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
            name: "Urls",
            value: JSON.stringify(links),
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

      toast({
        title: "New subdomain added to the records",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      })

      const newGateway = [
        newSubdomain + "_drumfeet.ar.io",
        newSubdomain + "_drumfeet.arweave.net",
        newSubdomain + "_drumfeet.arweave.dev",
        newSubdomain + "_drumfeet.ar-io.dev",
      ]
      setGateway(newGateway)
      console.log("newGateway", newGateway)
    } catch (error) {
      console.error(error)
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const onContinue = async () => {
    if (!newSubdomain || newSubdomain.trim() === "") {
      toast({
        title: "Subdomain cannot be empty",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      })
      return
    }

    console.log("newSubdomain", newSubdomain)

    const _records = await getRecords()
    if (_records.hasOwnProperty(newSubdomain)) {
      toast({
        title: "Subdomain already exists in the records",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return
    }

    toast({
      title: "Subdomain is available",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  const addNewLink = async () => {
    setLinks([...links, { title, url }])
  }

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`
    }
    return url
  }

  const meta = {
    title: "EverLink",
    description: "Link in bio for the permaweb",
    image: "dLbFWaJ1DpLpsyxdFX38AkzuMwSA6A598uRFBlHMvJo",
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
          minH="100vh"
          bg="#0e2229"
          flex="1" //fill available height vertically
        >
          {/* Main Body Container */}
          <Flex
            flexDirection="column"
            flex="1" //fill available width horizontally
            gap={1}
            color="gray.200"
          >
            {/* AppHeader Container */}
            <Flex>
              <AppHeader />
            </Flex>

            {/* Main Content Container */}
            <Flex
              flex="1" //fill available height vertically
              bg="#1a2c38"
              paddingX={[2, 12]}
              paddingY={[12, 12]}
              justifyContent="center"
            >
              <Flex w="580px" maxW="700px">
                <Flex
                  flexDirection="column"
                  gap={2}
                  flex="1" //fill available width horizontally
                >
                  {gateway.length > 0 && (
                    <>
                      <Flex flexDirection="column" gap={2} paddingBottom={8}>
                        <Text fontSize="xs">Gateways</Text>
                        {gateway.map((gateway, index) => {
                          return (
                            <>
                              <Link
                                key={index}
                                href={formatUrl(gateway)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {gateway}
                              </Link>
                            </>
                          )
                        })}
                      </Flex>
                    </>
                  )}
                  <Text fontSize="xs">Subdomain</Text>
                  <Input
                    placeholder="ar://subdomain_everlink"
                    onChange={(e) => setNewSubdomain(e.target.value)}
                  />
                  <Button
                    onClick={async (event) => {
                      const button = event.target
                      button.disabled = true

                      await onContinue()
                      button.disabled = false
                    }}
                  >
                    Available?
                  </Button>

                  <Flex flexDirection="column" gap={2} paddingTop={8}>
                    <Text fontSize="xs">Template</Text>
                    <Select>
                      <option value={newRecordTxId}>Basic</option>
                    </Select>
                    <Text fontSize="xs">Username</Text>
                    <Input
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Text fontSize="xs">Description</Text>
                    <Input
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Text fontSize="xs">Add Links</Text>
                    <Input
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      onChange={(e) => setURL(e.target.value)}
                    />
                    <Button
                      onClick={async (event) => {
                        const button = event.target
                        button.disabled = true

                        await addNewLink()
                        button.disabled = false
                      }}
                    >
                      Add Link
                    </Button>

                    {links.map((link, index) => (
                      <Flex
                        key={index}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex flexDirection="column">
                          <Text
                            fontSize="small"
                            whiteSpace="normal"
                            wordBreak="break-word"
                          >
                            {link.title}
                          </Text>
                          <Text
                            fontSize="small"
                            whiteSpace="normal"
                            wordBreak="break-word"
                          >
                            {link.url}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="small"
                          cursor="pointer"
                          onClick={() => removeLink(index)}
                        >
                          🗑️
                        </Text>
                      </Flex>
                    ))}

                    <Flex
                      paddingTop={8}
                      flexDirection="column"
                      flex="1" //fill available width horizontally
                    >
                      <Button
                        onClick={async (event) => {
                          const button = event.target
                          button.disabled = true

                          await setRecord()
                          button.disabled = false
                        }}
                      >
                        Set Record
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}
