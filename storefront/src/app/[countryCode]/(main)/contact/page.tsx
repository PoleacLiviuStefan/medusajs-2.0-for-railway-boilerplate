import React from "react";
import { BsInstagram, BsFillPinMapFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import ContactForm from "./contactForm";
import InstagramWidget from "app/(components)/instagramWidget/InstagramWidget";

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-pink-200 w-full h-[250px] lg:h-[300px]">
        <div className="flex flex-col items-center w-full px-4 lg:mt-0 gap-[16px]">
          <h1 className="text-[36px] lg:text-[48px] w-full font-extrabold text-center leading-5 lg:leading-7">
            CONTACT
          </h1>
          <p className="text-center text-[13px] lg:text-[16px] w-full text-gray-700 px-4 leading-4 lg:leading-5 mt-[8px]">
            Ne poti gasi si contacta prin metodele de mai jos.
            <br /> Pentru intrebari legate de comenzi ne poti contacta pe
            pagina de{" "}
            <LocalizedClientLink href="/suport" className="font-bold">
              suport
            </LocalizedClientLink>
          </p>
        </div>
      </div>
      <InstagramWidget />
      <div className="flex mt-[2rem]">
 
        <a
          href="http://wa.me/+40764038271"
          className="text-[24px] lg:text-[32px] font-bold flex mx-2 mt-[.5rem]"
        >
          <span className="text-[28px] lg:text-[36px] mt-1 lg:mt-2 mr-1">
            <AiOutlineWhatsApp />
          </span>
          0764038271
        </a>

        <a
          href="mailto:lorenalashstudio@gmail.com"
          className="flex justify-center items-center w-[50px] lg:w-[60px] h-[50px] lg:h-[60px] rounded-[50%] text-[24px] lg:text-[32px] mx-2 cursor-pointer bg-black text-white"
        >
          <AiOutlineMail />
        </a>
      </div>
      <LocalizedClientLink
        href="/suport"
        className="flex mt-[32px] font-bold lg:text-[20px] gap-[8px]"
      >
        SPRE PAGINA DE SUPORT{" "}
        <FaArrowAltCircleRight className="text-[24px]" />
      </LocalizedClientLink>
      <ContactForm />
      <div className="flex flex-col items-center mt-[3rem]">
        <h2 className="text-[24px] lg:text-[38px] font-extrabold">LOCATIE</h2>
        <div className="flex items-center">
          <div className="flex mt-[1rem] justify-center items-center w-[60px] h-[60px] rounded-[50%] text-[28px] bg-white text-[#0b2a24] mb-[1rem]">
            <BsFillPinMapFill />
          </div>
          <h3 className="text-[16px] w-[12rem] ml-2">
            Bucuresti , Sectorul 4 , strada Povestei , nr. 10
          </h3>
        </div>
        <div className="w-full lg:w-[40rem] h-[25rem] mt-[1rem]">
          <iframe
            title="Indicatii de orientare catre salon"
            width="100%"
            height="100%"
            src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=%F0%9D%90%92%F0%9D%90%AD%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%9D%F0%9D%90%9A%20%F0%9D%90%8F%F0%9D%90%A8%F0%9D%90%AF%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%A2%20%F0%9D%9F%8F%F0%9D%9F%8E+(Title)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
            frameBorder="0"
            scrolling="no"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Page;
