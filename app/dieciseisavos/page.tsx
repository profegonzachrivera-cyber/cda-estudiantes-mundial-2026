"use client";

import { useState } from "react";

export default function DieciseisavosPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const isSpanish = language === "es";

  const partidos = [
    {
      numero: 73,
      fechaEs: "Domingo 28 junio",
      fechaEn: "Sunday, June 28",
      horaChile: "15:00 hrs Chile",
      horaIrlanda: "20:00 hrs Ireland",
      localEs: "Sudáfrica",
      localEn: "South Africa",
      banderaLocal: "🇿🇦",
      visitanteEs: "Canadá",
      visitanteEn: "Canada",
      banderaVisitante: "🇨🇦",
    },
    {
      numero: 74,
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "13:00 hrs Chile",
      horaIrlanda: "18:00 hrs Ireland",
      localEs: "Brasil",
      localEn: "Brazil",
      banderaLocal: "🇧🇷",
      visitanteEs: "Japón",
      visitanteEn: "Japan",
      banderaVisitante: "🇯🇵",
    },
    {
      numero: 75,
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "16:30 hrs Chile",
      horaIrlanda: "21:30 hrs Ireland",
      localEs: "Alemania",
      localEn: "Germany",
      banderaLocal: "🇩🇪",
      visitanteEs: "Paraguay",
      visitanteEn: "Paraguay",
      banderaVisitante: "🇵🇾",
    },
    {
      numero: 76,
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "21:00 hrs Chile",
      horaIrlanda: "02:00 hrs Ireland",
      localEs: "Países Bajos",
      localEn: "Netherlands",
      banderaLocal: "🇳🇱",
      visitanteEs: "Marruecos",
      visitanteEn: "Morocco",
      banderaVisitante: "🇲🇦",
    },
    {
      numero: 77,
      fechaEs: "Martes 30 junio",
      fechaEn: "Tuesday, June 30",
      horaChile: "13:00 hrs Chile",
      horaIrlanda: "18:00 hrs Ireland",
      localEs: "Costa de Marfil",
      localEn: "Ivory Coast",
      banderaLocal: "🇨🇮",
      visitanteEs: "Noruega",
      visitanteEn: "Norway",
      banderaVisitante: "🇳🇴",
    },
    {
      numero: 78,
      fechaEs: "Martes 30 junio",
      fechaEn: "Tuesday, June 30",
      horaChile: "17:00 hrs Chile",
      horaIrlanda: "22:00 hrs Ireland",
      localEs: "Francia",
      localEn: "France",
      banderaLocal: "🇫🇷",
      visitanteEs: "Suecia",
      visitanteEn: "Sweden",
      banderaVisitante: "🇸🇪",
    },
  ];

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← {isSpanish ? "Volver al inicio" : "Back to home"}
        </a>

        <div className="flex justify-end my-6">
          <div className="flex rounded-xl border border-slate-500 overflow-hidden">
            <button
              onClick={() => setLanguage("es")}
              className={`px-5 py-3 font-bold ${
                isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇪🇸 Español
            </button>

            <button
              onClick={() => setLanguage("en")}
              className={`px-5 py-3 font-bold ${
                !isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <section className="text-center my-10">
          <h1 className="text-5xl font-extrabold mb-4">
            🏆 {isSpanish ? "16avos de Final" : "Round of 32"}
          </h1>

          <p className="text-slate-300 text-lg">
            {isSpanish
              ? "Cruces confirmados de la fase eliminatoria del CDA Estudiantes Mundial 2026."
              : "Confirmed knockout stage matches for the CDA Estudiantes World Cup 2026."}
          </p>
<div className="mt-6 bg-yellow-500/10 border border-yellow-500 rounded-2xl p-5 max-w-3xl mx-auto">
  <p className="text-yellow-400 font-extrabold mb-2">
    ⏰ {isSpanish
      ? "Cada pronóstico se cerrará una hora antes del inicio de su partido."
      : "Each prediction will close one hour before kick-off."}
  </p>

  <p className="text-slate-200 font-bold">
    ⚠️ {isSpanish
      ? "Importante: el pronóstico considera solo el resultado al término del tiempo reglamentario. No se consideran alargue ni penales."
      : "Important: predictions only count the result at the end of regular time. Extra time and penalties are not included."}
  </p>
</div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {partidos.map((partido) => (
            <div
              key={partido.numero}
              className="bg-slate-800 border border-slate-600 rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-yellow-400 font-extrabold mb-2">
                {isSpanish ? "Partido" : "Match"} {partido.numero}
              </h2>

              <p className="text-slate-300 mb-1">
                📅 {isSpanish ? partido.fechaEs : partido.fechaEn}
              </p>

              <p className="text-slate-300 mb-5">
                🕒 {isSpanish ? partido.horaChile : partido.horaIrlanda}
              </p>

              <div className="bg-slate-900 rounded-xl p-5">
                <div className="grid grid-cols-[1fr_50px_1fr] items-center gap-3">
                  <div className="text-right font-bold text-xl">
                    <span className="mr-2">{partido.banderaLocal}</span>
                    {isSpanish ? partido.localEs : partido.localEn}
                  </div>

                  <div className="text-center text-slate-400 font-bold">
                    vs
                  </div>

                  <div className="font-bold text-xl">
                    <span className="mr-2">{partido.banderaVisitante}</span>
                    {isSpanish ? partido.visitanteEs : partido.visitanteEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-700 rounded-xl p-5 text-center font-bold">
          {isSpanish
            ? "⚽ Los próximos cruces se irán agregando a medida que se confirmen."
            : "⚽ The next matches will be added as soon as they are confirmed."}
        </div>
      </div>
    </main>
  );
}