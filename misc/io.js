import { Link, ssr } from "arnext"
import { useEffect, useState } from "react"
import { IO, ANT, ArconnectSigner } from "@ar.io/sdk/web"
import Arweave from "arweave"

const getDate = async (date) => date ?? Date.now()

export const getStaticProps = ssr(async ({}) => {
  return { props: { _date: Date.now() }, revalidate: 100 }
})

export default function Home({ _date = null }) {
  const [date, setDate] = useState(_date)
  useEffect(() => {
    ;(async () => _date ?? setDate(await getDate()))()
  }, [])

  const initAuth = async () => {
    const io = IO.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
    })
    console.log(io)
  }

  const initUnauth = async () => {
    const io = IO.init()
    console.log(io)
  }

  const getInfo = async () => {
    const io = IO.init()
    const info = await io.getInfo()
    console.log(info)
  }

  const getRecord = async () => {
    const io = IO.init()
    const record = await io.getArNSRecord({ name: "bobinstein" })
    console.log(record)
  }

  const getRecords = async () => {
    const io = IO.init()

    const records = await io.getArNSRecords({
      limit: 25,
      sortBy: "startTimestamp",
      sortOrder: "asc",
    })
    console.log(records)

    const nextPage = await io.getArNSRecords({
      cursor: records.nextCursor,
      limit: 5,
      sortBy: "endTimestamp",
      sortOrder: "desc",
    })
    console.log(nextPage)
  }

  return (
    <>
      home: {date} | <Link href="/post/a">post-a</Link> |{" "}
      <Link href="/abc">404</Link>
      <br />
      <br />
      <button onClick={initAuth}>initAuth</button>
      <br />
      <br />
      <button onClick={initUnauth}>initUnauth</button>
      <br />
      <br />
      <button onClick={getInfo}>getInfo</button>
      <br />
      <br />
      <button onClick={getRecord}>getArNSRecord</button>
      <br />
      <br />
      <button onClick={getRecords}>getArNSRecords</button>
    </>
  )
}
