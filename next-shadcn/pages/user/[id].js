import { Link, useParams } from "arnext"
import { useEffect, useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { UserTable } from "@/components/UserTable"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BidsTable } from "@/components/BidsTable"
import {
  message,
  createDataItemSigner,
  result,
  dryrun,
} from "@permaweb/aoconnect"
import { MAIN_PROCESS_ID, useAppContext } from "@/context/AppContext"
import { useToast } from "@/hooks/use-toast"

const bids = []

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
  const { toast } = useToast()

  const [userRecords, setUserRecords] = useState([])
  useEffect(() => {
    ;(async () => {
      _id ?? setPid(await getID(id, _id))
    })()
  }, [])

  useEffect(() => {
    if (id) {
      ;(async () => {
        try {
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
          const jsonData = JSON.parse(_resultData)
          console.log("jsonData", jsonData)
          setUserRecords(jsonData)
        } catch (e) {
          console.error("fetch UserRecord error!", e)
          toast({
            title: "Failed to fetch user records",
            description: `${e}`,
            variant: "destructive",
            duration: 2000,
          })
        }
      })()
    }
  }, [id])

  const handleDelete = (subdomain) => {
    console.log("handleDelete:", subdomain)
  }

  const handleEdit = (subdomain) => {
    console.log("handleEdit:", subdomain)
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
                {userRecords.length > 0 ? (
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                    <UserTable
                      records={userRecords}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </div>
                ) : (
                  <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      No subdomain found
                    </p>
                    <Link href="/create">
                      <Button
                        variant="default"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Bids */}
            <div hidden>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">Bids</h1>
              </div>
              {bids.length > 0 ? (
                <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                  <BidsTable
                    bids={bids}
                    onDelete={handleDelete}
                    onCopy={handleEdit}
                  />
                </div>
              ) : (
                <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Nothing here… for now.
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
