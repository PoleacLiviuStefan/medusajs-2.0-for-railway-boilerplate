import { Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { HttpTypes } from "@medusajs/types";

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct;
  isFeatured?: boolean;
  cheapestPrice?: string;
  region: HttpTypes.StoreRegion;
};

export default function ProductPreview({
  product,
  isFeatured,
  cheapestPrice,
}: ProductPreviewProps) {
  if (!product) {
    return null;
  }

  // Construim un obiect `priceObject` complet pentru a satisface tipul `VariantPrice`
  const priceObject = cheapestPrice
  ? {
      price_type: "sale", // Poate fi "sale" sau "default", ajustează conform logicii
      calculated_price_number: parseFloat(cheapestPrice), // Prețul calculat ca număr
      calculated_price: `${parseFloat(cheapestPrice)} lei`, // Prețul calculat ca string
      original_price_number: parseFloat(cheapestPrice), // Prețul original ca număr
      original_price: `${parseFloat(cheapestPrice)} lei`, // Prețul original ca string
      percentage_diff: "0", // Diferența procentuală ca string (ajustează dacă există reduceri)
      currency_code: "RON", // Codul valutei, ex. RON pentru Lei
    }
  : undefined;


  return (
    <LocalizedClientLink href={`/produse/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col txt-compact-medium mt-4 justify-between">
          <span className="text-yellow-500 text-[13px] lg:text-[15px]">
            {product.collection?.title.toUpperCase()}
          </span>
          <Text
            className="text-ui-fg-subtle font-bold text-wrap w-[80px] lg:w-full text-[13px] lg:text-[18px]"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          {priceObject && (
            <div className="flex items-center gap-2">
              <PreviewPrice price={priceObject} />
              <span className="text-[11px]">TVA inclus</span>
            </div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
}
