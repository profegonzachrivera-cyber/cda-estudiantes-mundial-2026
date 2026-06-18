"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type RankingRow = {
  email: string;
  nombre: string;
  pais: string | null;
  puntos_totales: number;
};

const flags: Record<string, string> = {
  chile: "🇨🇱",
  brasil: "🇧🇷",
  brazil: "🇧🇷",
  ireland: "🇮🇪",
  irlanda: "🇮🇪",
  españa: "🇪🇸",
  spain: "🇪🇸",
  argentina: "🇦🇷",
  colombia: "🇨🇴",
  mexico: "🇲🇽",
  méxico: "🇲🇽",
  peru: "🇵🇪",
  perú: "🇵🇪",
  uruguay: "🇺🇾",
  usa: "🇺🇸",
  "estados unidos": "🇺🇸",
};

const referidos = [
  "Jorge Alejandro Chávez Moil",
  "Pedro Dariva Fidelis",
  "pedro dariva",
  "Leonardo Chávez Rivera",
  "Gonzalo Chávez Rivera",
];

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const partidosJugados = 24;

  useEffect(() => {
    const cargarRanking = async () => {
      const { data, error } = await supabase
        .from("ranking_automatico")
        .select("*")
        .order("puntos_totales", { ascending: false });

      if (!error && data) {
        setRanking(data as RankingRow[]);
      }

      setLoading(false);
    };

    cargarRanking();
  }, []);

  const medal = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return `#${position}`;
  };

  const countryFlag = (pais: string | null) => {
    if (!pais) return "🌍";
    return flags[pais.trim().toLowerCase()] || "🌍";
  };

  const tieneBono = (nombre: string) => {
    return referidos.some(
      (r) => r.trim().toLowerCase() === nombre.trim().toLowerCase()
    );
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <section className="text-center my-10">
          <h1 className="text-5xl font-extrabold mb-4">🏆 Ranking Oficial</h1>

          <p className="text-slate-300 text-lg">
            📊 Última actualización: después de los primeros {partidosJugados} partidos disputados.
          </p>
        </section>

        {loading && (
          <div className="bg-slate-800 rounded-xl p-6 text-center font-bold">
            Cargando ranking...
          </div>
        )}

        {!loading && ranking.length === 0 && (
          <div className="bg-slate-800 rounded-xl p-6 text-center font-bold">
            El ranking estará disponible próximamente.
          </div>
        )}

        {!loading && ranking.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-600 text-slate-300">
                  <th className="py-3">Pos</th>
                  <th className="py-3">Participante</th>
                  <th className="py-3 text-center">País</th>
                  <th className="py-3 text-right">Puntos</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((player, index) => (
                  <tr key={player.email} className="border-b border-slate-700">
                    <td className="py-3 font-bold text-yellow-400">
                      {medal(index + 1)}
                    </td>

                    <td className="py-3">
                      {player.nombre}
                      {tieneBono(player.nombre) && (
                        <span
                          className="ml-2 text-yellow-400"
                          title="Bonificación por referidos (+25 puntos)"
                        >
                          🎁
                        </span>
                      )}
                    </td>

                    <td className="py-3 text-center text-2xl">
                      {countryFlag(player.pais)}
                    </td>

                    <td className="py-3 text-right font-bold">
                      {player.puntos_totales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-slate-800 border border-yellow-500 rounded-xl p-5 text-center">
          <p className="font-bold text-yellow-400 text-lg mb-2">
            🎁 Bonificación por referidos
          </p>
          <p className="text-slate-200">
            El símbolo 🎁 indica que el participante recibió +25 puntos extra por invitar a dos personas que completaron su inscripción y pago.
          </p>
        </div>

        <div className="mt-6 bg-blue-700 rounded-xl p-5 text-center font-bold">
          📊 El ranking será actualizado después de cada fecha.
        </div>
      </div>
    </main>
  );
}