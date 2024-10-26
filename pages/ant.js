import { ANT, ArconnectSigner } from "@ar.io/sdk/web"
import Arweave from "arweave"
import { useState } from "react"

const PROCESS_ID = "Pd1ZsBrv-AIbBHQIPfOAzabwcH0oB0zWNfzuLFP8aFg"

export default function Home() {
  const [processId, setProcessId] = useState()
  const [newController, setNewController] = useState()
  const [newUndername, setNewUndername] = useState()
  const [newRecordTxId, setNewRecordTxId] = useState()

  const getInfo = async () => {
    const ant = ANT.init({
      processId: PROCESS_ID,
    })
    const info = await ant.getInfo()
    console.log(info)
  }

  const initAuth = async () => {
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })
    console.log(ant)
  }

  const initUnauth = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    console.log(ant)
  }

  const getController = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    const info = await ant.getControllers()
    console.log(info)
  }

  const getOwner = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    const info = await ant.getOwner()
    console.log(info)
  }

  const getRecords = async () => {
    const ant = ANT.init({
      processId: processId || PROCESS_ID,
    })
    const info = await ant.getRecords()
    console.log(info)
  }

  const addController = async () => {
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })
    console.log(ant)

    const result = await ant.addController({
      controller: newController,
    })
    console.log(result)
  }

  const removeController = async () => {
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })
    console.log(ant)

    const result = await ant.removeController({
      controller: newController,
    })
    console.log(result)
  }

  const setRecord = async () => {
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })

    const result = await ant.setRecord({
      undername: newUndername,
      transactionId: newRecordTxId,
      ttlSeconds: 900,
    })
    console.log(result)
  }

  const removeRecord = async () => {
    const ant = ANT.init({
      signer: new ArconnectSigner(window.arweaveWallet, Arweave.init({})),
      processId: processId || PROCESS_ID,
    })

    const result = await ant.removeRecord({ undername: newUndername })
    console.log(result)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 28,
        }}
      >
        <input
          type="text"
          placeholder="Process ID"
          onChange={(e) => setProcessId(e.target.value)}
        />
        <button onClick={getInfo}>getInfo</button>
        <button onClick={initAuth}>initAuth</button>
        <button onClick={initUnauth}>initUnauth</button>
        <button onClick={getController}>getController</button>
        <button onClick={getOwner}>getOwner</button>
        <button onClick={getRecords}>getRecords</button>
        <input
          type="text"
          placeholder="Controller"
          onChange={(e) => setNewController(e.target.value)}
        />
        <button onClick={addController}>addController</button>
        <button onClick={removeController}>removeController</button>
        <input
          type="text"
          placeholder="New Undername Record"
          onChange={(e) => setNewUndername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction ID"
          onChange={(e) => setNewRecordTxId(e.target.value)}
        />
        <button onClick={setRecord}>setRecord</button>
        <button onClick={removeRecord}>removeRecord</button>
      </div>
    </>
  )
}
