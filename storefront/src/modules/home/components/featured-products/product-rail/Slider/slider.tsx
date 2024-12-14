'use client';
import React, { useRef, useEffect } from 'react';
import { HttpTypes } from '@medusajs/types';
import ProductPreview from '@modules/products/components/product-preview';

type SliderProps = {
  products: HttpTypes.StoreProduct[];
  region: HttpTypes.StoreRegion;
};

const Slider: React.FC<SliderProps> = ({ products, region }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        scrollAmount = 0; // Reset scroll-ul la început
      } else {
        scrollAmount += slider.offsetWidth / 3; // Mută scroll-ul cu un sfert din lățimea vizibilă
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }, 3000);

    return () => clearInterval(interval); // Curățăm intervalul la demontarea componentei
  }, []);

  return (
    <div
      ref={sliderRef}
      className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="inline-block w-[150px] sm:w-[200px] md:w-[270px] flex-shrink-0"
        >
          {/* @ts-ignore */}
          <ProductPreview product={product} region={region} isFeatured />
        </div>
      ))}
    </div>
  );
};

export default Slider;
