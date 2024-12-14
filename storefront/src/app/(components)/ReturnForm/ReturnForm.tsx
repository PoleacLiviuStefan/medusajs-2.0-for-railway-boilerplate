import { PREFIXES } from "app/constants";
import React from "react";

const ReturnForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adaugă logica de trimitere a formularului aici
    console.log("Formular trimis!");
  };

  return (
    <div className="w-full lg:w-[600px]  mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Formular de Retur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nume" className="block text-sm font-medium text-gray-700">
            Nume
          </label>
          <input
            type="text"
            id="nume"
            name="nume"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="prenume" className="block text-sm font-medium text-gray-700">
            Prenume
          </label>
          <input
            type="text"
            id="prenume"
            name="prenume"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="nrFactura" className="block text-sm font-medium text-gray-700">
            Nr. Factură/Comandă
          </label>
          <input
            type="text"
            id="nrFactura"
            name="nrFactura"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
        <label htmlFor="phone">
  Număr Telefon
  <div className="flex gap-2 items-center">
    <select className="border p-2 rounded-md">
    {PREFIXES.map(({ code, name }) => (
    <option key={code} value={code}>
      {name} ({code})
    </option>
  ))}
    </select>
    <input
      type="tel"
      id="phone"
      name="phone"
      className="border p-2 w-full rounded-md"
      required
    />
  </div>
</label>

        </div>
        <div>
          <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
            IBAN Cont Bancar <br/> <span className="text-gray-400">Exemplu: RO49 AAAA 1B31 0075 9384 0000 </span>
          </label>
          <input
            type="text"
            id="iban"
            name="iban"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black transition-all ease-in-out duration-300 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Trimite Formularul
        </button>
      </form>
    </div>
  );
};

export default ReturnForm;
