"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"es" | "en">("es");

  const isSpanish = language === "es";

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <button
          onClick={() => setLanguage(isSpanish ? "en" : "es")}
          className="bg-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-600 transition"
        >
          {isSpanish ? "English 🇬🇧" : "Español 🇪🇸"}
        </button>
      </div>

      <Image
        src="/logo-cdae.jpg"
        alt="CDA Estudiantes de Calbuco"
        width={210}
        height={210}
        className="mb-6 mt-2 rounded-lg"
      />

      <h1 className="text-5xl font-bold text-center mb-6">
        ⚽ CDA Estudiantes Mundial 2026
      </h1>

      <Image
        src="/logo-mundial-2026.png"
        alt="Logo Mundial FIFA 2026"
        width={230}
        height={160}
        className="mb-6"
      />

      <p className="text-yellow-400 font-bold text-lg text-center mb-6">
        🏆 {isSpanish ? "Premios hasta" : "Prizes up to"} €150 / $150.000 CLP
      </p>

      <p className="text-xl text-center max-w-3xl mb-8">
        {isSpanish
          ? "Vive la emoción del Mundial de Fútbol FIFA 2026. Predice los resultados del torneo que se disputará en Estados Unidos, Canadá y México, acumula puntos, sigue el ranking oficial y compite por premios en efectivo mientras apoyas al Club Deportivo Estudiantes de Calbuco."
          : "Experience the excitement of the FIFA World Cup 2026. Predict the results of the tournament hosted by the United States, Canada and Mexico, earn points, follow the official ranking and compete for cash prizes while supporting Club Deportivo Estudiantes de Calbuco."}
      </p>

      <div className="bg-slate-800 p-8 rounded-xl max-w-3xl w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          🏆 {isSpanish ? "Premios" : "Prizes"}
        </h2>

        <ul className="space-y-2 mb-6">
          <li>🥇 {isSpanish ? "1° Lugar" : "1st Place"}: $150.000 CLP / €150</li>
          <li>🥈 {isSpanish ? "2° Lugar" : "2nd Place"}: $50.000 CLP / €50</li>
          <li>🥉 {isSpanish ? "3° Lugar" : "3rd Place"}: $30.000 CLP / €30</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          🎯 {isSpanish ? "Sistema de Puntuación" : "Scoring System"}
        </h2>

        <ul className="space-y-2 mb-6">
          <li>
            ✅ {isSpanish ? "Resultado exacto = 5 puntos" : "Exact score = 5 points"}
          </li>
          <li>
            ✅{" "}
            {isSpanish
              ? "Ganador o empate correcto = 3 puntos"
              : "Correct winner or draw = 3 points"}
          </li>
          <li>
            ✅{" "}
            {isSpanish
              ? "Invita a 2 participantes = +25 puntos"
              : "Invite 2 participants = +25 points"}
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          💰 {isSpanish ? "Inscripción" : "Entry Fee"}
        </h2>

        <p className="mb-6">
          {isSpanish ? "Valor de inscripción:" : "Entry fee:"}
          <br />
          <strong>$10.000 CLP</strong> o <strong>€10</strong>
          <br />
          {isSpanish
            ? "Pago mediante transferencia bancaria."
            : "Payment by bank transfer."}
        </p>

        <h2 className="text-2xl font-bold mb-4">
          📋 {isSpanish ? "Reglas Generales" : "General Rules"}
        </h2>

        <ul className="space-y-2 mb-8">
          <li>
            •{" "}
            {isSpanish
              ? "Cada participante puede registrar una sola cuenta."
              : "Each participant may register only one account."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "El pago debe estar confirmado para participar."
              : "Payment must be confirmed in order to participate."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "Los pronósticos para cada fase deberán registrarse antes de una hora del inicio de dicha fase. Una vez cerrada la fase, no se podrán realizar modificaciones."
              : "Predictions for each stage must be submitted at least one hour before that stage begins. Once the stage is closed, predictions cannot be modified."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "El ranking se actualizará al finalizar cada fecha de la Fase de Grupos y posteriormente al término de cada ronda eliminatoria: Dieciseisavos de Final, Octavos de Final, Cuartos de Final, Semifinales y Final."
              : "The ranking will be updated after each matchday of the Group Stage and then after each knockout round: Round of 32, Round of 16, Quarter-finals, Semi-finals and Final."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "En caso de empate en la clasificación final, se utilizará el número de resultados exactos acertados como criterio de desempate."
              : "In case of a tie in the final ranking, the number of exact scores predicted correctly will be used as the tiebreaker."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "La participación implica la aceptación de todas las reglas del concurso."
              : "Participation implies acceptance of all contest rules."}
          </li>
          <li>
            •{" "}
            {isSpanish
              ? "La organización resolverá cualquier situación no contemplada en las reglas."
              : "The organization will resolve any situation not covered by these rules."}
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          🎮 {isSpanish ? "¿Cómo se juega?" : "How to Play"}
        </h2>

        <ol className="space-y-2 mb-8 list-decimal list-inside">
          <li>
            {isSpanish
              ? "Inscríbete realizando el pago correspondiente."
              : "Register by completing the required payment."}
          </li>
          <li>
            {isSpanish
              ? "Registra tus pronósticos antes del cierre de cada fase."
              : "Submit your predictions before each stage closes."}
          </li>
          <li>
            {isSpanish
              ? "Acumula puntos acertando resultados o ganadores."
              : "Earn points by predicting exact scores or winners."}
          </li>
          <li>
            {isSpanish
              ? "Sigue el ranking oficial durante todo el Mundial."
              : "Follow the official ranking throughout the World Cup."}
          </li>
          <li>
            {isSpanish
              ? "Compite por los premios finales."
              : "Compete for the final prizes."}
          </li>
        </ol>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition">
            🚀 {isSpanish ? "Participar Ahora" : "Join Now"}
          </button>

          <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition">
            🏆 {isSpanish ? "Ver Ranking Oficial" : "View Official Ranking"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        {isSpanish
          ? "Organiza: Club Deportivo Estudiantes de Calbuco"
          : "Organized by: Club Deportivo Estudiantes de Calbuco"}
      </p>
    </main>
  );
}