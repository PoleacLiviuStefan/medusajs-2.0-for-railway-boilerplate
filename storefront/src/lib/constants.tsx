import React from "react"
import { CreditCard } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <Ideal />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_")
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]

export const FAQ=[
  {
    question:"Cât timp durează livrarea produselor?",
    answer:"Livrarea produselor durează între 1-3 zile lucrătoare, în funcție de locația dvs. Pentru comenzi plasate în timpul sărbătorilor sau perioadelor aglomerate, durata livrării poate crește ușor"
  },
{
    question:"Care sunt metodele de plată acceptate?",
    answer:"Acceptăm plăți prin card bancar (Visa, Mastercard, Maestro), PayPal, și plata ramburs la livrare. Toate tranzacțiile sunt securizate și procesate de Stripe."

  },
  {
    question:"Pot returna produsele dacă nu sunt mulțumit(ă)?",
    answer:"Da, puteți returna produsele în termen de 14 zile calendaristice de la primirea comenzii. Produsele trebuie să fie sigilate, neutilizate și în ambalajul original. Pentru a iniția un retur, vă rugăm să ne contactați prin e-mail sau telefon pentru a primi instrucțiuni suplimentare."

  },  
  {
    question:"Cum pot verifica statusul comenzii mele?",
    answer:'Pentru a verifica statusul comenzii, accesați secțiunea "Contul meu" din site și selectați "Istoricul comenzilor".'
  },
  {
    question:"Ce fac dacă primesc un produs defect sau greșit?",
    answer:"Ne cerem scuze pentru eventualele inconveniente. Dacă primiți un produs defect sau greșit, vă rugăm să ne contactați în termen de 48 de ore de la primirea coletului. Vom înlocui produsul sau vă vom oferi un ramburs, conform preferințelor dvs."

  },
]