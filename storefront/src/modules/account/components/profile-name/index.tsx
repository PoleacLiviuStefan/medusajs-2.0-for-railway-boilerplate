"use client"

import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

// Tip personalizat pentru `FormState`
type FormState = {
  success: boolean
  error: string | null
}

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = useState(false)

  // Funcție de actualizare care respectă semnătura `useFormState`
  const updateCustomerName = async (currentState: FormState): Promise<FormState> => {
    try {
      // Obținem datele din formular folosind `FormData`
      const form = document.querySelector('form') as HTMLFormElement
      const formData = new FormData(form)

      const updatedCustomer = {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
      }

      // Simulăm actualizarea clientului (de exemplu, printr-o cerere API)
      // await updateCustomer(updatedCustomer)

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  // Tipizăm corect `useFormState` cu `FormState`
  const [state, formAction] = useFormState<FormState>(updateCustomerName, {
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(!!state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Nume"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? ""}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
        <Input
            label="Nume"
            name="last_name"
            required
            defaultValue={customer.last_name ?? ""}
            data-testid="last-name-input"
          />
          <Input
            label="Prenume"
            name="first_name"
            required
            defaultValue={customer.first_name ?? ""}
            data-testid="first-name-input"
          />
 
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
