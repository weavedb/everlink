import { Link, useParams } from "arnext"
import { useEffect, useState } from "react"
import { IO, ANT } from "@ar.io/sdk/web"

const PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}

// const getID = async (id, pid) => `post-${pid ?? id}`
const getID = async (id, pid) => `${pid ?? id}`

export async function getStaticProps({ params: { id } }) {
  return { props: { pid: await getID(id) } }
}

export default function Home({ _id = null }) {
  const { id } = useParams()
  const [pid, setPid] = useState(_id)
  const [arnsName, setArnsName] = useState("drumfeet")

  useEffect(() => {
    ;(async () => _id ?? setPid(await getID(id, _id)))()
  }, [])

  useEffect(() => {
    ;(async () => {
      console.log("pid", pid)
      await start()
    })()
  }, [pid])

  const getRecord = async () => {
    const io = IO.init()
    const record = await io.getArNSRecord({ name: arnsName })
    console.log(record)
    return record
  }

  const getRecords = async (processId) => {
    const ant = ANT.init({
      processId,
    })
    const _records = await ant.getRecords()
    console.log("_records", _records)
    return _records
  }

  const start = async () => {
    const _record = await getRecord()
    const _records = await getRecords(_record?.processId)
    console.log("_records", _records)
  }

  return (
    <>
      <div>undername : {pid}</div>
      <div>
        <Link href="/">back</Link>
      </div>
    </>
  )
}
