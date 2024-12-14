import SearchResultsTemplate from "@modules/search/templates/search-results-template"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

export default async function SearchResultsPage({
  params,
}: {
  params: { query: string; countryCode: string }
}) {
  const { query, countryCode } = params

  let products = []
  let region: StoreRegion | null = null
  let error: string | null = null

  try {
    // Obține regiunea pentru codul țării
    region = await getRegion(countryCode)
    if (!region) {
      throw new Error("Region not found")
    }

    // Obține produsele pe baza query-ului de căutare
    const { response } = await getProductsList({
      queryParams: { q: query }, // Elimină 'limit' dacă nu este suportat
      countryCode: countryCode,
    })

    products = response.products
  } catch (err) {
    error = "No products found or an error occurred."
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      {/* Renderizarea rezultatelor de căutare */}
      <SearchResultsTemplate
        query={query}
        products={products}
        region={region} // Transmiterea obiectului de tip StoreRegion
        sortBy="created_at"
        page={1}
        countryCode={countryCode}
      />
    </div>
  )
}
