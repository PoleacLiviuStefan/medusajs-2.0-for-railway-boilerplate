'use client'
import React, { useRef, useEffect } from 'react';
import Benefit from './Benefit';
import CosmeticIcon from "../../../../public/Imagini/icons/cosmetics-icon.svg"
import LashIcon from "../../../../public/Imagini/icons/eyelash.svg"
import LashMedical from "../../../../public/Imagini/icons/eyelashes-medical-svgrepo-com.svg"
import Mirror from "../../../../public/Imagini/icons/mirror.svg"
import Tweezers from "../../../../public/Imagini/icons/tweezers.svg"
import Adhesive from "../../../../public/Imagini/icons/gene-adeziv.svg"
const BenefitList = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const autoScroll = () => {
      if (sliderRef.current) {
        // Verifică dacă slider-ul a ajuns la capăt și revine la început
        if (sliderRef.current.scrollLeft + sliderRef.current.clientWidth >= sliderRef.current.scrollWidth) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Derulează câte un singur element Benefit (150px)
          sliderRef.current.scrollBy({ left: 166 , behavior: 'smooth' }); // 150px (lățimea unui element) + 8px (spațiul dintre elemente)
        }
      }
    };

    const interval = setInterval(autoScroll, 3000); // Derulează la fiecare 3 secunde
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full h-[300px] flex flex-col items-center justify-center overflow-hidden  z-10'>
      <div
        ref={sliderRef}
        className='flex justify-center items-center overflow-x-scroll no-scrollbar w-full gap-[32px] whitespace-nowrap max-w-[980px] h-full' // Folosim gap-2 pentru un spațiu mic între elemente

      >
       

          <div
            className='flex-shrink-0 w-[80px] lg:w-[150px]' // Asigură-te că elementul nu se micșorează
     
          >
            <Benefit iconSrc={LashIcon} name="Extensii Gene" path="extensii-gene"  />
          </div>
          <div
            className='flex-shrink-0 w-[80px] lg:w-[150px]' // Asigură-te că elementul nu se micșorează
      
          >
            <Benefit iconSrc={Adhesive} name="Adezivi" path="adezivi" />
          </div>
          <div
            className='flex-shrink-0 w-[80px] lg:w-[150px]' // Asigură-te că elementul nu se micșorează

          >
            <Benefit iconSrc={Mirror} name="Accesorii" path="accesorii" />
          </div>
          <div
            className='flex-shrink-0 w-[80px] lg:w-[150px]'  // Asigură-te că elementul nu se micșorează
          >
            <Benefit iconSrc={Tweezers} name="Pensete" path="pensete" />
          </div>
          <div
            className='flex-shrink-0 w-[80px] lg:w-[150px]' // Asigură-te că elementul nu se micșorează
          >
            <Benefit iconSrc={CosmeticIcon} name="Consumabile" path="consumabile" />
          </div>
     
  
     
      </div>
    </div>
  );
};

export default BenefitList;
