import { Html, Main, NextScript } from "next/document";
import { Head } from "arnext";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ minHeight: "100vh" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
