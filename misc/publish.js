import { useState } from "react"
import { Button, Flex, Input, Text } from "@chakra-ui/react"

export default function Home({ _date = null }) {
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [links, setLinks] = useState([])

  const addNewLink = () => {
    setLinks([...links, { title: newTitle, url: newUrl }])
    setNewTitle("")
    setNewUrl("")
  }

  return (
    <>
      <Flex minH="100vh" direction="column" gap={4} padding={8}>

        <Flex direction="column" gap={2}>
          <Text mb="8px">Title</Text>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <Text mb="8px">URL</Text>
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL"
          />
          <Button onClick={addNewLink}>Add Link</Button>
        </Flex>

        {links.map((link, index) => (
          <Flex
            key={index}
            direction="column"
            gap={2}
            p={4}
            border="1px solid #ccc"
          >
            <Text>Title: {link.title}</Text>
            <Text>URL: {link.url}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  )
}
