import { Link, useParams } from "arnext"
import { useEffect, useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { ProfilesTable } from "@/components/ProfilesTable"

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

  useEffect(() => {
    ;(async () => _id ?? setPid(await getID(id, _id)))()
  }, [])

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
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-primary">Profiles</h1>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
              <ProfilesTable
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
