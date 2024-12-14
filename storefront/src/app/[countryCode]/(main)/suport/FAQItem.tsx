'use client';

import { useState, useEffect, useRef } from "react";
import { FaCaretRight } from "react-icons/fa";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggle }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      setHeight(answerRef.current.scrollHeight); // Setăm înălțimea maximă
    } else {
      setHeight(0); // Resetăm înălțimea
    }
  }, [isOpen]);

  return (
    <li className="relative">
      <div
        onClick={toggle}
        className="flex justify-between items-center relative h-[30px] w-full cursor-pointer"
      >
        <h3 className="relative px-4 font-bold">{question}</h3>
        <span
          className={`text-[20px] mr-[16px] transform ${
            isOpen ? "rotate-90" : "rotate-0"
          } transition-transform`}
        >
          <FaCaretRight />
        </span>
      </div>
      <div
        className="relative overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{
          height: `${height}px`,
        }}
      >
        <div ref={answerRef} className="absolute px-4 py-[4px] lg:py-[8px]">
          <p className="leading-[13px]">{answer}</p>
        </div>
      </div>
    </li>
  );
};

export default FAQItem;
