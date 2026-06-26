"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Participante = {
  nombre: string;
  email: string;
  puntos_totales: number;
  pronosticos_enviados: number;
};

type Pronostico = {
  id: string;
  nombre: string;
  email: string;
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

type Resultado = {
  partido_id: number;
  goles_local: number;
  goles_visitante: number;
};

export default function PronosticosPublicosPage() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedParticipante, setSelectedParticipante] =
    useState<Participante | null>(null);
  const [pronosticos, setPronosticos] = useState<Pronostico[]>([]);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: rankingData } = await supabase
        .from("ranking_automatico")
        .select("nombre, email, puntos_totales, pronosticos_enviados")
        .order("puntos_totales", { ascending: false });

      const { data: resultadosData } = await supabase
        .from("resultados")
        .select("partido_id, goles_local, goles_visitante");

      if (rankingData) {
        setParticipantes(rankingData as Participante[]);
      }

      if (resultadosData) {
        setResultados(resultadosData as Resultado[]);
      }

      setLoading(false);
    };

    cargarDatos();
  }, []);

  const cargarPronosticos = async (email: string) => {
    setSelectedEmail(email);

    const participante =
      participantes.find((p) => p.email === email) || null;

    setSelectedParticipante(participante);

    const { data } = await supabase
      .from("pronosticos")
      .select("*")
      .eq("email", email)
      .order("partido_id", { ascending: true });

    setPronosticos((data || []) as Pronostico[]);
  };

  const calcularPuntos = (p: Pronostico) => {
    const r = resultados.find((res) => res.partido_id === p.partido_id);

    if (!r) {
      return null;
    }

    const exacto =
      p.goles_local === r.goles_local &&
      p.goles_visitante === r.goles_visitante;

    if (exacto) {
      return 5;
    }

    const resultadoPronostico =
      p.goles_local > p.goles_visitante
        ? "local"
        : p.goles_local < p.goles_visitante
        ? "visita"
        : "empate";

    const resultadoReal =
      r.goles_local > r.goles_visitante
        ? "local"
        : r.goles_local < r.goles_visitante
        ? "visita"
        : "empate";

    if (resultadoPronostico === resultadoReal) {
      return 3;
    }

    return 0;
  };

  const resultadoReal = (partidoId: number) => {
    return resultados.find((r) => r.partido_id === partidoId);
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
            Todos los pronósticos son visibles para garantizar la transparencia
            del Concurso Mundialero CDA Estudiantes 2026.
          </p>
        </section>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-600 mb-8">
          <label className="block font-bold mb-3">
            Seleccionar participante
          </label>

          <select
            value={selectedEmail}
            onChange={(e) => cargarPronosticos(e.target.value)}
            className="w-full p-4 rounded-xl bg-white text-black font-bold"
          >
            <option value="">Selecciona un participante</option>

            {participantes.map((p) => (
              <option key={p.email} value={p.email}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="bg-slate-800 rounded-xl p-6 text-center font-bold">
            Cargando participantes...
          </div>
        )}

        {pronosticos.length > 0 && selectedParticipante && (
          <>
            <div className="bg-blue-700 rounded-2xl p-6 mb-8">
              <h2 className="text-3xl font-extrabold mb-3">
                {selectedParticipante.nombre}
              </h2>

              <div className="grid md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="font-bold">🌎 País</p>
                  <p>{pronosticos[0].pais || "No informado"}</p>
                </div>

                <div>
                  <p className="font-bold">📅 Primer envío</p>
                  <p>{fechaEnvio}</p>
                </div>

                <div>
                  <p className="font-bold">✅ Pronósticos</p>
                  <p>{selectedParticipante.pronosticos_enviados}/72</p>
                </div>

                <div>
                  <p className="font-bold">🏆 Puntos totales</p>
                  <p>{selectedParticipante.puntos_totales}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {pronosticos.map((p) => {
                const puntos = calcularPuntos(p);
                const real = resultadoReal(p.partido_id);

                return (
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

                    <div className="grid grid-cols-[1fr_90px_1fr] items-center gap-3 mb-4">
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

                    <div className="bg-slate-900 rounded-xl p-4 text-sm">
                      <p>
                        📅 Enviado:{" "}
                        {new Date(p.created_at).toLocaleString("es-CL")}
                      </p>

                      {real ? (
                        <p>
                          ⚽ Resultado real: {real.goles_local} -{" "}
                          {real.goles_visitante}
                        </p>
                      ) : (
                        <p>⚽ Resultado real: Pendiente</p>
                      )}

                      <p className="font-extrabold mt-2">
                        {puntos === null
                          ? "⏳ Puntos: Pendiente"
                          : puntos === 5
                          ? "🟢 Puntos: 5 — Marcador exacto"
                          : puntos === 3
                          ? "🟡 Puntos: 3 — Acertó ganador/empate"
                          : "🔴 Puntos: 0"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && selectedEmail && pronosticos.length === 0 && (
          <div className="bg-red-700 rounded-xl p-6 text-center font-bold">
            No se encontraron pronósticos para este participante.
          </div>
        )}
      </div>
    </main>
  );
}