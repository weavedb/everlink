import { Link, useParams } from "arnext"
import { useEffect, useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { UserTable } from "@/components/UserTable"
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"
import { MAIN_PROCESS_ID, useAppContext } from "@/context/AppContext"

// Sample data - replace with your actual data fetching logic
const profiles = [
  {
    subdomain: "dumpet",
    templateTxId: "ma-GzZRRNQvwd-JdqwdmBYwxgbmQn-O4",
  },
  {
    subdomain: "ethan",
    templateTxId: "Ojbm5pHluWEdD3LgWikGORKQxSUAMdwY",
  },
  {
    subdomain: "heyhey",
    templateTxId: "Ojbm5pHluWEdD3LgWikGORKQxSUAMdwY",
  },
]

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}

const getID = async (id, pid) => `post-${pid ?? id}`

export async function getStaticProps({ params: { id } }) {
  return { props: { pid: await getID(id) } }
}

export default function Home({ _id = null }) {
  const { id } = useParams()
  const [pid, setPid] = useState(_id)
  const { handleMessageResultError } = useAppContext()

  const [userRecords, setUserRecords] = useState([])
  useEffect(() => {
    ;(async () => {
      _id ?? setPid(await getID(id, _id))
    })()
  }, [])

  useEffect(() => {
    if (id) {
      ;(async () => {
        const _result = await dryrun({
          process: MAIN_PROCESS_ID,
          tags: [
            { name: "Action", value: "UserRecord" },
            {
              name: "WalletOwner",
              value: id,
            },
          ],
        })
        console.log("_result", _result)

        if (handleMessageResultError(_result)) return
        const _resultData = _result.Messages[0].Data
        console.log("_resultData", _resultData)
        const jsonData = JSON.parse(_resultData)
        console.log("jsonData", jsonData)
        setUserRecords(jsonData)
      })()
    }
  }, [id])

  const handleDelete = (subdomain) => {
    console.log("Delete:", subdomain)
  }

  const handleCopy = (subdomain) => {
    console.log("Copy:", subdomain)
  }

  const profiles = [
    // Example profiles data, replace with your actual data
    { subdomain: "example1", templateTxId: "1234567890" },
    { subdomain: "example2", templateTxId: "0987654321" },
  ]

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-primary">Profiles</h1>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
              <UserTable
                profiles={userRecords}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
