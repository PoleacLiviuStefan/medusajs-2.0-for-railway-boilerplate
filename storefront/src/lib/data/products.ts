import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"
import { getRegion } from "./regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { sortProducts } from "@lib/util/sort-products"

// Funcție pentru a obține produsele după ID-uri
export const getProductsById = cache(async function ({
  ids,
  regionId,
}: {
  ids: string[]
  regionId: string
}) {
  return sdk.store.product
    .list(
      {
        id: ids,
        region_id: regionId,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products }) => products)
})

// Funcție pentru a obține un produs după handle
export const getProductByHandle = cache(async function (
  handle: string,
  regionId: string
) {
  return sdk.store.product
    .list(
      {
        handle,
        region_id: regionId,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products }) => products[0])
})

// Funcție pentru a obține lista de produse cu paginare și filtrare pe baza queryParams
export const getProductsList = async function ({
  queryParams,
  countryCode,
}: {
  queryParams?: {
    q?: string;
    id?: string[]; // Confirmare că `id` este `string[]`
    collection_id?: string[]; // Confirmare că `collection_id` este `string[]`
    limit?: number;
    offset?: number;
    order?: string;
    fields?: string;
    tag_id?: string | string[];
    region_id?: string;
    currency_code?: string;
    category_id?: string | string[];
  };
  countryCode: string;
}) {
  const region = await getRegion(countryCode);

  if (!region) {
    return { response: { products: [], count: 0 } };
  }

  return sdk.store.product
    .list(
      {
        ...queryParams,
        region_id: region.id,
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products, count }) => ({
      response: { products, count },
    }));
};

export const getRelatedProducts = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const validPageParam = Math.max(pageParam, 1);
  const offset = (validPageParam - 1) * limit
  const region = await getRegion(countryCode)
  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }
  return sdk.store.product
    .list(
      {
        limit,
        offset,
        region_id: region.id,
        fields: "*variants.calculated_price",
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null
      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
})
// Funcție pentru a obține produsele cele mai vândute
export const getTopSellingProducts = cache(async function ({
  page = 1,
  queryParams,
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12

  const collectionIds = Array.isArray(queryParams?.collection_id)
  ? queryParams.collection_id
  : queryParams?.collection_id
  ? [queryParams.collection_id]
  : undefined;

const ids = Array.isArray(queryParams?.id)
  ? queryParams.id
  : queryParams?.id
  ? [queryParams.id]
  : undefined;

const { response: { products, count } } = await getProductsList({
  queryParams: {
    ...queryParams,
    id: ids, // Asigurare că `id` este `string[]`
    collection_id: collectionIds, // Asigurare că `collection_id` este `string[]`
  },
  countryCode,
});




  const sortedProducts = products.sort((a, b) => {
    const soldA = (a as any).sold_quantity || 0
    const soldB = (b as any).sold_quantity || 0
    return soldB - soldA
  })

  const offset = (page - 1) * limit
  const nextPage = count > offset + limit ? page + 1 : null
  const paginatedProducts = sortedProducts.slice(offset, offset + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
})

// Funcție pentru a obține lista de produse cu opțiuni de sortare și filtrare pe ID-uri
export const getProductsListWithSort = cache(async function ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const offset = (page - 1) * limit

  if (queryParams?.id) {
    console.log("Filtering products by ID:", queryParams.id)
  }
  const ids = Array.isArray(queryParams?.id)
  ? queryParams.id
  : queryParams?.id
  ? [queryParams.id]
  : undefined;
  const collectionIds = Array.isArray(queryParams?.collection_id)
  ? queryParams.collection_id
  : queryParams?.collection_id
  ? [queryParams.collection_id] // Convertim string-ul într-un array
  : undefined;

const { response: { products, count } } = await getProductsList({
  queryParams: {
    ...queryParams,
    id: ids, // Asigurăm că `id` este un `string[]`
    collection_id: collectionIds, // Asigurăm că `collection_id` este un `string[]`
    limit,
    offset,
  },
  countryCode,
});


  const sortedProducts = sortProducts(products, sortBy)
  const nextPage = count > offset + limit ? page + 1 : null

  return {
    response: {
      products: sortedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
})

// Funcție pentru a cauta produsele după query (cuvinte cheie)
export async function searchProducts(query: string, countryCode: string) {
  const region = await getRegion(countryCode)
  if (!region) return []

  const { products } = await sdk.store.product.list({
    q: query,
    region_id: region.id,
  })

  return products
}
