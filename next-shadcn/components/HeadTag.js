import Head from "next/head"

export default function HeadTag() {
  return (
    <Head>
      <title>everlink.fun</title>
      <meta
        name="description"
        content="Personalized link-in-bio profile pages that showcase and empower your brand, permanently hosted on Arweave."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="./window.svg" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="everlink.fun" />
      <meta
        name="twitter:description"
        content="Personalized link-in-bio profile pages that showcase and empower your brand, permanently hosted on Arweave."
      />
      <meta
        name="twitter:image"
        content="https://arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
      />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:url" content="https://everlink.fun" />
      <meta property="og:title" content="everlink.fun" />
      <meta
        name="og:description"
        content="Personalized link-in-bio profile pages that showcase and empower your brand, permanently hosted on Arweave."
      />
      <meta
        name="og:image"
        content="https://arweave.net/yaIjIckGBsShDIT-_2LeNJaY0f_Boqr_AxBiBqdeBf8"
      />
    </Head>
  )
}
