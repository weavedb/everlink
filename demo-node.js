const { IO, ArweaveSigner } = require("@ar.io/sdk")
const fs = require("fs")

const jwk = JSON.parse(fs.readFileSync("arweave-keyfile.json"))

const io = IO.init({
  signer: new ArweaveSigner(jwk),
})
console.log(io)
