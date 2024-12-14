import React from "react";
import { HttpTypes } from "@medusajs/types";
import { Text } from "@medusajs/ui";

import InteractiveLink from "@modules/common/components/interactive-link";
import Slider from "./Slider/slider"; // Importăm componenta Slider
import ProductPreview from "@modules/products/components/product-preview";

export default function ProductRail({
  collection,
  region,
  main,
}: {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
  main?: boolean;
}) {
  const { products } = collection;

  if (!products) {
    return null;
  }

  return (
    <div className={`content-container py-12 small:py-24 w-full`}>
      {!main && (
        <div className="flex justify-between mb-8 text-red-400">
          <Text className="txt-xlarge">{collection.title}</Text>
          <InteractiveLink href={`/colectii/${collection.handle}`}>
            Vezi mai multe
          </InteractiveLink>
        </div>
      )}
      {main ? (
        <Slider products={products} region={region} />
      ) : (
        <div className="grid grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
          {products.map((product) => (
            <div key={product.id}>
              {/* @ts-ignore */}
              <ProductPreview product={product} region={region} isFeatured />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
