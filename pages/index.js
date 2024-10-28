import { useEffect, useState } from "react"
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react"
import AppHeader from "@/components/AppHeader"
import { ANT, ArconnectSigner } from "@ar.io/sdk/web"
import { message, createDataItemSigner, result } from "@permaweb/aoconnect"

const ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
const MAIN_PROCESS_ID = "BAytmPejjgB0IOuuX7EmNhSv1mkoj5UOFUtt0HHOzr8"

export default function Home({ _date = null }) {
  const [processId, setProcessId] = useState("")
  const [newSubdomain, setNewSubdomain] = useState("")
  const [newRecordTxId, setNewRecordTxId] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [urls, setUrls] = useState([])

  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")

  const toast = useToast()

  const getRecords = async () => {
    const ant = ANT.init({
      processId: processId || ANT_PROCESS_ID,
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
            value: JSON.stringify(urls),
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
    setUrls([...urls, { title, url }])
  }
  return (
    <>
      <Flex minH="100vh" bg="#0e2229">
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
            padding={[2, 12]}
          >
            <Flex flexDirection="column" gap={2}>
              <Text>Welcome to EverLink</Text>
              <Text fontSize="xs">Choose your EverLink subdomain</Text>
              <Input
                placeholder="ar://xyz_everlink"
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
                Continue
              </Button>

              {/* start TODO */}
              <Flex flexDirection="column" gap={2} paddingTop={8}>
                <Text fontSize="xs">Record TxId</Text>
                <Input
                  placeholder="Record TxId"
                  onChange={(e) => setNewRecordTxId(e.target.value)}
                />
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

                {urls.map((link, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontSize="small">{link.title}</Text>
                    <Text fontSize="small">{link.url}</Text>
                  </Flex>
                ))}

                <Button
                  onClick={async (event) => {
                    const button = event.target
                    button.disabled = true

                    await setRecord()
                    console.log("end1")
                    button.disabled = false
                    console.log("end2")
                  }}
                >
                  Set Record
                </Button>
              </Flex>

              {/* end TODO */}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
