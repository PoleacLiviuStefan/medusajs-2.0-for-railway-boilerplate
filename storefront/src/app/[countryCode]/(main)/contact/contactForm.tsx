'use client'
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Poți adăuga aici logica de trimitere a datelor la backend.
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md w-full lg:w-[500px]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contactează-ne</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nume
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Introdu numele tău"
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
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Introdu adresa de email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mesaj
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Scrie mesajul tău aici..."
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white font-bold rounded-md  bg-black hover:bg-gray-700 transition-colors"
          >
            Trimite Mesaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
