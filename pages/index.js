import { useEffect, useState } from "react"
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
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"
import Head from "next/head"
import { Link } from "arnext"
import { AppContextProvider, useAppContext } from "@/context/AppContext"

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
  const [subdomainOwner, setSubdomainOwner] = useState("")
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [userRecords, setUserRecords] = useState([])

  const toast = useToast()

  const { connectWallet, isConnected, userAddress } = useAppContext()
  useEffect(() => {
    ;(async () => {
      if (isConnected) {
        let tags = [
          { name: "Action", value: "UserRecord" },
          {
            name: "WalletOwner",
            value: userAddress,
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
        setUserRecords(jsonData)

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
      } else {
        // TODO: remove user records and other necessary states
      }
    })()
  }, [isConnected])

  const getRecords = async () => {
    const ant = ANT.init({
      processId: ANT_PROCESS_ID,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const getOwner = async () => {
    let tags = [
      { name: "Action", value: "Record" },
      {
        name: "Sub-Domain",
        value: newSubdomain,
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
    setSubdomainOwner(jsonData.Owner)
  }

  const setRecord = async () => {
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

  const removeUserRecord = async (record, index) => {
    const _connected = await connectWallet()
    console.log("_connected", _connected)
    if (_connected.success === false) {
      return
    }

    try {
      const messageId = await message({
        process: MAIN_PROCESS_ID,
        tags: [
          {
            name: "Action",
            value: "Remove-Record",
          },
          {
            name: "Sub-Domain",
            value: record.SubDomain,
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

      setUserRecords((prevUserRecords) =>
        prevUserRecords.filter((_, i) => i !== index)
      )

      toast({
        title: "Subdomain record removed successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    } catch (e) {
      console.error("removeUserRecord() error!", e)
      toast({
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const editUserRecord = async (record, index) => {
    setUsername(record.Username)
    setDescription(record.Description)
    setLinks(JSON.parse(record.Urls))
    setNewSubdomain(record.SubDomain)
    setNewRecordTxId(record.TransactionId)
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
      await getOwner()
      toast({
        title: "Subdomain already exists in the records",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    } else {
      toast({
        title: "Subdomain is available",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    }
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
          flex="1" //fill available height vertically
        >
          {/* Main Body Container */}
          <Flex
            flexDirection="column"
            flex="1" //fill available width horizontally
            gap={1}
          >
            {/* AppHeader Container */}
            <Flex>
              <AppHeader />
            </Flex>

            {/* Main Content Container */}
            <Flex
              flex="1" //fill available height vertically
              paddingX={[2, 12]}
              paddingY={[12, 12]}
              justifyContent="center"
            >
              <Flex
                flexDirection="column"
                flex="1" //fill available width horizontally
              >
                {gateway.length > 0 && (
                  <>
                    <Text>Gateways</Text>
                    <Flex flexDirection="column" gap={2} paddingBottom={8}>
                      {gateway.map((gateway, index) => {
                        return (
                          <Link
                            key={index}
                            href={formatUrl(gateway)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {gateway}
                          </Link>
                        )
                      })}
                    </Flex>
                  </>
                )}

                <Flex flexDirection="column" gap={2} paddingBottom={8}>
                  {isConnected && (
                    <>
                      <Flex
                        flexDirection="column"
                        flex="1" //fill available width horizontally
                      >
                        {userRecords.length > 0 && (
                          <>
                            <Text>Manage Subdomain</Text>

                            <Flex
                              flexDirection="column"
                              gap={2}
                              paddingBottom={8}
                            >
                              {userRecords.map((record, index) => {
                                return (
                                  <Flex
                                    key={record.SubDomain}
                                    alignItems="center"
                                    gap={4}
                                  >
                                    <Text
                                      onClick={async () => {
                                        await editUserRecord(record, index)
                                      }}
                                      cursor="pointer"
                                    >
                                      ✏️
                                    </Text>
                                    <Text
                                      onClick={async () => {
                                        await removeUserRecord(record, index)
                                      }}
                                      cursor="pointer"
                                    >
                                      🗑️
                                    </Text>
                                    <Text
                                      whiteSpace="normal"
                                      wordBreak="break-word"
                                    >
                                      {record.SubDomain}
                                    </Text>
                                  </Flex>
                                )
                              })}
                            </Flex>
                          </>
                        )}
                      </Flex>
                    </>
                  )}
                </Flex>

                <Flex flexDirection="column" gap={2}>
                  <Text fontSize="xs">Subdomain</Text>
                  <Input
                    value={newSubdomain}
                    placeholder="ar://subdomain_everlink"
                    onChange={(e) => setNewSubdomain(e.target.value)}
                  />
                  {subdomainOwner && (
                    <>
                      <Text fontSize="xs">Owner</Text>
                      <Text>{subdomainOwner}</Text>
                    </>
                  )}

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
                </Flex>

                <Flex flexDirection="column" gap={2} paddingTop={8}>
                  <Text fontSize="xs">Template</Text>
                  <Select>
                    <option value={newRecordTxId}>Basic</option>
                  </Select>
                  <Text fontSize="xs">Username</Text>
                  <Input
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Text fontSize="xs">Description</Text>
                  <Input
                    value={description}
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
                    <Flex key={index} alignItems="center" gap={4}>
                      <Text cursor="pointer" onClick={() => removeLink(index)}>
                        🗑️
                      </Text>
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
      </ChakraProvider>
    </>
  )
}
