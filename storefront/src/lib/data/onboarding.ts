"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  cookies().set("_medusa_onboarding", "", { maxAge: -1 }) // Cookie eliminat
  redirect(`http://localhost:7001/a/orders/${orderId}`)
}

