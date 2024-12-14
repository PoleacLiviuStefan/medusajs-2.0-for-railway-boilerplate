'use client'
import { useState, useEffect } from "react"
import { searchProducts } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"
import { getRegion } from "@lib/data/regions"

const SearchModal = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null)

  // Fetch region on component mount
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const fetchedRegion = await getRegion("RO") // Fetch region based on country code
        setRegion(fetchedRegion)
      } catch (err) {
        console.error("Failed to fetch region:", err)
      }
    }
    fetchRegion()
  }, [])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      setIsLoading(true)
      const products = await searchProducts(value, "RO")
      setResults(products)
      setIsLoading(false)
    } else {
      setResults([])
    }
  }

  return (
    <div className="search-modal-container p-4 bg-white shadow-lg">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Caută produse..."
        className="w-full p-2 border border-gray-300 rounded"
        data-testid="search-input"
      />
      {isLoading ? (
        <p>Se caută...</p>
      ) : results.length > 0 && region ? (
<ul className="search-results grid grid-cols-2 gap-6" data-testid="search-results">
  {results.map((product) => (
    <li key={product.id} data-testid="search-result">
      <ProductPreview product={product} isFeatured={false} region={region} />
    </li>
  ))}
</ul>

      ) : query.length > 2 ? (
        <div data-testid="no-search-results-container">
          <p>Nu au fost găsite produse pentru căutarea ta.</p>
        </div>
      ) : null}
    </div>
  )
}

export default SearchModal
