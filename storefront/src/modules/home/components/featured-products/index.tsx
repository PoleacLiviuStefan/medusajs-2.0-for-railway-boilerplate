import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
  main = false,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
  main?: boolean
}) {
  if (main) {
    // Combinăm toate produsele din colecții într-un singur array
    const combinedProducts = collections.reduce<HttpTypes.StoreProduct[]>((acc, collection) => {
      if (collection.products) {
        acc.push(...collection.products)
      }
      return acc
    }, [])

    // Creăm un obiect de colecție combinată pentru a-l trece la ProductRail
    const combinedCollection: HttpTypes.StoreCollection = {
      id: "combined",
      title: "Produse Recomandate",
      handle: "produse-recomandate",
      products: combinedProducts,
      created_at: new Date().toISOString(), // Setăm o dată default
      updated_at: new Date().toISOString(), // Setăm o dată default
      metadata: {}, // Obiect gol pentru metadata
      deleted_at: null, // Nu este șters
    };


    // Afișăm un singur ProductRail cu toate produsele combinate
    return (
      <ProductRail collection={combinedCollection} region={region} main={main} />
    )
  } else {
    // Comportamentul existent: afișăm un ProductRail pentru fiecare colecție
    return (
      <ul className="w-full">
        {collections.map((collection) => (
          <li key={collection.id}>
            <ProductRail collection={collection} region={region} main={main} />
          </li>
        ))}
      </ul>
    )
  }
}
