'use client'
import React,{useRef,useEffect} from 'react'
import cursVipDeBaza from '../../../../../../public/Imagini/cursuri/cursVip.jpeg'
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Image from 'next/image';
import { KitBaza, KitEfecte } from 'app/constants';

const CursVipDeBaza = () => {
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
    <div className='flex justify-center items-center w-full h-full py-[5rem] lg:py-[10rem]'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start'>
        <div className=' lg:ml-[2rem] flex flex-col items-center w-[90%] lg:w-[25rem]'>           
            <Image alt="Curs Vip de Baza" src={cursVipDeBaza} className=" w-[21rem] lg:w-[25rem] " />
            <LocalizedClientLink href="/checkout" className='w-full'>
            <button onClick={()=>{localStorage.setItem("cumparaCurs","Curs VIP De Baza 2 Zile (Avans)");window.scrollTo({top:0,left:0})}}  className="mt-[2rem] border-[2px] border-black w-full text-[18px] font-bold h-[3rem] rounded-[8px] tracking-[6px] bg-transparent text-black hover:bg-black hover:text-white transition-all ease-in-out duration-200">CUMPARA ACUM</button>
            </LocalizedClientLink>
            <div className='relative flex flex-col items-left w-full mt-[2rem]'>
                <h3 className='mb-[1rem] lg:text-[18px] text-justify'>Achiti   <span className='font-bold'>AVANSUL</span> de <span className='font-bold'>500 de lei </span> aici sau la locatie pentru a-ti rezerva locul, restul sumei se achita in prima zi de curs</h3>
                <p className="relative flex flex-col justify-center items-center  font-extrabold ">
                  {" "}
                  KIT pentru acasa inclus in pret(690 lei)
                </p>{" "}
                <h2 className='text-[24px] font-bold mt-[2rem] w-full text-center' >BAZA</h2>

                <div className="flex    justify-between w-full text-[18px] lg:text-[20px] font-thin mt-[1rem]">
      
              <div className="flex flex-col items-center ">
              <div className="flex  items-center  justify-between w-full text-[18px] lg:text-[20px] font-thin mt-[1rem]">
              2 ZILE{" "}
              <div className="flex  flex-col items-center ">
                <span className="relative  text-[24px] font-extrabold text-[#DAA520]">
                  {" "}
                  3150 lei{" "}
                </span>{" "}
                <p className="relative flex flex-col justify-center items-center text-[18px] font-extrabold text-gray-300">
                  {" "}
                  <span>(10% Reducere)</span> <div> De la <span>3500</span> lei </div>{" "}
                </p>{" "}
              </div>{" "}
            </div>
                <div className="flex  flex-col items-center w-full font-thin mt-[1rem]">
              <h4 className="font-bold text-[18px] lg:text-[20px] ">Kit-ul Inclus contine:</h4>
              <p>{KitBaza}</p>
            </div>
              </div>{" "}
            </div>
                <h2 className='text-[24px] font-bold mt-[2rem] w-full text-center' >EFECTE SPECIALE</h2>
        
                <div className="flex  items-center  justify-between w-full text-[18px] lg:text-[20px] font-thin mt-[1rem]">
              2 ZILE{" "}
              <div className="flex flex-col items-center ">
                <h3 className="relative  text-[24px] font-extrabold text-[#DAA520]">
                  {" "}
                  3600 lei{" "}
                </h3>{" "}
                <h3 className="relative flex flex-col justify-center items-center text-[18px] font-extrabold text-gray-300">
                  {" "}
                  <span>(10% Reducere)</span> <div> De la <span>4000</span> lei </div>{" "}
                </h3>{" "}
              </div>{" "}
            </div>
                {/*<div className='h-[40rem] mt-[5rem]'>
                            <video
                                style={{ maxWidth: "100%", width: "100%",height:"100%", margin: "100 auto",objectFit:"cover"}}
                                playsInline
                                loop
                                muted
                                controls
                                alt="All the devices"
                                src="Imagini/cursVipVideo.mp4"
                                ref={videoEl}
                                />
                </div>*/}
                         <div className="flex  flex-col items-center w-full font-thin mt-[1rem]">
              <h4 className="font-bold text-[18px] lg:text-[20px] ">Kit-ul Inclus contine:</h4>
              <p>{KitEfecte}</p>
            </div>
            </div>
            </div>
            <div className='relative lg:ml-[4rem] mt-[2rem] lg:mt-0  flex flex-col items-center w-[90%] lg:w-[40rem]'>
                    <h2 className='text-[28px] font-norican'>Doar tu si trainerul</h2>
                    <h1 className="text-[28px] lg:text-[42px] font-oswald font-bold text-center leading-[24px] lg:leading-[40px]">Curs VIP de baza </h1>
                    <div className='w-[90%]  text-justify mt-[2rem] font-montSerrat'>
                        <h4 className='font-bold text-center text-[20px] py-[1rem]'>*Posibilitate cu translator & alegerea datelor </h4> 
                     <p>
                     Te-ai gandit vreodata ca iti doresti sa participi la un curs de baza unde toata atentia trainerului sa fie indreptata asupra ta? Atunci cursul VIP este alegerea perfcta pentru tine! 

Iti doresti sa ai propria ta AFACERE si sa-ti urmezi visul in domeniul BEAUTY? Acum este momentul sa CREZI in tine si sa FACI primul pas catre o noua CARIERA! Ne vom asigura ca drumul tau in lumea extensiilor de gene va duce catre SUCCES
                    </p>
                    <h4 className='font-bold mt-[1rem] text-[20px] text-center '>Ce iti punem la dispozitie?</h4>
                    
                    <ol className='list-decimal '>
                   <li className='py-2'> 
                   DIPLOMA de CURS ACREDITATA(la cerere) - Taxa de 700 Ron, Kit complet pentru acasa - 650 Lei
                   </li>
                   <li className='py-2'> 
                    Teorie pe care sa o studiezi acasa in confortul tau, urmand ca la curs sa discutam pe temele din document. 
                    </li>
                    <li className='py-2'> 
                    Ma voi implica atat eu, cat si asistenta mea in pregatirea ta, deci vei avea 2 persoane de la care poti invata
                    </li>
                    <li className='py-2'>
                    Practica pe 2 MODELE UMANE
                    </li>
                    <li className='py-2'> 
                    EXERCITII atat pe manechin, cat si pe sponge
                    </li>
                    <li className='py-2'>
                    O APLICARE FOXY(NEW TREND)
                    </li> 
                    <li className='py-2'> 
                    MODUL special dedicat INSTAGRAM, TIK TOK, FACEBOOK ADS
                    </li>
                    <li className='py-2'>
                    CUM sa te PROMOVEZI? 
                    </li>
                    <li className='py-2'> 
                    APLICATII pentru EDITARE FOTO/VIDEO
                    </li>
                    <li className='py-2'    >
                    Toate PRODUSELE necesare in zilele de curs sunt puse la dispozitie de catre noi 
                    </li>
                    <li className='py-2'>Posibilitate de COLABORARE in salon</li>
                    </ol>
                    <h4 className='font-bold mt-[1rem] text-[20px] text-center '>De ce sa dai startul VISULUI tau alaturi de MINE? </h4>
                    <p className='mt-[.5rem]'>Sunt FONDATOAREA •Lorena Lash Studio• Salon specializat pe Extensii De Gene&Sprancene</p>
                    <ol>    
                        <li className='mt-[1rem]'>Dincolo de munca pe care am depus-o pentru a ajunge aici, PASIUNEA a facut diferenta! Exact asta te voi invata pe tine sa faci, sa transformi MUNCA in PASIUNE! </li>
                        <li className='mt-[.5rem]'>Inca de INCEPUT am stiut ca PROMOVAREA trebuie sa fie pe primul plan, iti voi arata diferenta dintre cei care se promoveaza constant si cei care asteapta sa fie descoperiti, imi doresc ca TU sa nu duci lipsa de cliente si sa fii in TOP inca de la inceput</li>
                        <li className='mt-[.5rem]'>Am constientizat ca EU sunt propriul BRAND pe care trebuie sa-l promovez, desi auzeam constant ca este necesar sa stiu cum sa “VAND”, vreau ca TU sa stii CUM sa te promovezi pe TINE.</li>
                    
                    </ol>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default CursVipDeBaza