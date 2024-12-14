import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

type SearchResultsTemplateProps = {
  query: string
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  sortBy?: string
  page?: number
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  products,
  region,
  sortBy,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page || 1


  return (
    <div className="content-container">
      <div className="flex justify-between border-b w-full py-6 px-8 small:px-14 items-center">
        <div className="flex flex-col items-start">
          <span className="text-ui-fg-muted">Rezultatele căutării pentru:</span>
          <h1>
            {decodeURI(query)} ({products.length})
          </h1>
        </div>
        <a href="/" className="txt-medium text-ui-fg-subtle hover:text-ui-fg-base">
          Înapoi la toate produsele
        </a>
      </div>

      {products.length > 0 ? (
        <div className="py-10">
          
          <PaginatedProducts
            productsIds={products.map(p => p.id)} // Transmiterea listei de ID-uri de produse
            sortBy="created_at" // Opțiunea de sortare
            page={pageNumber} // Paginarea corectă
            countryCode={countryCode} // Transmiterea codului țării pentru regiune
          />
        </div>
      ) : (
        <p className="ml-8 small:ml-14 mt-3">Nu s-au găsit rezultate.</p>
      )}
    </div>
  )
}

export default SearchResultsTemplate
