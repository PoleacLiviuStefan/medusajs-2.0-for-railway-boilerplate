import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import Modal from "./(components)/Modal/Modal"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        {/* <Modal /> */}
        <main className="relative min-w-screen min-h-screen overflow-hidden">{props.children}</main>
      </body>
    </html>
  )
}
