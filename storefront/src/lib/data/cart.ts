"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { omit } from "lodash"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { getAuthHeaders, getCartId, removeCartId, setCartId } from "./cookies"
import { getProductsById } from "./products"
import { getRegion } from "./regions"
import { getCustomer } from "@lib/data/customer"
import { listCartShippingMethods } from "./fulfillment"


async function getCustomShippingCost(cart: HttpTypes.StoreCart) {
  if (!cart.shipping_address?.city || !cart.shipping_address?.province) {
    throw new Error("Shipping address is incomplete.");
  }
  console.log("process este: ",process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL)
  const apiUrl = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL==undefined ? "http://localhost:9000" :process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL==undefined}/fanCourier/tariff`;
  console.log("API URL pentru tarif: ", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tariffDetails: {
          "recipient[locality]": cart.shipping_address.city,
          "recipient[county]": cart.shipping_address.province,
        },
      }),
    });

    // Verifică răspunsul API
    const data = await response.json();
    console.log("Răspuns API: ", data);

    if (!response.ok) {
      console.error("API a răspuns cu o eroare: ", data);
      throw new Error("Failed to fetch shipping cost from custom API");
    }

    

    if (!data.tariff || typeof data.tariff.total !== "number") {
      console.error("Răspuns invalid de la API: ", data);
      throw new Error("Răspuns invalid de la API-ul personalizat.");
    }

    return data.tariff.total; // Returnează costul livrării
  } catch (error) {
    console.error("Eroare la apelarea API-ului pentru costul livrării: ", error);
    throw new Error("Eroare la calcularea costului de livrare.");
  }
}


export async function retrieveCart() {
  const cartId = getCartId();

  if (!cartId) {
    return null;
  }

  try {
    const { cart } = await sdk.store.cart.retrieve(
      cartId,
      {},
      { next: { tags: ["cart"] }, ...getAuthHeaders() }
    );


    
    return cart;
  } catch (error) {
    return null;
  }
}

export async function getOrSetCart(countryCode: string) {
  let cart = await retrieveCart();
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id });
    cart = cartResp.cart;
    setCartId(cart.id);
    revalidateTag("cart");
  }

  if (cart && cart.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, getAuthHeaders());
    revalidateTag("cart");
  }

  return cart;
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = getCartId();
  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating");
  }

  try {
    const { cart } = await sdk.store.cart.update(cartId, data, {}, getAuthHeaders());
    revalidateTag("cart");
    return cart;
  } catch (error) {
    medusaError(error);
  }
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  // Obține coșul curent sau creează unul nou
  const cart = await getOrSetCart(countryCode)
  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  // Adaugă produsul în coș
  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      getAuthHeaders()
    )
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)

  // Reobține coșul actualizat după adăugarea produsului
  const customer = await getCustomer().catch(() => null);
  const updatedCart = await retrieveCart()
  // if (updatedCart?.discount_total === 0) {
  //   const customer = await getCustomer().catch(() => null);
  //   if (customer?.metadata?.discount_code) {
  //     const discountCode = customer.metadata.discount_code; // Codul discountului
  //     await applyPromotions([discountCode]); // Aplică automat discountul
  //   }
  // }

  if (!updatedCart) {
    throw new Error("Error retrieving updated cart after adding product")
  }

  

  // Calculează valoarea totală a coșului actualizat
  const totalCartValue = updatedCart?.items?.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  )

  // if ((totalCartValue ?? 0) > 100  && ( customer ? !customer?.metadata.discount_code : true)) { // 1000 RON în subunități
  //   const discountCode = "Lorena12"; // Codul discountului
  //   await applyPromotions([discountCode]); // Aplică automat discountul
  // }
  // else 
  if(customer?.metadata.discount_code)
  {
    const discountCode = 'Lorena50'; // Codul discountului
    await applyPromotions([discountCode]); // Aplică automat discountul
  }
  

  console.log("totalCartValue", totalCartValue)

  // Dacă valoarea totală depășește 1000 RON, aplică reducerea automat
  
 

}


export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = getCartId()
  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, getAuthHeaders())
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = getCartId()
  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, getAuthHeaders())
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
  revalidateTag("cart")
}

export async function enrichLineItems(
  lineItems:
    | HttpTypes.StoreCartLineItem[]
    | HttpTypes.StoreOrderLineItem[]
    | null,
  regionId: string
) {
  if (!lineItems) return []

  // Prepare query parameters
  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.product_id!),
    regionId: regionId,
  }

  // Fetch products by their IDs
  const products = await getProductsById(queryParams)
  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return []
  }

  // Enrich line items with product and variant information
  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p: any) => p.id === item.product_id)
    const variant = product?.variants?.find(
      (v: any) => v.id === item.variant_id
    )

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    }
  }) as HttpTypes.StoreCartLineItem[]

  return enrichedItems
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  return sdk.store.cart
    .addShippingMethod(
      cartId,
      { option_id: shippingMethodId },
      {},
      getAuthHeaders()
    )
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export const getAwb = async ({cart} : {cart :HttpTypes.StoreCart}) => {
  const awbDetails = {
    shipments: [
      {
        info: {
          service: "Standard",
          packages: {
            parcel: 1,
            envelopes: 0,
          },
          weight: 2, // Greutatea pachetului
          payment: "recipient", // Plata la livrare
          returnPayment: null, // Modalitatea de plată la retur
          observation: "Observatie", // Observații
          content: `Comanda ${cart.id}`, // Conținutul: ID-ul comenzii
          dimensions: {
            length: 10,
            height: 20,
            width: 30,
          },
          costCenter: "DEP LOGISTICS",
          options: ["X"],
        },
        recipient: {
          name: `${cart.shipping_address.first_name} ${cart.shipping_address.last_name}`,
          phone: cart.shipping_address.phone,
          email:  "test@gmail.com", // Email fallback //de modifica
          address: {
            county: cart.shipping_address.province, // Județul
            locality: cart.shipping_address.city, // Localitate
            street: cart.shipping_address.address_1, // Stradă
            streetNo: cart.shipping_address.address_2 ?? "", // Număr stradă
            zipCode: cart.shipping_address.postal_code, // Cod poștal
          },
        },
      },
    ],
  }

  console.log("awb details sunt: ", awbDetails.shipments);
  console.log("awb details address sunt: ", awbDetails.shipments[0].recipient.address);
  try {
    const awbResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/fanCourier/awb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(awbDetails),
    })

    const awbData = await awbResponse.json()

    if (!awbResponse.ok) {
      throw new Error(awbData.message || "Generare AWB eșuată.")
    }

    console.log("AWB generat cu succes:", awbData)

    // Finalizează comanda (dacă este necesar)
    // await placeOrder()
  } catch (err: any) {
    console.error("Eroare la generarea AWB:", err)
   
  }
}
export async function setCustomShippingMethod({ cartId }: { cartId: string }) {
  try {
    // Obține coșul actual
    const cart = await retrieveCart();
    console.log("Cart primit în setCustomShippingMethod: ", cart);

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (!cart.shipping_address) {
      throw new Error("Shipping address is missing in the cart.");
    }

    // Obține metodele de livrare disponibile
    const shippingMethods = await listCartShippingMethods(cart.id);

    if (!shippingMethods || shippingMethods.length === 0) {
      throw new Error("No available shipping methods for this cart.");
    }

    const selectedShippingMethod = shippingMethods.find(
      (method) => method.id === "so_01JA8YYS3AQCT2MZGVATADWS85"
    );
    console.log("Metoda găsită: ", selectedShippingMethod);

    if (!selectedShippingMethod) {
      throw new Error("Selected shipping method not found.");
    }

    // Calculează costul livrării personalizate
    const customShippingCost = await getCustomShippingCost(cart);
    console.log("Costul calculat pentru livrare: ", customShippingCost);

    // Actualizează metoda de livrare selectată cu cost personalizat
    const response = await sdk.store.cart.addShippingMethod(
      cartId,
      {
        option_id: selectedShippingMethod.id, // ID-ul metodei selectate
        data: {
          custom_cost: customShippingCost, // Cost personalizat
        },
      },
      {},
      getAuthHeaders()
    );

    console.log("Metoda de livrare adăugată cu succes: ", response.cart);

    // Revalidează coșul
    revalidateTag("cart");

    return response.cart;
  } catch (error) {
    console.error("Error setting custom shipping method:", error);
    throw new Error("Eroare la setarea metodei de livrare personalizate.");
  }
}



export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: {
    provider_id: string
    context?: Record<string, unknown>
  }
) {
  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, getAuthHeaders())
    .then((resp) => {
      revalidateTag("cart")
      return resp
    })
    .catch(medusaError)
}

export async function applyPromotions(codes: string[]) {
  const cartId = getCartId()
  console.log("in promotie")
  if (!cartId) {
    throw new Error("No existing cart found")
  }

  await sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, getAuthHeaders()) // Se aplică codul promoțional la coș
    .then(() => {
      revalidateTag("cart")
    })
    .catch(medusaError)
}

export async function applyGiftCard(code: string) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount(code: string) {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard(
  codeToRemove: string,
  giftCards: any[]
  // giftCards: GiftCard[]
) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(
  currentState: unknown,
  formData: FormData
) {
  const code = formData.get("code") as string
  try {
    await applyPromotions([code])
  } catch (e: any) {
    return e.message
  }
}

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(currentState: unknown, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses")
    }
    const cartId = getCartId()
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses")
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      email: formData.get("email"),
    } as any

    const sameAsBilling = formData.get("same_as_billing")
    if (sameAsBilling === "on") data.billing_address = data.shipping_address

    if (sameAsBilling !== "on")
      data.billing_address = {
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        company: formData.get("billing_address.company"),
        postal_code: formData.get("billing_address.postal_code"),
        city: formData.get("billing_address.city"),
        country_code: formData.get("billing_address.country_code"),
        province: formData.get("billing_address.province"),
        phone: formData.get("billing_address.phone"),
      }
    await updateCart(data)
  } catch (e: any) {
    return e.message
  }

  redirect(
    `/${formData.get("shipping_address.country_code")}/checkout?step=delivery`
  )
}

export async function placeOrder() {
  const cartId = getCartId()
  if (!cartId) {
    throw new Error("No existing cart found when placing an order")
  }

  const cartRes = await sdk.store.cart
    .complete(cartId, {}, getAuthHeaders())
    .then((cartRes) => {
      revalidateTag("cart")
      return cartRes
    })
    .catch(medusaError)

  if (cartRes?.type === "order") {
    const countryCode =
      cartRes.order.shipping_address?.country_code?.toLowerCase()
    removeCartId()
    redirect(`/${countryCode}/comenzi/confirmate/${cartRes?.order.id}`)
  }

  return cartRes.cart
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = getCartId()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (cartId) {
    await updateCart({ region_id: region.id })
    revalidateTag("cart")
  }

  revalidateTag("regions")
  revalidateTag("products")

  redirect(`/${countryCode}${currentPath}`)
}
