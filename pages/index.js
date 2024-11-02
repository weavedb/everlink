import {
  Flex,
  Text,
  Input,
  Button,
  ChakraProvider,
  useToast,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Divider,
  TableContainer,
  Spacer,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  FormControl,
  FormHelperText,
  Select,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { ANT } from "@ar.io/sdk/web"
import { useAppContext } from "@/context/AppContext"
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  PlusSquareIcon,
  SmallAddIcon,
  UpDownIcon,
} from "@chakra-ui/icons"
import UserIcon from "@/components/icons/UserIcon"
import FacebookIcon from "@/components/icons/FacebookIcon"
import TwitterIcon from "@/components/icons/TwitterIcon"
import TiktokIcon from "@/components/icons/TiktokIcon"
import InstagramIcon from "@/components/icons/InstagramIcon"
import LinkedinIcon from "@/components/icons/LinkedinIcon"

const ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const BASIC_TEMPLATE_TX_ID = "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"

export default function Home() {
  const [newSubdomain, setNewSubdomain] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [userRecords, setUserRecords] = useState([])
  // const [userSubdomains, setUserSubdomains] = useState([])
  const [templates, setTemplates] = useState({})
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [selectedTemplateTxId, setSelectedTemplateTxId] = useState(
    "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"
  )
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [links, setLinks] = useState([])
  const [twitter, setTwitter] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [instagram, setInstagram] = useState("")
  const [facebook, setFacebook] = useState("")
  const [linkedin, setLinkedin] = useState("")

  const toast = useToast()
  const {
    connectWallet,
    disconnectWallet,
    isConnected,
    setIsConnected,
    setUserAddress,
    userAddress,
  } = useAppContext()

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

  const getRecords = async () => {
    const ant = ANT.init({
      processId: ANT_PROCESS_ID,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const checkAvailability = async () => {
    console.log("checkAvailability", newSubdomain)
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

  const getTemplates = async () => {
    const _templatesResult = await dryrun({
      process: MAIN_PROCESS_ID,
      tags: [{ name: "Action", value: "Templates" }],
    })
    console.log("_templatesResult", _templatesResult)
    if (handleMessageResultError(_templatesResult)) return
    const _templatesResultData = _templatesResult.Messages[0].Data
    console.log("_templatesResultData", _templatesResultData)
    const jsonTemplates = JSON.parse(_templatesResultData)
    console.log("jsonTemplates", jsonTemplates)
    setTemplates(jsonTemplates)

    const firstTemplateKey = Object.keys(jsonTemplates)[0]
    if (firstTemplateKey) {
      setSelectedTemplateTxId(jsonTemplates[firstTemplateKey])
    }
  }

  const login = async () => {
    const _connected = await connectWallet()
    if (_connected.success === false) {
      return
    }
    const _userAddress = _connected.userAddress
    console.log("_userAddress", _userAddress)

    let tags = [
      { name: "Action", value: "UserRecord" },
      {
        name: "WalletOwner",
        value: _userAddress,
      },
    ]
    const _result = await dryrun({
      process: MAIN_PROCESS_ID,
      tags,
    })
    console.log("_result", _result)
    if (handleMessageResultError(_result)) return
    const _resultData = _result.Messages[0].Data
    console.log("_resultData", _resultData)
    const jsonData = JSON.parse(_resultData)
    console.log("jsonData", jsonData)
    setUserRecords(jsonData)
    // setUserSubdomains(jsonData.map((record) => record.Subdomain))
  }

  const logout = async () => {
    const _connected = await disconnectWallet()
    if (_connected.success === false) {
      return
    }

    toast({
      description: "Account disconnected",
      duration: 2000,
      isClosable: true,
      position: "top",
    })

    // TODO: Redirect to index.js
  }

  const publishProfile = async () => {
    if (!newSubdomain || !selectedTemplateTxId || !username) {
      toast({
        title: "Subdomain, Template, and Name are required",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return
    }

    try {
      const _connected = await connectWallet()
      console.log("_connected", _connected)
      if (_connected.success === false) {
        return
      }

      const existingRecordIndex = userRecords.findIndex(
        (record) => record.Subdomain === newSubdomain
      )

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

      if (existingRecordIndex !== -1) {
        setUserRecords((prevRecords) => {
          const newRecords = [...prevRecords]
          newRecords[existingRecordIndex] = {
            Subdomain: newSubdomain,
            Username: username,
            Description: description,
            TransactionId: selectedTemplateTxId,
            Links: JSON.stringify(links),
            Twitter: twitter,
            Tiktok: tiktok,
            Instagram: instagram,
            Facebook: facebook,
            Linkedin: linkedin,
          }
          return newRecords
        })
      } else {
        setUserRecords((prevRecords) => [
          ...prevRecords,
          {
            Subdomain: newSubdomain,
            Username: username,
            Description: description,
            TransactionId: selectedTemplateTxId,
            Links: JSON.stringify(links),
            Twitter: twitter,
            Tiktok: tiktok,
            Instagram: instagram,
            Facebook: facebook,
            Linkedin: linkedin,
          },
        ])
      }

      toast({
        title:
          existingRecordIndex !== -1
            ? "Profile updated successfully"
            : "Profile published successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
    } catch (e) {
      console.error(e)
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
            value: record.Subdomain,
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
      console.error(e)
    }
  }

  const addNewLink = async () => {
    const _url = formatUrl(url)
    setLinks([...links, { title, url: _url }])
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

  return (
    <ChakraProvider>
      {isConnected ? (
        <>
          <Flex
            flexDirection="column"
            alignItems="center"
            p={5}
            bg="#f3f0fa"
            minH="100vh"
          >
            <Flex
              w="full"
              justify="space-between"
              align="center"
              paddingX={[0, 8]}
            >
              <Text fontSize="3xl" color="#7023b6" fontWeight="bold">
                Everlink
              </Text>
              <Flex _hover={{ cursor: "pointer" }} onClick={logout}>
                <UserIcon strokeColor="#7023b6" size="34" />
              </Flex>
            </Flex>
            <Divider />
            <Flex paddingY={8}></Flex>
            {userRecords.length > 0 ? (
              <>
                {/* <Heading size="md" color="#7023b6" mb={4}>Subdomain</Heading> */}
                <TableContainer width="100%" maxW="md">
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>Subdomain</Th>
                        <Th>Template Tx Id</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userRecords.map((record, index) => (
                        <Tr key={index}>
                          <Td>
                            <IconButton
                              variant={"ghost"}
                              aria-label="Edit Subdomain"
                              icon={<EditIcon />}
                              colorScheme="purple"
                              size="sm"
                              onClick={async (event) => {
                                console.log("userRecords", userRecords[index])
                                setUsername(userRecords[index].Username)
                                setDescription(userRecords[index].Description)
                                setLinks(JSON.parse(userRecords[index].Links))
                                setNewSubdomain(userRecords[index].Subdomain)
                                setSelectedTemplateTxId(
                                  userRecords[index].TransactionId
                                )
                                setTwitter(userRecords[index].Twitter)
                                setTiktok(userRecords[index].Tiktok)
                                setInstagram(userRecords[index].Instagram)
                                setFacebook(userRecords[index].Facebook)
                                setLinkedin(userRecords[index].Linkedin)
                                setShowProfileForm(true)
                              }}
                            />
                            <IconButton
                              variant={"ghost"}
                              aria-label="Delete Subdomain"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              size="sm"
                              onClick={async (event) => {
                                console.log("userRecords", userRecords[index])
                                const button = event.target
                                button.disabled = true
                                await removeUserRecord(
                                  userRecords[index],
                                  index
                                )
                                button.disabled = false
                              }}
                            />
                          </Td>
                          <Td>{record.Subdomain}</Td>
                          <Td>{userRecords[index].TransactionId}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <>
                <Text color="#7023b6">No subdomain found</Text>
                <Flex paddingY={8}></Flex>
              </>
            )}
            <Flex paddingY={4}></Flex>

            <Flex
              align="center"
              bg="white"
              borderRadius="md"
              width="100%"
              maxW="md"
              mb="4"
            >
              <Input
                value={newSubdomain}
                placeholder="yoursubdomain"
                border="none"
                focusBorderColor="#7023b6"
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => setNewSubdomain(e.target.value)}
              />
              <Text px="4" color="gray.500">
                _everlink.ar.io
              </Text>
            </Flex>
            <Button
              colorScheme="purple"
              width="100%"
              maxW="md"
              onClick={async (event) => {
                const button = event.target
                button.disabled = true

                await checkAvailability()
                button.disabled = false
              }}
            >
              Available?
            </Button>

            <Flex
              paddingY={4}
              alignItems="center"
              gap={2}
              width="100%"
              maxW="md"
              onClick={() => setShowProfileForm(!showProfileForm)}
              cursor="pointer"
            >
              <UpDownIcon boxSize={3} color="#7023b6" />
              <Text color="#7023b6" fontSize="small">
                Setup
              </Text>
            </Flex>

            {showProfileForm && (
              <Flex direction="column" gap={2} width="100%" maxW="md">
                <FormControl>
                  <FormHelperText fontSize="xs">Name</FormHelperText>
                  <Input
                    focusBorderColor="#7023b6"
                    value={username}
                    aria-label="Name"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormHelperText fontSize="xs">Description</FormHelperText>
                  <Input
                    focusBorderColor="#7023b6"
                    value={description}
                    aria-label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormHelperText fontSize="xs">Template</FormHelperText>
                  <Select
                    focusBorderColor="#7023b6"
                    value={selectedTemplateTxId}
                    onChange={(e) => setSelectedTemplateTxId(e.target.value)}
                  >
                    {templates && Object.keys(templates).length > 0 ? (
                      Object.entries(templates).map(([key, value]) => (
                        <option key={key} value={value}>
                          {key}
                        </option>
                      ))
                    ) : (
                      <option disabled>No templates available</option>
                    )}
                  </Select>
                </FormControl>

                <Flex paddingY={2}></Flex>
                <Flex alignItems="center" gap={2}>
                  <TwitterIcon />
                  <Input
                    placeholder="Twitter"
                    focusBorderColor="#7023b6"
                    value={twitter}
                    aria-label="Twitter"
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <TiktokIcon />
                  <Input
                    placeholder="Tiktok"
                    focusBorderColor="#7023b6"
                    value={tiktok}
                    aria-label="Tiktok"
                    onChange={(e) => setTiktok(e.target.value)}
                  />
                </Flex>

                <Flex alignItems="center" gap={2}>
                  <InstagramIcon />
                  <Input
                    placeholder="Instagram"
                    focusBorderColor="#7023b6"
                    value={instagram}
                    aria-label="Instagram"
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <FacebookIcon />
                  <Input
                    placeholder="Facebook"
                    focusBorderColor="#7023b6"
                    value={facebook}
                    aria-label="Facebook"
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <LinkedinIcon />
                  <Input
                    placeholder="Linkedin"
                    focusBorderColor="#7023b6"
                    value={linkedin}
                    aria-label="Linkedin"
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </Flex>

                <Flex paddingY={4}></Flex>
                <Flex
                  alignItems="center"
                  gap={2}
                  width="100%"
                  maxW="md"
                  onClick={addNewLink}
                  cursor="pointer"
                >
                  <Text fontSize="small" color="#7023b6">
                    Add Link
                  </Text>
                  <AddIcon boxSize={3} color="#7023b6" />
                </Flex>
                <FormControl>
                  <FormHelperText fontSize="xs">Title</FormHelperText>
                  <Input
                    focusBorderColor="#7023b6"
                    value={title}
                    aria-label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormHelperText fontSize="xs">Url</FormHelperText>
                  <Input
                    focusBorderColor="#7023b6"
                    value={url}
                    aria-label="Url"
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </FormControl>
                <Flex paddingY={2}></Flex>

                {links.map((link, index) => (
                  <Flex
                    key={index}
                    alignItems="center"
                    gap={4}
                    border="1px solid"
                    borderColor="gray.400"
                    paddingY={2}
                    borderRadius="lg"
                  >
                    <IconButton
                      variant={"ghost"}
                      aria-label="Delete Subdomain"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => removeLink(index)}
                    />
                    <Flex flexDirection="column">
                      <Text
                        fontSize="small"
                        whiteSpace="normal"
                        wordBreak="break-word"
                        fontWeight="bold"
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

                <Flex paddingY={8}></Flex>
                <Button
                  colorScheme="purple"
                  onClick={publishProfile}
                  width="100%"
                  maxW="md"
                >
                  Publish Profile
                </Button>
                <Flex paddingY={28}></Flex>
              </Flex>
            )}
          </Flex>
        </>
      ) : (
        <>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="#7023b6"
            height="100vh"
            padding="4"
          >
            <Text fontSize="4xl" fontWeight="bold" color="white" pb="2">
              Welcome to Everlink!
            </Text>
            <Text fontSize="md" color="white" pb="6">
              Choose your Everlink subdomain. You can always change it later.
            </Text>
            <Flex
              align="center"
              bg="white"
              borderRadius="md"
              width="100%"
              maxW="md"
              mb="4"
            >
              <Input
                value={newSubdomain}
                placeholder="yoursubdomain"
                border="none"
                focusBorderColor="none"
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => setNewSubdomain(e.target.value)}
              />
              <Text px="4" color="gray.500">
                _everlink.ar.io
              </Text>
            </Flex>
            <Button
              colorScheme="purple"
              width="100%"
              maxW="md"
              onClick={async (event) => {
                const button = event.target
                button.disabled = true

                await checkAvailability()
                button.disabled = false
              }}
            >
              Available?
            </Button>
            <Text paddingTop="4" fontSize="sm" color="white">
              Ready to create your profile?{" "}
              <Button
                variant="link"
                color="#9f7aea"
                onClick={async (event) => {
                  const button = event.target
                  button.disabled = true
                  await getTemplates()
                  await login()
                  button.disabled = false
                }}
              >
                Log in
              </Button>
            </Text>
          </Flex>
        </>
      )}
    </ChakraProvider>
  )
}
