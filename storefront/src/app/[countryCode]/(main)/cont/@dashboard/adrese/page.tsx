import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { headers } from "next/headers"
import { getRegion } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params
  const customer = await getCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Adresele de Livrare</h1>
        <p className="text-base-regular">
          Vizualizeaza si actualizeaza adresele de livrare, poti sa adaugi oricate vrei. Prin salvarea adreselor de livrare, acestea se fac disponibile la checkout.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}