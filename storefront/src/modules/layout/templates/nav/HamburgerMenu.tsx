'use client'

import React, { useState } from "react"
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchForm from "./searchForm"
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchModalMobile from "./SearchModalMobile"
import logo from '../../../../../public/Imagini/logo.png'
import Image from "next/image"
// Definim tipul pentru SideMenuItems
type SideMenuItemsType = {
  [key: string]: string
}

type CollectionType = {
  id: string
  title: string
  handle: string
}

export default function HamburgerMenu({
  SideMenuItems,
  collections,
}: {
  SideMenuItems: SideMenuItemsType
  collections: CollectionType[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false) // Stare pentru dropdown-ul colecțiilor
  const [cursuriDropdownOpen, setCursuriDropdownOpen] = useState(false) // Stare pentru dropdown-ul cursurilor
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

  return (
    <>
         {
        showSearchModal && 
      <SearchModalMobile setShowSearchModal={(value)=>setShowSearchModal(value)} />
}
      {/* Buton hamburger pentru mobil */}
      <button
        className="text-2xl z-50 " // Setăm z-index mare și poziționăm butonul astfel încât să fie deasupra overlay-ului
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <button onClick={()=>setShowSearchModal((prev)=>!prev)} className={` z-50 ${!showSearchModal ? "text-[18px]" : "text-[24px]"}`}>
      {!showSearchModal ? <FaMagnifyingGlass /> :  <FiX />}
      </button>
      {/* Overlay negru cu opacitate */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />  
      )}

      {/* Meniu lateral pentru mobil */}
      <div
        className={` fixed top-0 left-0 h-full w-[320px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-full flex items-center justify-center p-8">
          <Image src={logo} alt="logo" className="h-[120px] w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-4  text-[16px] border-[1px] border-gray-400 p-[4px]"
          >
            <FiX />
          </button>
        </div>
        {/*<SearchForm mobile={true}/>*/}
        <ul className="p-4 mt-[20px]">

          {Object.entries(SideMenuItems).map(([name, href]) => (
            <li key={name} className="relative py-2 text-black">
              {/* Verificăm dacă este "Magazin" sau "Cursuri Profesionale" pentru a afișa dropdown-ul */}
              {name === "MAGAZIN" || name === "CURSURI PROFESIONALE" ? (
                <div className="flex justify-between items-center">
                  {/* Link către pagina "Magazin" sau "Cursuri Profesionale" */}
                  <LocalizedClientLink
                    href={href}
                    className="text-[16px] leading-10 hover:text-ui-fg-base whitespace-nowrap"
                    onClick={() => setMenuOpen(false)} // Închide meniul după click
                  >
                    {name}
                  </LocalizedClientLink>
                  {/* Buton pentru deschiderea dropdown-ului */}
                  <button
                    onClick={() =>
                      name === "MAGAZIN"
                        ? setDropdownOpen(!dropdownOpen)
                        : setCursuriDropdownOpen(!cursuriDropdownOpen)
                    }
                    className="flex justify-end ml-2  w-full h-full text-[20px]"
                  >
                    {name === "MAGAZIN" ? (
                      dropdownOpen ? <FiChevronUp /> : <FiChevronDown />
                    ) : cursuriDropdownOpen ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                </div>
              ) : (
                <LocalizedClientLink
                  href={href}
                  className="text-[16px] leading-10 hover:text-ui-fg-base"
                  onClick={() => setMenuOpen(false)} // Închide meniul după click
                >
                  {name}
                </LocalizedClientLink>
              )}

              {/* Dropdown pentru colecții din "Magazin" */}
              {name === "MAGAZIN" && dropdownOpen && (
                <ul className="pl-4">
                  <li className="py-2">
                    <LocalizedClientLink
                      href={`/magazin`}
                      className="text-[14px] hover:text-ui-fg-base"
                      onClick={() => setMenuOpen(false)} // Închide meniul după click
                    >
                      TOATE PRODUSELE
                    </LocalizedClientLink>
                  </li>
                  {collections.map((collection) => (
                    <li key={collection.id} className="py-2">
                      <LocalizedClientLink
                        href={`/colectii/${collection.handle}`}
                        className="text-[14px] hover:text-ui-fg-base uppercase"
                        onClick={() => setMenuOpen(false)} // Închide meniul după click
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              )}

              {/* Dropdown pentru "Cursuri Profesionale" */}
              {name === "CURSURI PROFESIONALE" && cursuriDropdownOpen && (
                <ul className="pl-4">
                  <li className="py-2">
                    <LocalizedClientLink
                      href={`/cursuri/curs-de-baza`}
                      className="text-[14px] hover:text-ui-fg-base"
                      onClick={() => setMenuOpen(false)} // Închide meniul după click
                    >
                      CURS DE BAZA 1D-3D & FOXY
                    </LocalizedClientLink>
                  </li>
                  
                  <li className="py-2">
                    <LocalizedClientLink
                      href={`/cursuri/curs-de-baza-premium`}
                      className="text-[14px] hover:text-ui-fg-base"
                      onClick={() => setMenuOpen(false)} // Închide meniul după click
                    >
                      CURS DE BAZA PREMIUM (BAZA&EFECTE)
                    </LocalizedClientLink>
                  </li>
                  <li className="py-2">
                    <LocalizedClientLink
                      href={`/cursuri/curs-de-efecte-speciale`}
                      className="text-[14px] hover:text-ui-fg-base"
                      onClick={() => setMenuOpen(false)} // Închide meniul după click
                    >
                      CURS DE EFECTE SPECIALE
                    </LocalizedClientLink>
                  </li>
                  <li className="py-2">
                    <LocalizedClientLink
                      href={`/cursuri/curs-vip`}
                      className="text-[14px] hover:text-ui-fg-base"
                      onClick={() => setMenuOpen(false)} // Închide meniul după click
                    >
                      CURS VIP
                    </LocalizedClientLink>
                  </li>
                </ul>
              )}
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-200 " />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
