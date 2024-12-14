import { Metadata } from "next"
import React from "react"
import CursDeBaza from "../../../../../public/Imagini/cursuri/curs_de_baza.jpg"
import CursDeBazaPremium from "../../../../../public/Imagini/cursuri/curs_de_baza_premium.jpg"
import CursDeEfecteSpeciale from "../../../../../public/Imagini/cursuri/curs_de_efecte_speciale.jpg"
import CursVip from "../../../../../public/Imagini/cursuri/cursVip.jpeg"
import Image from "next/image"
import BenefitsList from "../../../(components)/Main/BenefitsList"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Echipa  from '../../../../../public/Imagini/stiliste/echipa.png'
import InstagramWidget from "app/(components)/instagramWidget/InstagramWidget"
export const metadata: Metadata = {
  title: "Cursuri - Medusa Next.js",
  description: "Pagina pentru cursuri, folosind Medusa și Next.js 14.",
}

export default async function Page() {
  const collections = await getCollectionsWithProducts("ro")
  const region = await getRegion("ro")

  if (!collections || !region) {
    return null
  }

  return (
    <>
    <Hero image={Echipa} />
    <div className="flex flex-col items-center w-full px-[16px] lg:px-0 font-montSerrat">
      
      <div className="grid grid-cols-2 gap-6 justify-items-center py-4">
      <LocalizedClientLink href="/cursuri/curs-de-baza" className="relative flex flex-col items-center">
          <Image
            src={CursDeBaza}
          
            alt="Curs de bază"
 className="w-[300px] h-auto"
          />
          <div className="flex items-center justify-center absolute bottom-0  bg-black text-white  h-[50px] z-10 w-full ">
            <h2 className="text-[16px] lg:text-[24px] font-extrabold text-center ">Curs De Baza</h2>
            </div>
          </LocalizedClientLink>
          <LocalizedClientLink href="/cursuri/curs-de-baza-premium" className="relative"  >
          <Image
         
            src={CursDeBazaPremium}
          
            alt="Curs de bază premium"
          className="relative w-[300px] h-auto"
          />
             <div className="flex items-center justify-center absolute bottom-0  bg-black text-white  h-[50px] z-10 w-full ">
            <h2 className="text-[16px] lg:text-[24px] font-extrabold text-center">Curs De Baza Premium</h2>
            </div>
          </LocalizedClientLink>
          <LocalizedClientLink href="/cursuri/curs-de-efecte-speciale" className="relative" >
          <Image
         
            src={CursDeEfecteSpeciale}
          
            alt="Curs de efecte speciale"
 className="w-[300px] h-auto"
          />
              <div className="flex items-center justify-center absolute bottom-0  bg-black text-white  h-[50px] z-10 w-full ">
              <h2 className="text-[16px] lg:text-[24px] font-extrabold text-center">Curs De Efecte Speciale</h2>
              </div>
          </LocalizedClientLink>
          <LocalizedClientLink href="/cursuri/curs-VIP" className="relative"  >
          <Image
         
            src={CursVip}
          
            alt="Curs VIP"
        
            className="w-[300px] h-auto"
          />
             <div className="flex items-center justify-center absolute bottom-0  bg-black text-white  h-[50px] z-10 w-full ">
          <h2 className="text-[16px] lg:text-[24px] font-extrabold text-center">Curs VIP</h2>
          </div>
          </LocalizedClientLink>
        
      </div>
      <BenefitsList />
      <ul className="flex flex-row gap-x-6 w-full  lg:w-[900px] ">
  <FeaturedProducts collections={collections} region={region} main={true}/>
</ul>
<InstagramWidget />

    </div>
    </>
  )
}
