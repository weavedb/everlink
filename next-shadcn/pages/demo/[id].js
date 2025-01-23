import { useEffect, useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { UserTable } from "@/components/UserTable"

// Sample data - replace with your actual data fetching logic
const profiles = [
  {
    Subdomain: "dumpet",
    TransactionId: "ma-GzZRRNQvwd-JdqwdmBYwxgbmQn-O4",
  },
  {
    Subdomain: "ethan",
    TransactionId: "8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw",
  },
  {
    Subdomain: "heyhey",
    TransactionId: "Ojbm5pHluWEdD3LgWikGORKQxSUAMdwY",
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
  const [pid, setPid] = useState(_id)

  useEffect(() => {}, [])

  const handleDelete = (subdomain) => {
    console.log("Delete:", subdomain)
  }

  const handleCopy = (subdomain) => {
    console.log("Copy:", subdomain)
  }

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
                profiles={profiles}
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
