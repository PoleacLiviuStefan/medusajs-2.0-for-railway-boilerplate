import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Pagina nu exista</h1>
      <p className="text-small-regular text-ui-fg-base">
        Din pacate pagina pe care incerci sa o accesezi nu exista. Revino la prima pagina.
      </p>
      <InteractiveLink href="/">Spre pagina principala</InteractiveLink>
    </div>
  )
}
