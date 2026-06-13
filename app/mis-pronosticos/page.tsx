"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Pronostico = {
  id: string;
  nombre: string;
  email: string;
  partido_id: number;
  equipo_local: string;
  equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  grupo: string;
  fecha: string;
};

export default function MisPronosticosPage() {
  const [email, setEmail] = useState("");
  const [pronosticos, setPronosticos] = useState<Pronostico[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const buscarPronosticos = async () => {
    if (!email) {
      setMessage("Ingresa un correo electrónico.");
      return;
    }

    setLoading(true);
    setMessage("");
    setPronosticos([]);

    const { data, error } = await supabase
      .from("pronosticos")
      .select("*")
      .eq("email", email.trim())
      .order("partido_id", { ascending: true });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Error al consultar los pronósticos.");
      return;
    }

    if (!data || data.length === 0) {
      setMessage("No encontramos pronósticos para ese correo.");
      return;
    }

    setPronosticos(data as Pronostico[]);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <h1 className="text-5xl font-extrabold mt-8 mb-4">
          📋 Mis Pronósticos
        </h1>

        <p className="text-slate-300 mb-8">
          Ingresa el correo electrónico con el que realizaste tus pronósticos.
        </p>

        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg text-black mb-4"
          />

          <button
            onClick={buscarPronosticos}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-lg"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>

          {message && (
            <p className="mt-4 text-red-300 font-semibold">
              {message}
            </p>
          )}
        </div>

        {pronosticos.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6">
              Pronósticos de {pronosticos[0].nombre}
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600 text-yellow-400">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Partido</th>
                  <th className="p-2 text-center">Pronóstico</th>
                  <th className="p-2 text-left">Grupo</th>
                </tr>
              </thead>

              <tbody>
                {pronosticos.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-slate-700"
                  >
                    <td className="p-2">{p.partido_id}</td>

                    <td className="p-2">
                      {p.equipo_local} vs {p.equipo_visitante}
                    </td>

                    <td className="p-2 text-center font-bold">
                      {p.goles_local} - {p.goles_visitante}
                    </td>

                    <td className="p-2">{p.grupo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}