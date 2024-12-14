import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Pagina nu a fost gasita</h1>
      <p className="text-small-regular text-ui-fg-base">
        Pagina pe care incerci sa o accesezi nu exista.
      </p>
      <InteractiveLink href="/">Mergi spre pagina principala</InteractiveLink>
    </div>
  )
}
