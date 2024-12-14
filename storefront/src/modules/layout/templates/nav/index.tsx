import { Suspense, useState } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { getCollectionsList } from "@lib/data/collections"
import { RxAvatar } from "react-icons/rx"
import HamburgerMenu from "./HamburgerMenu"
import MovingText from "./MovingText"
import SearchForm from "./searchForm" // Import the client-side search form component
import { FaMagnifyingGlass } from "react-icons/fa6";
import logo from '../../../../../public/Imagini/logo.png'
import Image from "next/image"


export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const { collections } = await getCollectionsList()

  const SideMenuItems = {
    ACASA: "/acasa",
    MAGAZIN: "/",
    "CURSURI PROFESIONALE": "/cursuri",
    //"DESPRE NOI": "/despre-noi",
    CONTACT: "/contact",
    SUPORT: "/suport"
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 font-sans">
      
      <div className="flex flex-col justify-center relative h-[50px] lg:h-[90px] mx-auto border-b duration-200 py-8 bg-white border-ui-border-base">
        <nav className="flex justify-center lg:justify-between content-container txt-xsmall-plus text-ui-fg-subtle items-center w-full mt-[8px] gap-[32px] px-4  lg:w-[900px] lg:px-0">
          {/* Adăugăm componenta HamburgerMenu pentru partea interactivă */}
          <div className=" flex absolute  left-6 items-center gap-x-6 w-[100px] whitespace-nowrap inline lg:hidden">
          
          <HamburgerMenu SideMenuItems={SideMenuItems} collections={collections} />
           {/*baga in hamburgerMenu*/}
          </div>
          {/* Logo-ul site-ului */}
          <div className="text-center">
            <LocalizedClientLink
              href="/acasa"
              className="txt-compact-xlarge-plus hover:text-gray-500 uppercase text-center "
              data-testid="nav-store-link"
            >
              <Image alt="logo" src={logo} className="h-[50px] lg:h-[60px] w-auto lg:mt-[16px]" />
            </LocalizedClientLink>
          </div>

          {/* Render the search form */}
          <SearchForm /> 

          {/* Elemente de navigare pentru cont și coș */}
          <div className="flex absolute lg:relative right-0 items-center gap-x-6 w-[100px] whitespace-nowrap inline">
            <LocalizedClientLink
              className="flex flex-row items-center gap-1 text-sm hover:text-gray-500"
              href="/cont"
              data-testid="nav-account-link"
            >
              <span className="text-[24px]">
                <RxAvatar />
              </span>
              <span className="hidden lg:block">CONTUL MEU</span> {/* Ascunde textul pe mobil */}
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-gray-500 gap-1 hidden lg:block"
                  href="/cos"
                  data-testid="nav-cart-link"
                >
                  <span className="hidden lg:block "><CartButton /></span>
                </LocalizedClientLink>
              }
            >
              <div className="flex text-md items-center gap-1 mt-1">
                <CartButton />
                {/* Ascunde textul pe mobil */}
              </div>
            </Suspense>
          </div>
        </nav>

        {/* Elemente de navigare pentru desktop */}
        <ul className="hidden lg:flex gap-[16px] items-center justify-center gap-[48px] -mt-[20px]  ">
          {/* Renderizare dinamică pentru meniul lateral */}
          {Object.entries(SideMenuItems).map(([name, href]) => {
            // Dropdown pentru Produse
            if (name === "MAGAZIN") {
              return (
                <li key={name} className="relative group">
                  {/* Numai "Magazin" va activa dropdown-ul */}
                  <LocalizedClientLink
                        href={`/magazin`}
                       className="text-sm leading-10 hover:text-gray-500 cursor-pointer"
                      >
                 
                    {name}
                
                  </LocalizedClientLink>
                  {/* Dropdown pentru colecții */}
                  <ul className="absolute hidden text-sm group-hover:block bg-white border w-[200px] py-4 mt-[-8px] shadow-lg z-999">
                      <LocalizedClientLink
                        href={`/magazin`}
                        className="text-sm text-gray-700 w-full"
                      >
                    <li className="py-2 hover:bg-gray-100 w-full px-2">
                        TOATE PRODUSELE
                    </li>
                      </LocalizedClientLink>
                      {collections?.map((collection) => (
  <LocalizedClientLink
    key={collection.id} // Cheia trebuie adăugată aici
    href={`/colectii/${collection.handle}`}
    className="text-sm text-gray-700 w-full"
  >
    <li className="py-2 hover:bg-gray-100 w-full px-2">
      {collection.title.toUpperCase()}
    </li>
  </LocalizedClientLink>
))}

                  </ul>
                </li>
              )
            }

            // Dropdown pentru Cursuri Profesionale
            if (name === "CURSURI PROFESIONALE") {
              return (
                <li key={name} className="relative group">
                  <LocalizedClientLink
                    href={href}
                    className="text-md leading-10 hover:text-gray-500 cursor-pointer"
                  >
                    {name}
                  </LocalizedClientLink>
                  <ul className="absolute left-0 text-sm  opacity-0 mt-[-8px] invisible transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:delay-0 delay-300 bg-white border w-[200px] py-4 shadow-lg z-50">


                  <LocalizedClientLink
                        href={`/cursuri/curs-de-baza`}
                        className="text-sm text-gray-700 w-full "
                      >
                    <li className="py-2  hover:text-gray-500 w-full px-2">
                   
                        CURS DE BAZA 1D-3D & FOXY
                   
                    </li>
                    </LocalizedClientLink>
                    <LocalizedClientLink
                        href={`/cursuri/curs-de-baza-premium`}
                        className="text-sm text-gray-700 w-full "
                      >
                    <li className="py-2  hover:text-gray-500 w-full px-2">
                   
                        CURS DE BAZA PREMIUM (BAZA&EFECTE)
                   
                    </li>
                    </LocalizedClientLink>
                      <LocalizedClientLink
                        href={`/cursuri/curs-de-efecte-speciale`}
                        className="text-sm text-gray-700 w-full"
                      >
                         <li className="py-2  hover:text-gray-500 w-full px-2">
                        CURS DE EFECTE SPECIALE
                    </li>
                      </LocalizedClientLink>
                      <LocalizedClientLink
                        href={`/cursuri/curs-vip`}
                        className="text-sm text-gray-700 w-full"
                      >
                          <li className="py-2  hover:text-gray-500 w-full px-2">
                        CURS VIP
                    </li>
                      </LocalizedClientLink>
                  </ul>
                </li>
              )
            }

            // Pentru restul elementelor din meniu
            return (
              <li key={name}>
                <LocalizedClientLink
                  href={href}
                  className="text-md leading-10 hover:text-gray-500"
                  data-testid={`${name.toLowerCase()}-link`}
                >
                  {name}
                </LocalizedClientLink>
              </li>
            )
          })}
        </ul>
      </div>
      {/*<MovingText />*/}
    </header>
  )
}
