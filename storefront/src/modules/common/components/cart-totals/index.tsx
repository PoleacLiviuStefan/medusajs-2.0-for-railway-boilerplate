"use client"

import { convertToLocale } from "@lib/util/money"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    items?: HttpTypes.StoreCartLineItem[] // Tip corect pentru iteme
  }
}

const CartTotals: React.FC<CartTotalsProps> = async ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
    items,
  } = totals

  const mappedItems = (items || []).map((item) => ({
    ...item,
    cart: {
      total: item.cart?.total || 0,
      id: item.cart?.id || "default-id",
      currency_code: item.cart?.currency_code || currency_code,
      original_item_total: item.cart?.original_item_total || 0,
      item_subtotal: item.cart?.item_subtotal || 0,
      item_tax_total: item.cart?.item_tax_total || 0,
      shipping_total: item.cart?.shipping_total || 0,
      discount_total: item.cart?.discount_total || 0,
      tax_total: item.cart?.tax_total || 0,
      gift_card_total: item.cart?.gift_card_total || 0,
      original_subtotal: item.cart?.original_subtotal || 0,
      original_tax_total: item.cart?.original_tax_total || 0,
      subtotal: item.cart?.subtotal || 0,
      shipping_subtotal: item.cart?.shipping_subtotal || 0,
      discount_tax_total: item.cart?.discount_tax_total || 0,
      item_total: item.cart?.item_total || 0,
      original_total: item.cart?.original_total || 0,
      original_item_subtotal: item.cart?.original_item_subtotal || 0,
      original_item_tax_total: item.cart?.original_item_tax_total || 0,
      gift_card_tax_total: item.cart?.gift_card_tax_total || 0,
      shipping_tax_total: item.cart?.shipping_tax_total || 0,
      // Adăugăm proprietățile lipsă din StoreCart
      original_shipping_total: item.cart?.original_shipping_total || 0,
      original_shipping_subtotal: item.cart?.original_shipping_subtotal || 0,
      original_shipping_tax_total: item.cart?.original_shipping_tax_total || 0,
    },
    unit_price: item.unit_price || 0,
  }))

  const customer =  await getCustomer().catch(() => null);

  console.log("eqwert: ",customer)
  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            Subtotal (excl. livrare)
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {convertToLocale({ amount: totals.subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Reducere</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Livrare</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {convertToLocale({
              amount:
                shipping_total !== 0 ? shipping_total : "Selecteaza o metoda",
              currency_code,
            })}
          </span>
        </div>
        <div className="flex items-center justify-center">
        <span>
  {customer.metadata?.adeziv && "Felicitari! O sa primesti un Adeziv Flawless Gratuit"}
</span>

        
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Card Cadou</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      {/* Folosim mappedItems în ItemsPreviewTemplate */}
      <ItemsPreviewTemplate items={mappedItems} />
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Total</span>
        <div className="flex flex-col align-center">
          <span
            className="txt-xlarge-plus"
            data-testid="cart-total"
            data-value={total || 0}
          >
            {convertToLocale({ amount: total ?? 0, currency_code })}
          </span>
          <span
            data-testid="cart-taxes"
            data-value={tax_total || 0}
            className="text-right"
          >
            (include {convertToLocale({ amount: total * 0.19, currency_code })}{" "}
            <br /> 19% TVA)
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
