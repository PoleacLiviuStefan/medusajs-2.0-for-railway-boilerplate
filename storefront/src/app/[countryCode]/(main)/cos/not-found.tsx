import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Pagina nu exista</h1>
      <p className="text-small-regular text-ui-fg-base">
        The cart you tried to access does not exist. Clear your cookies and try
        again.
        Cosul pe care incerci sa il accesezi nu exista. Sterge cookie-urile si incearca din nou.
      </p>
      <InteractiveLink href="/">Go to frontpage</InteractiveLink>
    </div>
  )
}
