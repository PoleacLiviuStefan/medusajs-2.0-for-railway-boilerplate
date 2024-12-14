import React, { ReactNode } from "react";

interface HeroProps {
  gradient?: boolean; // `gradient` este opțional, tip boolean
  children: ReactNode; // `children` reprezintă conținutul componentelor React
  bgPrimary?: string; // `bgPrimary` este opțional, tip string
  bgSecond?: string; // `bgSecond` este opțional, tip string
}

const Hero: React.FC<HeroProps> = ({ gradient, children, bgPrimary, bgSecond }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row justify-center items-center gap-[32px] ${
        gradient ? "bg-gradient-to-b from-[#ffc2ea] via-[#ffc2ea] to-white" : ""
      } w-full h-full`}
      style={{
        background: bgPrimary || bgSecond ? `${bgPrimary || ""} ${bgSecond || ""}` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Hero;
