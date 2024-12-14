import Product from "../product-preview"
import { getRegion } from "@lib/data/regions"
import { getRelatedProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  if (!product.collection.id) {
    return null
  }

  const queryParams: HttpTypes.StoreProductParams = {
    region_id: region.id,
    collection_id: [product.collection_id],
    is_giftcard: false,
  }

  const products = await getRelatedProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-md lg:text-xl font-bold">Produse Similare</span>
        <p className="text-lg-regular text-gray-600 text-ui-fg-base max-w-lg">
          Descoperă mai multe produse care te-ar interesa
        </p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
      {products.map((relatedProduct) => {
  const firstVariant = relatedProduct.variants?.[0];
  const firstPriceRaw = firstVariant?.calculated_price;

  // Conversie sigură a `firstPriceRaw` la un număr
  const firstPrice = firstPriceRaw ? Number(firstPriceRaw) : undefined;

  if (typeof firstPrice !== "number" || isNaN(firstPrice)) {
    console.warn("Invalid firstPrice for product:", relatedProduct.id);
    return null; // Sau gestionează altfel produsele cu prețuri invalide
  }

  const priceObject = {
    price_type: "default",
    calculated_price_number: firstPrice / 100,
    calculated_price: `${(firstPrice / 100).toFixed(2)} lei`,
    original_price_number: firstPrice / 100,
    original_price: `${(firstPrice / 100).toFixed(2)} lei`,
    percentage_diff: "0", // Ajustează dacă este necesar
    currency_code: "RON", // Ajustează codul valutar dacă este necesar
  };

  return (
    <li key={relatedProduct.id}>
      <Product
        product={relatedProduct}
        isFeatured={false}
        cheapestPrice={priceObject.calculated_price}
        region={region}
      />
    </li>
  );
})}

      </ul>
    </div>
  )
}
