import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LorenaBanner from '../../../../public/Imagini/stiliste/lorena-shop-banner.png'
import PaginatedProducts from "./paginated-products"
import TopSellingProducts from "./top-selling-products"
import Hero from "@modules/home/components/hero"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <>
         <Hero image={LorenaBanner} imageWidth="350" imageWidthMobile="300" backCircle={true} /> 
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
        
      <RefinementList sortBy={sort} />
      <div className="flex flex-col items-center justify-center w-full min-h-[150px]">
 

        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
    </>
  )
}

export default StoreTemplate
