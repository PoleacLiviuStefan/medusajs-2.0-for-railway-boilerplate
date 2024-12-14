"use client"; // Aceasta este o Client Component
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function InteractiveList() {
  return (
    <ul className='w-[10rem] mt-[1rem] lg:mt-0'>
      <li className='font-bold'>Navigare</li>
      <li className='mt-[1rem] cursor-pointer text-[14px]'>
        <LocalizedClientLink
          activeClass="active"
          href="/acasa"
        >
          ACASA
        </LocalizedClientLink>
      </li>
      <li className='cursor-pointer text-[14px]'>
        <LocalizedClientLink
          activeClass="active"
          href="/magazin"
        >
          MAGAZIN
        </LocalizedClientLink>
      </li>
      <li className='cursor-pointer text-[14px]'>
        <LocalizedClientLink
          activeClass="active"
          href="/contact"
        >
          CURSURI PROFESIONALE
        </LocalizedClientLink>
      </li>
      <li className='cursor-pointer text-[14px]'>
        <LocalizedClientLink
          activeClass="active"
          href="/contact"
        >
          CONTACT
        </LocalizedClientLink>
      </li>
      <li className='cursor-pointer text-[14px]'>
        <LocalizedClientLink
          activeClass="active"
          href="/suport"
        >
          SUPORT
        </LocalizedClientLink>
      </li>
    </ul>
  );
}
