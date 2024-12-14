import React from "react"
import cursDeBaza from "../../../../../public/Imagini/cursuri/curs_de_baza_preview.jpg"
import cursDeBazaPremium from "../../../../../public/Imagini/cursuri/curs_de_baza_premium_preview.jpg"
import cursDePerfectionare from "../../../../../public/Imagini/cursuri/curs_de_efecte_speciale_preview.jpg"
import cursVip from "../../../../../public/Imagini/cursuri/cursVip_preview.jpg"
import CursMainPreview from "../../../(components)/Courses/CursMainPreview"
import LorenaHero from '../../../../../public/Imagini/stiliste/lorena_3.png'
import Hero from "app/(components)/Hero/Hero"
import Image from "next/image"
import InfoContainer from "../../../(components)/Info/InfoContainer"

const page = () => {
  return (
    <>
          <Hero gradient={true} bgPrimary="primary" bgSecond="white">
        <Image alt="Cursuri" src={LorenaHero} className="h-[350px] lg:h-[600px] w-auto" />
        <div className="w-full px-4 lg:w-[700px] -mt-[32px] lg:mt-0">
        <h2 className="text-[18px] lg:text-[24px] w-full font-bold text-center leading-5 lg:leading-7 ">
        Transformă-ți Pasiunea în Carieră cu Academia Noastră de Extensii de Gene din București!
        </h2>
        <p className="text-center text-[13px] lg:text-[16px] w-full text-gray-600  px-4 leading-4 lg:leading-5 mt-[8px]">
        Ești gata să îți duci abilitățile la nivelul următor? La academia noastră, oferim cursuri profesionale de extensii de gene care te vor ajuta să devii expert în domeniu. 
        </p>
        </div>
      </Hero>

  
    <div className="flex flex-col justify-center items-center w-full h-full py-[5rem] lg:py-[10rem]">
    <InfoContainer description="" title="" display="flex" flexDirection="col" height="300" >
    <div className="flex flex-col justify-between  p-4 lg:grid lg:grid-cols-3 justify-items-center leading-4 mx-auto items-center w-[80%] h-full gap-[16px] lg:gap-0">
          <div className=" w-full px-4 lg:w-[300px]">
            <p>Cursuri Practice și Teoretice: Îmbină cunoștințele teoretice cu practica intensivă. </p>
          </div>
          <div className=" w-full px-4 lg:w-[300px]">
            <p>Atestare Minister: La finalul cursului, poti opta pentru diplomă atestata de Ministerul Muncii care îți va deschide uși în industrie.  </p>
          </div>
          <div className=" w-full px-4 lg:w-[300px]">
            <p>Suport și Îndrumare: Continuăm să te sprijinim și după finalizarea cursului.  </p>
          </div>
          </div>
          <p className="w-full lg:w-[700px] leading-4 font-bold">Fie că ești la început de drum sau vrei să îți perfecționezi tehnica, cursurile noastre sunt concepute să îți ofere tot ce ai nevoie pentru a avea succes. Alătură-te sutelor de absolvenți mulțumiți și începe-ți cariera de succes în extensiile de gene!</p>
        </InfoContainer>


      <div className="relative lg:ml-[2rem] mt-[1rem]  flex flex-wrap justify-center gap-[32px] w-full ">
        <CursMainPreview
          imagine={cursDeBaza}
          titlu="Curs de baza 1D-3D & Foxy"
          subTitlu="Curs de baza"
          descriere="Iti doresti sa ai propria ta AFACERE si sa-ti urmezi visul in domeniul BEAUTY? Acum este momentul sa CREZI in tine si sa FACI primul pas catre o noua CARIERA! Ne vom asigura ca drumul tau in lumea extensiilor de gene va duce catre SUCCES"
          redirectionare="curs-de-baza"
          baza={true}
        />
              <CursMainPreview
          imagine={cursDeBazaPremium}
          titlu="Curs de baza PREMIUM (Baza&Efecte)"
          subTitlu="Curs de baza"
          descriere="Iti doresti sa ai propria ta AFACERE si sa-ti urmezi visul in domeniul BEAUTY? Acum este momentul sa CREZI in tine si sa FACI primul pas catre o noua CARIERA! Ne vom asigura ca drumul tau in lumea extensiilor de gene va duce catre SUCCES"
          redirectionare="curs-de-baza-premium"
          baza={true}
        />
        <CursMainPreview
          imagine={cursDePerfectionare}
          titlu="Curs de Efecte Speciale Avansati"
          subTitlu="Curs de efecte special"
          secondTitle="Cui i se adreseaza?"
          descriere=" 

Tehnicienilor care au finalizat un curs de baza, au experienta minim 3 luni si doresc sa-si imbunatateasca tehnica, de asemenea, pot invata sa aplice noi curburi, tehnici si metode!
Vom rezolva problemele fiecarui cursant si vom adapta totul in functie de acestia! "
          redirectionare="curs-de-efecte-speciale"
          baza={false}
        />
        <CursMainPreview
          imagine={cursVip}
          subTitlu="Doar tu si trainerul"
          secondTitle="*Posibilitate cu translator & alegerea datelor 
"
          titlu="Curs VIP de Baza/Efecte "
          descriere="Te-ai gandit vreodata ca iti doresti sa participi la un curs de baza unde toata atentia trainerului sa fie indreptata asupra ta? Atunci cursul VIP este alegerea perfcta pentru tine! 

Iti doresti sa ai propria ta AFACERE si sa-ti urmezi visul in domeniul BEAUTY? Acum este momentul sa CREZI in tine si sa FACI primul pas catre o noua CARIERA! Ne vom asigura ca drumul tau in lumea extensiilor de gene va duce catre SUCCES"
          redirectionare="curs-vip"
          baza={false}
        />
      </div>
    </div>
    </>
  )
}

export default page
