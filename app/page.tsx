"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const isSpanish = language === "es";

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(isSpanish ? "en" : "es")}
            className="rounded-xl border border-blue-400/40 bg-slate-800 px-5 py-3 font-bold hover:bg-slate-700"
          >
            {isSpanish ? "🇬🇧 English" : "🇪🇸 Español"}
          </button>
        </div>

        <section className="flex flex-col items-center text-center">
          <Image
            src="/logo-cdae.jpg"
            alt="CDA Estudiantes de Calbuco"
            width={260}
            height={260}
            className="rounded-xl mb-8"
          />

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            ⚽ CDA Estudiantes Mundial 2026
          </h1>

          <Image
            src="/logo-mundial-2026.jpg"
            alt="Logo Mundial FIFA 2026"
            width={240}
            height={180}
            className="mb-6"
          />

          <p className="text-yellow-400 text-2xl font-extrabold mb-6">
            🏆 {isSpanish ? "Premios hasta" : "Prizes up to"} €150 / $150.000 CLP
          </p>

          <p className="max-w-3xl text-lg md:text-xl leading-relaxed mb-10">
            {isSpanish
              ? "Vive la emoción del Mundial de Fútbol FIFA 2026. Predice los resultados del torneo que se disputará en Estados Unidos, Canadá y México, acumula puntos, sigue el ranking oficial y compite por premios en efectivo mientras apoyas al Club Deportivo Estudiantes de Calbuco."
              : "Experience the excitement of the FIFA World Cup 2026. Predict the results of the tournament hosted by the United States, Canada and Mexico, earn points, follow the official ranking and compete for cash prizes while supporting Club Deportivo Estudiantes de Calbuco."}
          </p>
        </section>

        <section className="rounded-3xl border border-slate-600/40 bg-slate-800/70 p-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 border-b border-slate-600/40 pb-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">🏆 {isSpanish ? "Premios" : "Prizes"}</h2>
              <p>🥇 {isSpanish ? "1° Lugar" : "1st Place"}: $150.000 CLP / €150</p>
              <p>🥈 {isSpanish ? "2° Lugar" : "2nd Place"}: $50.000 CLP / €50</p>
              <p>🥉 {isSpanish ? "3° Lugar" : "3rd Place"}: $30.000 CLP / €30</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                🎯 {isSpanish ? "Puntuación" : "Scoring"}
              </h2>
              <p>✅ {isSpanish ? "Resultado exacto = 5 puntos" : "Exact score = 5 points"}</p>
              <p>✅ {isSpanish ? "Ganador o empate correcto = 3 puntos" : "Correct winner or draw = 3 points"}</p>
              <p>✅ {isSpanish ? "Invita a 2 participantes = +25 puntos" : "Invite 2 participants = +25 points"}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                💰 {isSpanish ? "Inscripción" : "Entry Fee"}
              </h2>
              <p>{isSpanish ? "Valor de inscripción:" : "Entry fee:"}</p>
              <p className="text-2xl font-extrabold">$10.000 CLP o €10</p>
              <p>{isSpanish ? "Pago mediante transferencia bancaria." : "Payment by bank transfer."}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                📋 {isSpanish ? "Reglas Generales" : "General Rules"}
              </h2>

              <ul className="space-y-3 list-disc list-inside">
                <li>{isSpanish ? "Cada participante puede registrar una sola cuenta." : "Each participant may register only one account."}</li>
                <li>{isSpanish ? "El pago debe estar confirmado para participar." : "Payment must be confirmed in order to participate."}</li>
                <li>{isSpanish ? "Los pronósticos para cada fase deberán registrarse antes de una hora del inicio de dicha fase. Una vez cerrada la fase, no se podrán realizar modificaciones." : "Predictions for each stage must be submitted at least one hour before that stage begins. Once the stage is closed, predictions cannot be modified."}</li>
                <li>{isSpanish ? "El ranking se actualizará al finalizar cada fecha de la Fase de Grupos y posteriormente al término de cada ronda eliminatoria: Dieciseisavos de Final, Octavos de Final, Cuartos de Final, Semifinales y Final." : "The ranking will be updated after each Group Stage matchday and then after each knockout round."}</li>
                <li>{isSpanish ? "En caso de empate final, se utilizará el número de resultados exactos acertados como criterio de desempate." : "In case of a final tie, exact score predictions will be used as the tiebreaker."}</li>
                <li>{isSpanish ? "La participación implica la aceptación de todas las reglas del concurso." : "Participation implies acceptance of all contest rules."}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                🎮 {isSpanish ? "¿Cómo se juega?" : "How to Play"}
              </h2>

              <ol className="space-y-4">
                <li>1️⃣ {isSpanish ? "Inscríbete realizando el pago correspondiente." : "Register by completing the required payment."}</li>
                <li>2️⃣ {isSpanish ? "Registra tus pronósticos antes del cierre de cada fase." : "Submit your predictions before each stage closes."}</li>
                <li>3️⃣ {isSpanish ? "Acumula puntos acertando resultados o ganadores." : "Earn points by predicting exact scores or winners."}</li>
                <li>4️⃣ {isSpanish ? "Sigue el ranking oficial durante todo el Mundial." : "Follow the official ranking throughout the World Cup."}</li>
                <li>5️⃣ {isSpanish ? "Compite por los premios finales." : "Compete for the final prizes."}</li>
              </ol>

              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <button className="bg-yellow-400 text-black font-extrabold py-4 rounded-xl hover:bg-yellow-300">
                  🚀 {isSpanish ? "Participar Ahora" : "Join Now"}
                </button>

                <button className="bg-blue-600 text-white font-extrabold py-4 rounded-xl hover:bg-blue-500">
                  🏆 {isSpanish ? "Ver Ranking Oficial" : "View Official Ranking"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-slate-400 mt-8">
          {isSpanish
            ? "Organiza: Club Deportivo Estudiantes de Calbuco"
            : "Organized by: Club Deportivo Estudiantes de Calbuco"}
        </p>
      </div>
    </main>
  );
}