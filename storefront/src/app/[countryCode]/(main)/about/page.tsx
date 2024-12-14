import React from 'react';
import AboutMain from '../../../(components)/About/AboutMain';
import Hero from '../../../(components)/Hero/Hero';
import Echipa from '../../../../../public/Imagini/stiliste/echipa.png';
import Image from 'next/image';

const page = () => {
  return (
    <div className="flex flex-col">
      <Hero gradient={true} bgPrimary="white" bgSecond="white">
        <Image
          src={Echipa}
          alt="Echipa stiliste"
          className="h-[600px] w-auto"
        />
      </Hero>
    </div>
  );
};

export default page;
