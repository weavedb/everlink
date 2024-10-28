import { useState } from "react"
import { message, createDataItemSigner, result } from "@permaweb/aoconnect"

const PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"

export default function Home() {
  const [newUndername, setNewUndername] = useState()
  const [newRecordTxId, setNewRecordTxId] = useState()

  const setRecord = async () => {
    await window.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "SIGN_TRANSACTION",
      "ACCESS_PUBLIC_KEY",
      "SIGNATURE",
    ])

    const messageId = await message({
      process: PROCESS_ID,
      tags: [
        {
          name: "Action",
          value: "Set-Record",
        },
        {
          name: "Sub-Domain",
          value: newUndername,
        },
        {
          name: "Transaction-Id",
          value: newRecordTxId,
        },
        {
          name: "TTL-Seconds",
          value: "900",
        },
      ],
      signer: createDataItemSigner(globalThis.arweaveWallet),
    })
    console.log("messageId", messageId)

    const _result = await result({
      message: messageId,
      process: PROCESS_ID,
    })
    console.log("_result", _result)
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
          placeholder="New Undername Record"
          onChange={(e) => setNewUndername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction ID"
          onChange={(e) => setNewRecordTxId(e.target.value)}
        />
        <button onClick={setRecord}>setRecord</button>
      </div>
    </>
  )
}
