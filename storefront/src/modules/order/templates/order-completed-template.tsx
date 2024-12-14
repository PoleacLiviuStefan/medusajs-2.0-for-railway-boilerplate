import { Heading } from "@medusajs/ui"
import { cookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

// Funcția care mapează StoreOrderLineItem[] în StoreCartLineItem[]
const mapOrderItemsToCartItems = (
  orderItems: HttpTypes.StoreOrderLineItem[],
  currencyCode: string
): HttpTypes.StoreCartLineItem[] => {
  return orderItems.map(item => ({
    ...item,
    cart: {
      id: "order-cart-id", // Valoare fictivă, deoarece comanda nu are un cart real
      total: item.total,
      currency_code: currencyCode, // Folosim `currency_code` din comandă
      original_item_total: item.total,
      original_item_subtotal: item.subtotal,
      original_item_tax_total: item.tax_total,
      item_total: item.total,
      item_subtotal: item.subtotal,
      subtotal: item.subtotal,
      discount_total: item.discount_total ?? 0,
      tax_total: item.tax_total ?? 0,
      item_tax_total: item.tax_total ?? 0,
      item_refundable: 0, // Sau altă valoare potrivită
      original_total: item.total,
      original_subtotal: item.subtotal,
      original_tax_total: item.tax_total ?? 0,
      discount_tax_total: item.discount_total ?? 0,
      gift_card_tax_total: 0, // Sau altă valoare potrivită
      gift_card_total: 0, // Sau altă valoare potrivită
      shipping_tax_total: 0, // Sau altă valoare potrivită
      // Adăugăm câmpurile lipsă
      shipping_total: 0, // Sau altă valoare potrivită
      shipping_subtotal: 0, // Sau altă valoare potrivită
      original_shipping_total: 0, // Sau altă valoare potrivită
      original_shipping_subtotal: 0, // Sau altă valoare potrivită
      original_shipping_tax_total: 0, // Sau altă valoare potrivită
    },
    cart_id: "order-cart-id", // Valoare fictivă pentru `cart_id`
    tax_lines: [], // Setăm la un array gol pentru a evita eroarea de tip
    adjustments: [], // Setăm la un array gol pentru a evita eroarea de tip
  }));
}



export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Multumim!</span>
            <span>Comanda ta a fost plasata cu succes.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading level="h2" className="flex flex-row text-3xl-regular">
            Sumar
          </Heading>
          <Items items={order.items ?? []} />
          <CartTotals
  totals={{
    total: order?.total ?? 0,
    subtotal: order?.subtotal ?? 0,
    tax_total: order?.tax_total ?? 0,
    shipping_total: order?.shipping_total ?? 0, // Valoare pentru întreaga comandă, nu la nivel de item
    discount_total: order?.discount_total ?? 0,
    gift_card_total: order?.gift_card_total ?? 0,
    currency_code: order?.currency_code ?? "RON",
    items: mapOrderItemsToCartItems(order?.items ?? [], order?.currency_code ?? "RON"), // Aici trecem `currency_code` din comandă
  }}
/>



          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
