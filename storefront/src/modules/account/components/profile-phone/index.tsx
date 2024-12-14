"use client"

import React, { useEffect } from "react"
import { useFormState } from "react-dom"
import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

// Tip personalizat pentru `FormState`
type FormState = {
  success: boolean
  error: string | null
}

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // Funcție de actualizare pentru telefon
  const updateCustomerPhone = async (currentState: FormState): Promise<FormState> => {
    const form = document.querySelector('form') as HTMLFormElement
    const formData = new FormData(form)

    const updatedCustomer = {
      phone: formData.get("phone") as string,
    }

    try {
      await updateCustomer(updatedCustomer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  // Tipizăm corect `useFormState` cu tipul `FormState`
  const [state, formAction] = useFormState<FormState>(updateCustomerPhone, {
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    // Ne asigurăm că `state.success` este boolean
    setSuccessState(!!state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Numar de Telefon"
        currentInfo={`${customer.phone ?? ""}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? ""}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Numar de Telefon"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone ?? ""}
            data-testid="phone-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
