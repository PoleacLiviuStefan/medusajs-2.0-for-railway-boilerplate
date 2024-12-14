"use client"
import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import getDateInfo from "@lib/util/transform-date"

let stripePromise

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_live_51MroBpCV1XqGrlRbJMZ8BZ6cFMqZjpa5yCxEknMWc2ioPxrO2V9VhGZm77CMOtYF1vo6hzw85kbC64bJwvIkg2OG00SxxOnm59" //pk_test_51MroBpCV1XqGrlRbp1l5l1QjwkrjcuXGwkb1MIdSw1LKpE8Z7WA2n1VNVkYv5JmQk7YQPLHUXGxtPAJ2vKdtsy3r00DlCrZk4y
    )
  }

  return stripePromise
}
const Buy = () => {
  const [curs, setCurs] = useState(localStorage.getItem("cumparaCurs"))
  const [coursesInfo, setCoursesInfo] = useState([])
  const [indexSelectedCourse, setIndexSelectedCourse] = useState(
    localStorage.getItem("cumparaCurs") === "Curs De Baza (Avans)"
      ? 0
      : localStorage.getItem("cumparaCurs") === "Curs De Baza (Integral)"
      ? 0
      : localStorage.getItem("cumparaCurs") ===
        "Curs De Baza + Kit Inclus (Integral)"
      ? 0
      : localStorage.getItem("cumparaCurs") ===
        "Curs De Efecte Speciale 1 Zi (Avans)"
      ? 1
      : localStorage.getItem("cumparaCurs") ===
        "Curs De Efecte Speciale 1 Zi (Integral)"
      ? 1
      : localStorage.getItem("cumparaCurs") ===
        "Curs De Perfectionare 2 Zile (Avans)"
      ? 1
      : localStorage.getItem("cumparaCurs") ===
        "Curs De Perfectionare 2 Zile (Integral)"
      ? 1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 2 Zile (Avans)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Efecte Speciale 1 Zi (Avans)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 2 Zile Fara Kit (Integral)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 2 Zile + Kit Inclus (Integral)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 3 Zile (Avans)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 3 Zile Fara Kit (Integral)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs VIP De Baza 3 Zile + Kit Inclus (Integral)"
      ? -1
      : localStorage.getItem("cumparaCurs") ===
        "Curs Efecte Speciale 1 Zi (Avans)"
      ? 2 : localStorage.getItem("cumparaCurs") ===
        "Curs De Baza Premium (Avans)" ? 3 
      : 3
  )
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pret, setPret] = useState(() => {
    switch (curs) {
      case "Curs De Baza (Integral)":
        return "2000"
      case "Curs De Baza + Kit Inclus (Integral)":
        return "2500"
      case "Curs De Efecte Speciale 1 Zi (Integral)":
        return "1500"
      case "Curs De Perfectionare 2 Zile (Integral)":
        return "2500"
      case "Curs VIP De Baza 2 Zile Fara Kit (Integral)":
        return "3000"
      case "Curs VIP De Baza 2 Zile (Integral)":
        return "3500"
      case "Curs VIP De Baza 3 Zile Fara Kit (Integral)":
        return "3500"
      case "Curs VIP De Baza 3 Zile + Kit Inclus (Integral)":
        return "4000"
      case "Curs Efecte Speciale 1 Zi (Integral)":
        return "950"
      default:
        return "0"
    }
  })

  const [pretCursSelectat, setPretCursSelectat] = useState(
    localStorage.getItem("cumparaCurs")
  )

  const perioadeCurs = [
   ["13-14 Ianuarie", "17-18 Februare", "24-25 Martie"],
   ["15-16 Ianuare", "19-20 Februarie",'25-26 Martie'],
   [],
   ["13-14-15 Ianuarie","17-18-19 Februarie","24-25-26 Martie"]
  ]

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/external/course`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch available dates")

      const result = await response.json()
      console.log("result", result.courses)
      setCoursesInfo(result.courses)
    } catch (error) {
      console.error("Error fetching available dates:", error.message)
    }
  }

  useEffect(() => {
    console.log("Da")
    fetchAvailableDates()
  }, [])

  const redirectToChekout = async () => {
    setLoading(true)
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: pretCursSelectat, quantity: 1 }],
      mode: "payment",
      successUrl: `https://lorenalash.ro/success`,
      cancelUrl: `https://lorenalash.ro/cancel`,
    })
    console.log("Stripe checkout error", error)
  }

  useEffect(() => {
    switch (curs) {
      case "Curs De Baza (Avans)":
        setPretCursSelectat("price_1OvQTLCV1XqGrlRbSm2Z4L2u")
        setPret("500")
        break
      case "Curs De Baza (Integral)":
        setPretCursSelectat("price_1NLYDyCV1XqGrlRb5rvUy2mg")
        setPret("2000")
        break
      case "Curs De Baza Premium (Avans)":
        setPretCursSelectat("price_1QN0ujCV1XqGrlRbTIf5x2ge") 
        setPret("500")
        break
      case "Curs De Baza + Kit Inclus (Integral)":
        setPretCursSelectat("price_1NLYDyCV1XqGrlRb5rvUy2mg") // Adaugă ID-ul corect pentru cursul respectiv
        setPret("2500")
        break
      case "Curs De Efecte Speciale 1 Zi (Avans)":
        setPretCursSelectat("price_1OvQFxCV1XqGrlRbqdtyocuT")
        setPret("500")
        break
      case "Curs De Efecte Speciale 1 Zi (Integral)":
        setPretCursSelectat("price_1OK4WBCV1XqGrlRb9wvbpoGI")
        setPret("1500")
        break
      case "Curs De Perfectionare 2 Zile (Avans)":
        setPretCursSelectat("price_1MsiOmCV1XqGrlRbcY0edoc9")
        setPret("500")
        break
      case "Curs De Perfectionare 2 Zile (Integral)":
        setPretCursSelectat("price_1MsWpOCV1XqGrlRb0dtRQlWZ")
        setPret("2500")
        break
      case "Curs VIP De Baza 2 Zile (Avans)":
        setPretCursSelectat("price_1MsB5TCV1XqGrlRbX7G01gnH")
        setPret("500")
        break
      case "Curs VIP De Baza 2 Zile (Integral)":
        setPretCursSelectat("price_1MsWtECV1XqGrlRbgsXhEIve")
        setPret("3500")
        break
      case "Curs VIP De Baza 3 Zile Fara Kit (Integral)":
        setPretCursSelectat("price_1MsWv7CV1XqGrlRb4eSCbORv")
        setPret("3500")
        break
      case "Curs VIP De Baza 3 Zile + Kit Inclus (Integral)":
        setPretCursSelectat("price_1MsWv7CV1XqGrlRb4eSCbORv") // Adaugă ID-ul corect pentru curs
        setPret("4000")
        break
      case "Curs Efecte Speciale 1 Zi (Integral)":
        setPretCursSelectat("price_1MsWwhCV1XqGrlRbdhr200nv")
        setPret("950")
        break
      default:
        setPretCursSelectat("")
        setPret("0")
        break
    }
  }, [curs])

  const item = {
    price: pretCursSelectat,
    quantity: 1,
  }

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `https://lorenalash.ro/success`, //http://localhost:3000/success
    cancelUrl: `https://lorenalash.ro/cancel`, //http://localhost:3000/cancel
  }

  const sendForm = async (e) => {
    e.preventDefault()
    //localStorage.setItem("user_email", new FormData(e.target).get("user_email"));
    //console.log(new FormData(e.target).get("user_email"))
    const formData = new FormData(e.target)

    formData.forEach((value, name) => {
      localStorage.setItem(name, value.toString())
    })

    try {
      await redirectToChekout()
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="relative w-full h-full flex justify-center items-center py-[10rem] bg-gray-200 z-20 font-montSerrat">
      <div className="flex flex-col px-[2rem] py-[2rem]  bg-white rounded-[15px] w-[90%] lg:w-[40rem] h-full shadow-xl ">
        <form
          onSubmit={sendForm}
          className="flex lg:flex-row flex-col lg:flex-wrap lg:justify-between  w-full "
        >
          <div className="flex flex-col  my-[.5rem]">
            <label>Nume</label>
            <input
              name="user_nume"
              type="text"
              className="border-[#0b2a24] p-2 border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
              required
            />
          </div>
          <div className="flex flex-col my-[.5rem]">
            <label>Prenume</label>
            <input
              name="user_prenume"
              type="text"
              className="border-[#0b2a24] p-2  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
              required
            />
          </div>
          <div className="flex flex-col my-[.5rem]">
            <label>Telefon</label>
            <input
              name="user_telefon"
              type="text"
              minLength={10}
              className="border-[#0b2a24] p-2  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
              required
            />
          </div>
          <div className="flex flex-col my-[.5rem]">
            <label>Email</label>
            <input
              name="user_email"
              type="email"
              className="border-[#0b2a24] p-2  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
              required
            />
          </div>

          <div className="flex flex-col my-[.5rem]">
            <label>Adresa</label>
            <input
              name="user_adresa"
              type="text"
              className="border-[#0b2a24] p-2  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
              required
            />
          </div>

          <div className="flex flex-col my-[.5rem]">
            <label>Tip Curs</label>
            <select
              name="tip_curs"
              value={curs}
              onChange={(e) => {
                setCurs(e.target.value)
                setIndexSelectedCourse(
                  e.target.value === "Curs De Baza (Avans)"
                    ? 0
                    : e.target.value === "Curs De Baza (Integral)"
                    ? 0
                    : e.target.value === "Curs De Baza + Kit Inclus (Integral)"
                    ? 0
                    : e.target.value === "Curs De Efecte Speciale 1 Zi (Avans)"
                    ? 1
                    : e.target.value ===
                      "Curs De Efecte Speciale 1 Zi (Integral)"
                    ? 1
                    : e.target.value === "Curs De Perfectionare 2 Zile (Avans)"
                    ? 1
                    : e.target.value ===
                      "Curs De Perfectionare 2 Zile (Integral)"
                    ? 1
                    : e.target.value === "Curs VIP De Baza 2 Zile (Avans)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Efecte Speciale 1 Zi (Avans)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Efecte Speciale 2 Zile (Avans)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Baza 2 Zile Fara Kit (Integral)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Baza 2 Zile + Kit Inclus (Integral)"
                    ? -1
                    : e.target.value === "Curs VIP Efecte Speciale 1 Zi (Avans)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Baza 3 Zile Fara Kit (Integral)"
                    ? -1
                    : e.target.value ===
                      "Curs VIP De Baza 3 Zile + Kit Inclus (Integral)"
                    ? -1
                    : e.target.value === "Curs Efecte Speciale 1 Zi (Avans)"
                    ? 2 :
                    e.target.value === "Curs De Baza Premium (Avans)"
                    ? 3
                    : 3
                )
              }}
              className="border-[#0b2a24]  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
            >
              <option
                value="Curs De Baza (Avans)"
                onClick={() => setCurs("Curs De Baza (Avans)")}
                selected={
                  localStorage.getItem("cumparaCurs") === "Curs De Baza (Avans)"
                }
              >
                CURS DE BAZA (AVANS)
              </option>

              <option
                value="Curs De Baza Premium (Avans)"
                onClick={() => setCurs("Curs De Baza Premium (Avans)")}
                selected={
                  localStorage.getItem("cumparaCurs") ===
                  "Curs De Baza Premium(Avans)"
                }
              >
                CURS DE BAZA PREMIUM(AVANS)
              </option>
              {/*
              <option
                value="Curs De Baza (Integral)"
                onClick={() => setCurs("Curs De Baza (Integral)")}
              >
                CURS DE BAZA FARA KIT (INTEGRAL)
              </option>
              */}

              <option
                value="Curs De Efecte Speciale 1 Zi (Avans)"
                onClick={() => setCurs("Curs De Efecte Speciale 1 Zi (Avans)")}
                selected={
                  localStorage.getItem("cumparaCurs") ===
                  "Curs De Perfectionare"
                }
              >
                CURS DE EFECTE SPECIALE 1 ZI (AVANS)
              </option>

              {/*
              <option
                value="Curs De Efecte Speciale 1 Zi (Integral)"
                onClick={() => setCurs("Curs De Efecte Speciale 1 Zi (Integral)")}
              >
                CURS DE PERFECTIONARE & EFECTE SPECIALE 1 ZI (INTEGRAL)
              </option>
              */}

              <option
                value="Curs VIP De Baza 2 Zile (Avans)"
                onClick={() => setCurs("Curs VIP De Baza 2 Zile (Avans)")}
                selected={
                  localStorage.getItem("cumparaCurs") === "Curs VIP De Baza"
                }
              >
                CURS VIP DE BAZA 2 ZILE (AVANS)
              </option>

              {/*
              <option
                value="Curs VIP De Baza 2 Zile Fara Kit (Integral)"
                onClick={() =>
                  setCurs("Curs VIP De Baza 2 Zile Fara Kit (Integral)")
                }
              >
                CURS VIP DE BAZA 2 ZILE FARA KIT (INTEGRAL)
              </option>
              */}
              {/*
              <option
                value="Curs VIP Efecte Speciale 1 Zi (Avans)"
                onClick={() => setCurs("Curs VIP Efecte Speciale 1 Zi (Avans)")}
              >
                CURS VIP DE EFECTE SPECIALE 1 ZI (AVANS)
              </option>
*/}

              <option
                value="Curs VIP De Efecte Speciale 2 Zile (Avans)"
                onClick={() =>
                  setCurs("Curs VIP De Efecte Speciale 2 Zile (Avans)")
                }
              >
                CURS VIP DE EFECTE SPECIALE 2 ZILE (AVANS)
              </option>

              {/*
              <option
                value="Curs VIP De Baza 3 Zile Fara Kit (Integral)"
                onClick={() =>
                  setCurs("Curs VIP De Baza 3 Zile Fara Kit (Integral)")
                }
              >
                CURS VIP DE BAZA 3 ZILE FARA KIT (INTEGRAL)
              </option>
              */}
              {/*
              <option
                value="Curs Efecte Speciale 1 Zi (Avans)"
                onClick={() => setCurs("Curs Efecte Speciale 1 Zi (Avans)")}
                selected={
                  localStorage.getItem("cumparaCurs") ===
                    "Curs Efecte Speciale" && "selected"
                }
              >
                CURS FOXY 1 ZI (AVANS)
              </option>
              */}
              {/*
              <option
                value="Curs Efecte Speciale 1 Zi (Integral)"
                onClick={() => setCurs("Curs Efecte Speciale 1 Zi (Integral)")}
              >
                CURS FOXY 1 ZI (INTEGRAL)
              </option>
              */}
            </select>
          </div>
          <div className="flex flex-col my-[.5rem]">
            <label>
              {indexSelectedCourse === -1
                ? "Alege ziua in care vrei sa participi"
                : "Perioada Cursului"}
            </label>

            <select
              name="tip_curs"
              className={`border-[#0b2a24]  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px] ${
                (curs === "Curs VIP De Baza" || indexSelectedCourse === -1) &&
                "hidden"
              }`}
            >
              {indexSelectedCourse >= 0 &&
                perioadeCurs[indexSelectedCourse].map((val) => {
                  return (
                    <>
                      <option>{val}</option>
                    </>
                  )
                })}
            </select>
            <div
              onClick={() => console.log(selectedDate)}
              className={` h-[35px] ${
                curs !== "Curs VIP De Baza" &&
                indexSelectedCourse !== -1 &&
                "hidden"
              }`}
            >
              <DatePicker
                className="border-[#0b2a24] p-2  border-[1px] w-full lg:w-[15rem] h-[2rem] text-[14px]"
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                filterDate={(date) => date.getDay() !== 0}
              />
            </div>
          </div>
          <div className="flex flex-col w-full  my-[.5rem]">
            <label>Mentiuni Speciale</label>
            <textarea
              name="mentiuni_speciale"
              className="border-[#0b2a24] border-[1px] p-2 w-full lg:w-[36rem] h-[10rem]"
            />
          </div>

          <div className="flex flex-col items-center w-full mt-[2rem]">
            <h3 className=" text-[18px] lg:text-[24px] font-bold">
              COMANDA TA:
            </h3>
            <div className="relative flex justify-between w-full font-bold text-[20px] mt-[2rem] ">
              <h4>Produs</h4>
              <h4 className="mb-[.5rem]">Total</h4>
              <span className="absolute bottom-0 bg-black opacity-[15%] w-full h-[1px]" />
            </div>
            <div
              className={`flex ${
                curs && curs.includes("Avans") ? "" : "hidden"
              } justify-between w-full font-bold mt-[.5rem]`}
            >
              <h3> {curs}</h3>
              <h4>500 lei</h4>
            </div>
            <div
              className={`flex ${
                curs && !curs.includes("Avans") ? "" : "hidden"
              }  justify-between w-full font-bold mt-[.5rem]`}
            >
              <h4>{curs} </h4>
              <h4>{pret} lei</h4>
            </div>

            <h4>*Plata online prin card bancar</h4>
            <button
              value="Send"
              type="submit"
              className="font-bold px-[3rem] py-[1rem] mt-[1rem] bg-[#0b2a24] rounded-[8px] text-white"
            >
              {!loading ? "PLASEAZA COMANDA" : "ASTEPTATI..."}
            </button>
          </div>
          <input
            name="data_vip"
            type="text"
            value={selectedDate}
            className="hidden"
          />
        </form>
      </div>
    </div>
  )
}

export default Buy
