"use client"
import React, { useRef, useEffect } from "react"
import cursDeBaza from "../../../../../../public/Imagini/cursuri/curs_de_baza_premium.jpg"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { KitBaza } from "app/constants"

const CursDeBazaPremium = () => {
  const videoEl = useRef(null)
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error)
      })
  }
  useEffect(() => {
    attemptPlay()
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full py-[5rem] lg:py-[10rem]">
      <div className="flex lg:flex-row flex-col items-center lg:items-start">
        <div className="relative lg:ml-[2rem] flex flex-col items-center w-[90%] lg:w-[25rem]">
          <Image
            alt="Curs de Baza"
            src={cursDeBaza}
            className=" w-[21rem] lg:w-[25rem] "
          />
          <LocalizedClientLink href="/cursuri/checkout" className="w-full">
            <button
              onClick={() => {
                localStorage.setItem("cumparaCurs", "Curs De Baza Premium(Avans)")
                window.scrollTo({ top: 0, left: 0 })
              }}
 className="mt-[2rem] border-[2px] border-black w-full text-[18px] font-bold h-[3rem] rounded-[8px] tracking-[6px] bg-transparent text-black hover:bg-black hover:text-white transition-all ease-in-out duration-200"
            >
              CUMPARA ACUM
            </button>
          </LocalizedClientLink>
          <div className="relative flex flex-col items-left w-full mt-[2rem]">
            <h3 className="mb-[1rem]  lg:text-[18px] text-justify">
              Achiti <span className="font-bold">AVANSUL</span> de{" "}
              <span className="font-bold">500 de lei </span> aici sau la locatie
              pentru a-ti rezerva locul, restul sumei se achita in prima zi de
              curs
            </h3>
            <p className="relative flex flex-col justify-center items-center  font-extrabold ">
                  {" "}
                  KIT pentru acasa inclus in pret(690 lei)
                </p>{" "}
            <div className="flex  items-center  justify-between w-full text-[18px] lg:text-[20px] font-thin mt-[1rem]">
              PRET TOTAL{" "}
              <div className="flex flex-col items-center ">
                <span className="relative  text-[24px] font-extrabold text-[#DAA520]">
                  {" "}
                  2870 lei{" "}
                </span>{" "}
                <p className="relative flex flex-col justify-center items-center text-[18px] font-extrabold text-gray-300">
                  {" "}
                  <span>(10% Reducere)</span> <div> De la <span>3190</span> lei </div>{" "}
                </p>{" "}
              </div>{" "}
            </div>
            <div>
            <p className=' lg:text-[18px] text-justify'><span className='font-bold '>Atestare în domeniu</span>: <span className='font-bold'>700 lei</span> taxa organizare examen(optional)</p>
            <p className=' lg:text-[18px] text-justify'>Avansul nu este retunabil, dar se poate modifica perioada cursului cu minim 2 saptamani înainte.</p>
            </div>
            <div className="flex  flex-col items-center w-full font-thin mt-[1rem]">
              <h4 className="font-bold text-[18px] lg:text-[20px] ">Kit-ul Inclus contine:</h4>
              <p>{KitBaza}</p>
            </div>
          </div>
          {/*
          <div className="h-[40rem] mt-[5rem]">
            <video
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                margin: "100 auto",
                objectFit: "cover",
              }}
              playsInline
              loop
              muted
              controls
              alt="Curs de baza"
              src="/Imagini/cursuri/cursDeBazaZiua1video.mp4" // Folosești URL relativ
              ref={videoEl}
            />
          </div>
          */}
        </div>
        <div className="relative  lg:ml-[4rem] mt-[2rem] lg:mt-0 flex flex-col items-center w-[90%] lg:w-[40rem]">
          <h2 className="text-[18px] lg:text-[28px] font-norican">Curs de baza PREMIUM</h2>
          <h1 className="text-[28px] lg:text-[42px] font-oswald font-bold text-center leading-[24px] lg:leading-[40px]">
          Curs de baza PREMIUM - 3 Zile
          </h1>
          
          <div className="w-[90%]  text-justify mt-[2rem] font-montSerrat">
            <p>
            Îți dorești un curs de baza care sa te propulseze direct printri cei mai buni? Atunci acesta este cursul potrivit pentru tine! După ce fixam bazele acestei meserii, te învăț și cele mai în voga tehnici și efecte care sa te ajute sa vinzi încă din prima luna de activitate!
            </p>
            <h3 className="py-[1rem] text-[20px] font-bold text-center">
              {" "}
              🔍 Ce îți oferim?{" "}
            </h3>

            <ol className="list-decimal ">
            <li className="py-2">
            Kit-ul complet pentru acasa (690 lei) este INCLUS in pretul cursului.
              </li>
              <li className="py-2">
                Formare Practică: Îți vom arăta pas cu pas cum să aplici
                extensiile de gene, de la alegerea materialelor până la
                tehnicile de aplicare, editare poze si promovare.
              </li>
              <li className="py-2">
                Certificare: La finalizarea cursului, vei primi o diploma care
                îți va deschide uși în industria beauty, poti opta si pentru
                diploma acreditata de catre Ministerul Muncii.
              </li>
              <li className="py-2">
                Suport: Beneficiezi de asistență și sfaturi din partea
                specialiștilor noștri chiar și după finalizarea cursului.
              </li>
            </ol>
            <h3 className="py-[1rem] text-[20px] font-bold text-center">
              {" "}
              💖 De ce să alegi cursul nostru?
            </h3>
            <ol className="list-decimal ">
              <li className="py-2">
                Te vom pune la curent cu tot ceea ce este actual si in trend
                pentru a avea succes garantat.
              </li>
              <li className="py-2">
                Mediul prietenos te va face sa fii relaxat pe toata perioada
                cursului
              </li>
              <li className="py-2">Plata in 2 rate</li>
              <li className="py-2">
                Posibilitate diploma ACREDITATA DE MINISTER(700 lei)
              </li>
            </ol>
            <h3 className="mt-[1rem] text-[20px] font-bold text-center">
              Program Curs:
            </h3>
            <h4 className="mt-[.5rem]">Ziua 1 :</h4>
            <ul className="">
              <li className="py-2">09.00 &ndash; Coffee Break</li>
              <li className="py-2">09.30&ndash;11.30 &ndash; Teorie</li>
              <li className="py-2">
                11.30&ndash;12.00 &ndash; Pauza de masa(Masa suportata de academie)
              </li>
              <li className="py-2">12.00&ndash;16.00 &ndash; Practica 1D pe model</li>
              <li className="py-2">16.00&ndash;17.00 &ndash; Intrebari si raspunsuri</li>
            </ul>
            <h4 className="mt-[.5rem]">
            Ziua 2 :
            </h4>
            <ul>
              <li className="py-2">09:00 &ndash; Coffee Break</li>
              <li className="py-2">09:30&ndash;11:30 &ndash; Practica pe patch</li>
              <li className="py-2">11:30&ndash;12:00 &ndash; Pauza de masa(Masa suportata de academie)</li>
              <li className="py-2">12:00&ndash;16:00 &ndash; Practica Foxy pe model</li>
              <li className="py-2">16:00&ndash; 17:00 &ndash; Cum facem poze/video, Diplome, Poze </li>
            </ul>
            <h4 className="mt-[.5rem]">
            Ziua 3 :
            </h4>
            <ul>
              <li className="py-2">09:00 &ndash; Coffee Break</li>
              <li className="py-2">09:30&ndash;10:30 &ndash; Introducere în lumea efectelor speciale</li>
              <li className="py-2">10:30&ndash;11:30 &ndash; Demonstrație trainer</li>
              <li className="py-2">11:30&ndash;12:00 &ndash; Pauza de masa(Masa suportata de academie)</li>
              <li className="py-2">12:00&ndash; 16:00 &ndash; Practica Efect Special la alegere </li>
            </ul>
            <h3 className="py-[1rem] text-[20px] font-bold text-center">Informatii curs</h3>
            <ul>
              <li className="py-2">Pentru inscriere se percepe un avans de 500 lei din suma totala, in cazul neprezentarii, avansul nu se returneaza, in schimb se poate reprograma grupa daca ne anunti cu 2 saptamana inainte.</li>
              <li className="py-2">Diferenta de plata se face CASH/CARD la locatie in prima zi a cursului.</li>
              <li className="py-2">Pentru mai multe detalii: whatsapp +40764038271</li>
            </ul>
            <h4 className="py-[1rem] text-[20px] font-bold text-center">📅 Înscrie-te acum! Locurile sunt limitate! Transformă-ți visul în realitate și devino expert în extensii de gene!  </h4>
            <div className="flex flex-col items-center">
              <p className="mt-[1rem] font-bold text-[18px] leading-[17px] lg:leading-[23px]  lg:text-[24px]">
                Ai finalizat deja un curs de baza? Avem si un curs de
                perfectionare pregatit pentru tine.{" "}
              </p>
              <LocalizedClientLink href="/curs-de-efecte-speciale">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0 })
                  }}
                  className="border-[1px] border-yellow-400 font-bold px-[4rem] py-[.5rem] mt-[1rem] transition ease-in-out duration-300 hover:bg-yellow-400 hover:text-white"
                >
                  Afla mai multe{" "}
                </button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CursDeBazaPremium
