"use client"

import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

// Tip personalizat pentru `state`
type FormState = {
  success: boolean
  error: string | null
}

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const updateCustomerEmail = async (currentState: FormState): Promise<FormState> => {
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);
    const updatedCustomer = {
      email: formData.get("email") as string,
    }

    try {
      // Simulăm actualizarea clientului (de exemplu, printr-o cerere API)
      // await updateCustomer(updatedCustomer)

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  // Tipizăm corect `useFormState` cu tipul `FormState`
  const [state, formAction] = useFormState<FormState>(updateCustomerEmail, {
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(!!state.success) // Ne asigurăm că valoarea este booleană
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Email"
        currentInfo={`${customer.email}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? ""}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={customer.email}
            data-testid="email-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail
