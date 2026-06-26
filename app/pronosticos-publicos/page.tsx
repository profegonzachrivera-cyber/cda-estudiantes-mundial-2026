"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Pronostico = {
  id: string;
  nombre: string;
  email: string;
  whatsapp: string;
  pais: string | null;
  partido_id: number;
  equipo_local: string;
  equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  grupo: string;
  fecha: string;
  created_at: string;
};

export default function PronosticosPublicosPage() {
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [pronosticos, setPronosticos] = useState<Pronostico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarParticipantes = async () => {
      const { data, error } = await supabase
        .from("participantes")
        .select("nombre")
        .order("nombre", { ascending: true });

      if (!error && data) {
        const nombres = Array.from(
          new Set(
            data
              .map((p) => p.nombre?.trim())
              .filter(
                (nombre): nombre is string =>
                  Boolean(nombre && nombre.length > 0)
              )
          )
        );

        setParticipantes(nombres);
      }

      setLoading(false);
    };

    cargarParticipantes();
  }, []);

  const cargarPronosticos = async (nombre: string) => {
    setSelected(nombre);

    const { data, error } = await supabase
      .from("pronosticos")
      .select("*")
      .ilike("nombre", nombre)
      .order("partido_id", { ascending: true });

    if (!error && data) {
      setPronosticos(data as Pronostico[]);
    }
  };

  const fechaEnvio =
    pronosticos.length > 0
      ? new Date(pronosticos[0].created_at).toLocaleString("es-CL")
      : "No disponible";

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <section className="text-center my-10">
          <img
            src="/logo-cdae.jpg"
            alt="CDAE"
            className="h-32 mx-auto rounded-xl bg-white mb-6"
          />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            📋 Pronósticos Públicos
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Todos los pronósticos son públicos para garantizar la transparencia
            del Concurso Mundialero CDA Estudiantes 2026.
          </p>
        </section>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-600 mb-8">
          <label className="block font-bold mb-3">
            Seleccionar participante
          </label>

          <select
            value={selected}
            onChange={(e) => cargarPronosticos(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-black font-bold"
          >
            <option value="">Selecciona un participante</option>

            {participantes.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="bg-slate-800 rounded-xl p-6 text-center font-bold">
            Cargando participantes...
          </div>
        )}

        {pronosticos.length > 0 && (
          <>
            <div className="bg-blue-700 rounded-2xl p-6 mb-8">
              <h2 className="text-3xl font-extrabold mb-3">
                {pronosticos[0].nombre}
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="font-bold">🌎 País</p>
                  <p>{pronosticos[0].pais || "No informado"}</p>
                </div>

                <div>
                  <p className="font-bold">📅 Primer envío</p>
                  <p>{fechaEnvio}</p>
                </div>

                <div>
                  <p className="font-bold">✅ Pronósticos enviados</p>
                  <p>{pronosticos.length}/72</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {pronosticos.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-yellow-400 font-extrabold">
                      Partido {p.partido_id}
                    </span>

                    <span className="text-slate-400 text-sm">
                      Grupo {p.grupo}
                    </span>
                  </div>

                  <div className="text-slate-400 text-sm mb-4">
                    {p.fecha}
                  </div>

                  <div className="grid grid-cols-[1fr_90px_1fr] items-center gap-3">
                    <div className="font-bold text-right">
                      {p.equipo_local}
                    </div>

                    <div className="bg-white text-black rounded-xl py-3 text-center font-extrabold text-xl">
                      {p.goles_local} - {p.goles_visitante}
                    </div>

                    <div className="font-bold">
                      {p.equipo_visitante}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && selected && pronosticos.length === 0 && (
          <div className="bg-red-700 rounded-xl p-6 text-center font-bold">
            No se encontraron pronósticos para este participante.
          </div>
        )}
      </div>
    </main>
  );
}