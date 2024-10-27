import { useEffect, useState } from "react"
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react"
import AppHeader from "@/components/AppHeader"
import { ANT } from "@ar.io/sdk/web"

const PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
export default function Home({ _date = null }) {
  const [processId, setProcessId] = useState()
  const [newUndername, setNewUndername] = useState()

  const toast = useToast()

  const getRecords = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    const info = await ant.getRecords()
    console.log(info)
    return info
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

    console.log(newUndername)
    const _records = await getRecords()
    console.log("_records", _records)

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

    console.log("Proceeding with:", newUndername)
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
              <Button onClick={onContinue}>Continue</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
