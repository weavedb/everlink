import { useEffect, useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { UserTable } from "@/components/UserTable"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BidsTable } from "@/components/BidsTable"

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

const bids = []

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
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div>
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-primary">Profiles</h1>
                </div>
                {profiles.length > 0 ? (
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                    <UserTable
                      profiles={profiles}
                      onDelete={handleDelete}
                      onCopy={handleCopy}
                    />
                  </div>
                ) : (
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      No subdomain found
                    </p>
                    <Button
                      variant="default"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">Bids</h1>
              </div>
              {bids.length > 0 ? (
                <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                  <BidsTable
                    bids={bids}
                    onDelete={handleDelete}
                    onCopy={handleCopy}
                  />
                </div>
              ) : (
                <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    No bids available
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
