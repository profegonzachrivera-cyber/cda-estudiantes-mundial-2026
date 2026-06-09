"use client";

import { useState } from "react";

export default function MisPronosticosPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl font-bold mt-8 mb-6">
          📋 Mis Pronósticos
        </h1>

        <p className="text-slate-300 mb-6">
          Ingresa tu correo electrónico para consultar tus pronósticos.
        </p>

        <div className="bg-slate-800 p-6 rounded-xl">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-lg text-black"
          />

          <button
            className="mt-4 bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </div>
    </main>
  );
}