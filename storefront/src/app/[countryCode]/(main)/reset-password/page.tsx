"use client" // include with Next.js 13+

import { useState } from "react"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }
    setLoading(true)

    fetch(`http://localhost:9000/auth/customer/emailpass/reset-password`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
      }),
    })
    .then(() => {
      alert("If an account exists with the specified email, it'll receive instructions to reset the password.")
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input 
        placeholder="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Request Password Reset
      </button>
    </form>
  )
}