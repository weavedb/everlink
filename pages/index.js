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

const ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"
const BASIC_TEMPLATE_TX_ID = "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"

export default function Home() {
  const [newSubdomain, setNewSubdomain] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [userRecords, setUserRecords] = useState([])
  const [userSubdomains, setUserSubdomains] = useState([])
  const [templates, setTemplates] = useState({})
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(
    "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U"
  )
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [links, setLinks] = useState([])

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
    setUserSubdomains(jsonData.map((record) => record.SubDomain))

    const _templatesResult = await dryrun({
      process: MAIN_PROCESS_ID,
      tags: [{ name: "Action", value: "Templates" }],
    })
    console.log("_templatesResult", _templatesResult)
    if (handleMessageResultError(_result)) return
    const _templatesResultData = _templatesResult.Messages[0].Data
    console.log("_templatesResultData", _templatesResultData)
    const jsonTemplates = JSON.parse(_templatesResultData)
    console.log("jsonTemplates", jsonTemplates)
    setTemplates(jsonTemplates)

    const firstTemplateKey = Object.keys(jsonTemplates)[0]
    if (firstTemplateKey) {
      setSelectedTemplate(jsonTemplates[firstTemplateKey])
    }
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

  const publishProfile = () => {
    if (!newSubdomain || !username || !description) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return
    }

    // TODO: Handle submission logic
    toast({
      title: "Profile published successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
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
            {userSubdomains.length > 0 ? (
              <>
                {/* <Heading size="md" color="#7023b6" mb={4}>Subdomain</Heading> */}
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>Subdomain</Th>
                        <Th>Tx Id</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userSubdomains.map((subdomain, index) => (
                        <Tr key={index}>
                          <Td>
                            <IconButton
                              variant={"ghost"}
                              aria-label="Edit Subdomain"
                              icon={<EditIcon />}
                              colorScheme="purple"
                              size="sm"
                            />
                            <IconButton
                              variant={"ghost"}
                              aria-label="Delete Subdomain"
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              size="sm"
                            />
                          </Td>
                          <Td>{subdomain}</Td>
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
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
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
