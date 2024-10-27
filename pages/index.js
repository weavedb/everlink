import { useEffect, useState } from "react"
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react"
import AppHeader from "@/components/AppHeader"
import { ANT, ArconnectSigner } from "@ar.io/sdk/web"

const PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
export default function Home({ _date = null }) {
  const [processId, setProcessId] = useState()
  const [newUndername, setNewUndername] = useState()
  const [newRecordTxId, setNewRecordTxId] = useState("")

  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")

  const toast = useToast()

  const getRecords = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const setRecord = async () => {
    await window.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "SIGN_TRANSACTION",
      "ACCESS_PUBLIC_KEY",
      "SIGNATURE",
    ])

    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })

    const result = await ant.setRecord(
      {
        undername: newUndername,
        transactionId: newRecordTxId,
        ttlSeconds: 900,
      },
      // optional additional tags
      {
        tags: [
          { name: "title", value: title },
          { name: "url", value: url },
        ],
      }
    )

    console.log(result)

    toast({
      title: "New undername added to the records",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  const onContinue = async () => {
    if (!newUndername || newUndername.trim() === "") {
      toast({
        title: "Undername cannot be empty",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      })
      return
    }

    console.log("newUndername", newUndername)

    const _records = await getRecords()
    if (_records.hasOwnProperty(newUndername)) {
      toast({
        title: "Undername already exists in the records",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return
    }

    await setRecord()
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
              <Text>Choose your EverLink undername.</Text>
              <Input
                placeholder="ar://xyz_everlink"
                onChange={(e) => setNewUndername(e.target.value)}
              />

              {/* start TODO */}
              <Input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="URL"
                onChange={(e) => setURL(e.target.value)}
              />

              {/* end TODO */}

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
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
