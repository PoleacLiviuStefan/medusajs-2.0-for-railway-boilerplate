"use client" // this marks it as a client component

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchForm({
  mobile = false,
  setShowSearchModal = () => {},
}: {
  mobile?: boolean
  setShowSearchModal?: (value: boolean) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mobile && setShowSearchModal?.(false) // Actualizat pentru a evita eroarea
    if (searchQuery.trim()) {
      router.push(`/rezultate/${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`${
        !mobile && "hidden"
      } lg:inline relative flex-1 w-full  lg:w-[450px] lg:mx-auto px-[8px] lg:px-0`}
    >
      <input
        type="text"
        name="query"
        className="border border-gray-300 text-[24px] lg:text-[15px] h-[80px] lg:h-[40px] rounded-md p-3 w-full"
        placeholder="Caută produse..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
      />
      <button
        type="submit"
        className="absolute text-md right-5 lg:right-2 top-6 lg:top-3 text-gray-500 text-[32px] lg:text-[15px] hover:text-gray-700"
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  )
}
