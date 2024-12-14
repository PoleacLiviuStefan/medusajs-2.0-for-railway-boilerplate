'use client'
import React, { useEffect, useRef } from 'react'
import cursDePerfectionare from '../../../../../../public/Imagini/cursuri/curs_de_efecte_speciale.jpg'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import Image from 'next/image'
import { KitEfecte } from 'app/constants'

const Page = () => {
  const videoEl = useRef(null);
  
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };
  
  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full py-[5rem] lg:py-[10rem]'>
      <div className='flex lg:flex-row flex-col items-center lg:items-start'>
        <div className='lg:ml-[2rem] flex flex-col items-center w-[90%] lg:w-[25rem]'>
          <Image alt="Curs de Perfectionare" src={cursDePerfectionare} className="w-[21rem] lg:w-[25rem]" />
          <LocalizedClientLink href="/checkout" className='w-full'>
            <button 
              onClick={() => { 
                localStorage.setItem("cumparaCurs", "Curs De Efecte Speciale 1 Zi (Avans)");
                window.scrollTo({ top: 0, left: 0 });
              }} 
 className="mt-[2rem] border-[2px] border-black w-full text-[18px] font-bold h-[3rem] rounded-[8px] tracking-[6px] bg-transparent text-black hover:bg-black hover:text-white transition-all ease-in-out duration-200"
            >
              CUMPARA ACUM
            </button>
          </LocalizedClientLink>
          <div className='relative flex flex-col items-left w-full mt-[2rem] gap-[16px]'>
            <p className=' lg:text-[18px] text-justify'>
              Achiti <span className='font-bold'>AVANSUL</span> de <span className='font-bold'>500 de lei </span> aici sau la locatie pentru a-ti rezerva locul, restul sumei se achita in prima zi de curs
            </p>
            <p className="relative flex flex-col justify-center items-center  font-extrabold ">
                  {" "}
                  KIT pentru acasa inclus in pret(690 lei)
                </p>{" "}
                <div className="flex  items-center  justify-between w-full text-[18px] lg:text-[20px] font-thin mt-[1rem]">
              2 ZILE{" "}
              <div className="flex flex-col items-center ">
                <span className="relative  text-[24px] font-extrabold text-[#DAA520]">
                  {" "}
                  2250 lei{" "}
                </span>{" "}
                <p className="relative flex flex-col justify-center items-center text-[18px] font-extrabold text-gray-300">
                  {" "}
                  <span>(10% Reducere)</span> <div> De la <span>2500</span> lei </div>{" "}
                </p>{" "}
              </div>{" "}
            </div>
            
            <div>
            <p className=' lg:text-[18px] text-justify'><span className='font-bold '>Atestare în domeniu</span>: <span className='font-bold'>700 lei</span> taxa organizare examen(optional)</p>
            <p className=' lg:text-[18px] text-justify'>Avansul nu este retunabil, dar se poate modifica perioada cursului cu minim 2 saptamani înainte.</p>
            </div>
          </div>
          <div className="flex  flex-col items-center w-full font-thin mt-[1rem]">
              <h4 className="font-bold text-[18px] lg:text-[20px] ">Kit-ul Inclus contine:</h4>
              <p>{KitEfecte}</p>
            </div>
        </div>

        <div className='relative lg:ml-[4rem] mt-[2rem] lg:mt-0 flex flex-col items-center w-[90%] lg:w-[40rem]'>
          <h1 className="text-[28px] lg:text-[42px] font-oswald font-bold text-center leading-[24px] lg:leading-[40px]">Curs De Efecte Speciale</h1>
          <div className='w-[90%] text-justify mt-[2rem] font-montSerrat'>
            <p>
              Acest curs inovator își propune să îți dezvăluie secretele aplicării efectelor speciale în extensiile de gene, transformându-ți abilitățile de tehnician în adevărate opere de artă. Fie că dorești să adaugi un strop de originalitate serviciilor tale sau să te diferențiezi pe piață, acest curs este perfect pentru tine. Este dedicat tehnicienilor cu experiența de minim 2 luni. Efecte pe care le vom aborda: Foxy, Feline, Eyeliner, Wispy, Kim K, Wet Look, s.a. Acest curs este potrivit atât tehnicienilor ce lucrează în tehnica one by one, cât și în tehnica de volum.
            </p>

            <h3 className="py-[1rem] text-[20px] font-bold text-center">
              Ce vei învăța:
            </h3>
            <ul className="list-decimal">
              <li className="py-2"><span className='font-bold'>Tehnici Avansate</span>: Foxy, Feline, Eyeliner, Wispy, Kim K, Wet Look</li>
              <li className="py-2"><span className='font-bold'>Promovare</span>: Fac analiza paginilor tale din Online și le transform, nu știi INSTAGRAM,TIKTOK? Nicio problemă de acum!</li>
              <li className="py-2"><span className='font-bold'>Strategie</span>: Aflu povestea ta și îți creez o strategie, fie că ai nevoie de mai mulți clienți, fie că te-ai blocat la o anumită etapă, este timpul să se facă lumina și să treci la următorul nivel!</li>
              <li className="py-2"><span className='font-bold'>Analiza</span>: Stabilim și analizăm ce tehnică te avantajează cel mai mult și te învăț cum să excelezi pentru că îți dorești să fii EXPERT, nu?</li>
            </ul>
          
            <h3 className="py-[1rem] text-[20px] font-bold text-center">
            Cine ar trebui să participe:
            </h3>
              <p>
              Acest curs este destinat tehnicienilor de gene cu experiență(minim 2 luni) care doresc să își extindă abilitățile și să ofere servicii inovatoare clienților lor.
              </p>
              <ul>
                <li className="py-2">Acces la materiale de studiu exclusive</li>
                <li className="py-2">Suport post-curs și oportunități de networking cu alți profesioniști din domeniu.</li>
                <li className="py-2">Certificare care atestă competențele tale în tehnici avansate de extensii de gene</li>
                </ul>
            <div className='flex flex-col items-center'>
              <p className='mt-[1rem] font-bold text-[18px] leading-[17px] lg:leading-[23px] lg:text-[24px]'>
                Nu te simți încă pregătită pentru acest curs? Îl poți urma mai întâi pe cel de bază.
              </p>
              <LocalizedClientLink href={`/cursuri/curs-de-baza`}>
                <button 
                  onClick={() => { window.scrollTo({ top: 0, left: 0 }); }} 
                  className='border-[1px] border-yellow-400 font-bold px-[4rem] py-[.5rem] mt-[1rem] transition ease-in-out duration-300 hover:bg-yellow-400 hover:text-white'
                >
                  Afla mai multe
                </button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
{/*
      <div className='h-[40rem] w-full flex justify-center mt-[5rem]'>
        <video
          style={{ maxWidth: "100%", width: "25rem", height: "100%", margin: "100 auto", objectFit: "cover" }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src="/Imagini/cursuri/cursDePerfectionareVideo.mp4"
          ref={videoEl}
        />
      </div>
      */}
    </div>
  )
}

export default Page
