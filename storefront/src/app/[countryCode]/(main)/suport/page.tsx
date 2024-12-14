'use client';

import { useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FAQ } from "@lib/constants";
import FAQItem from "./FAQItem";
import ReturnForm from "app/(components)/ReturnForm/ReturnForm";

const Suport: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setShowQuestion((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen w-full h-full px-[16px] lg:px-0">
      <div className="flex flex-col items-center w-full lg:w-[700px] gap-[32px]">
        <ul className="relative w-full border-[1px] border-black rounded-[24px] overflow-hidden">
          <li className="relative h-[30px] w-full">
            <div className="relative px-4 font-extrabold text-[18px] lg:text-[24px] text-center">
              INTREBARI FRECVENTE
            </div>
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black" />
          </li>
          {FAQ.map((element, index) => (
            <FAQItem
              key={index}
              question={element.question}
              answer={element.answer}
              isOpen={showQuestion.includes(index)}
              toggle={() => toggleQuestion(index)}
            />
          ))}
        </ul>
        <div className="flex flex-col items-center">
          <p className="font-bold text-center">
            DACA AI CONSULTAT INTREBARILE FRECVENTE SI NU AI GASIT O REZOLVARE
            LA PROBLEMA TE, NE POTI CONTACTA PE WHATSAPP
          </p>
          <a
            href="http://wa.me/+40764038271"
            className="text-[24px] lg:text-[32px] font-bold flex mx-2"
          >
            <span className="text-[28px] lg:text-[36px] mt-1 lg:mt-2 mr-1">
              <AiOutlineWhatsApp />
            </span>
            0764038271
          </a>
        </div>
        <ReturnForm />
      </div>
    </div>
  );
};

export default Suport;
