"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const isSpanish = language === "es";

  useEffect(() => {
    const registrationDeadline = new Date("2026-06-11T14:00:00-04:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = registrationDeadline.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end mb-6">
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

        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <Image
              src="/logo-cdae.jpg"
              alt="CDA Estudiantes de Calbuco"
              width={260}
              height={260}
              className="rounded-xl"
            />

            <div className="hidden md:block h-52 w-px bg-slate-500" />

            <Image
              src="/logo-mundial-2026.jpg"
              alt="Logo Mundial FIFA 2026"
              width={260}
              height={260}
              className="rounded-xl bg-white p-4"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            ⚽ CDA Estudiantes Mundial 2026
          </h1>

          <p className="text-yellow-400 text-2xl font-extrabold mb-6">
            🏆 {isSpanish ? "Premios hasta" : "Prizes up to"} €150 / $150.000 CLP
          </p>

          <p className="max-w-3xl text-lg md:text-xl leading-relaxed mb-8">
            {isSpanish
              ? "Vive la emoción del Mundial de Fútbol FIFA 2026. Predice los resultados del torneo que se disputará en Estados Unidos, Canadá y México, acumula puntos, sigue el ranking oficial y compite por premios en efectivo mientras apoyas al Club Deportivo Estudiantes de Calbuco."
              : "Experience the excitement of the FIFA World Cup 2026. Predict the results of the tournament hosted by the United States, Canada and Mexico, earn points, follow the official ranking and compete for cash prizes while supporting Club Deportivo Estudiantes de Calbuco."}
          </p>

          <div className="grid md:grid-cols-3 gap-4 w-full mb-8">
            <div className="rounded-xl bg-slate-800 border border-slate-600 p-4 font-bold">
              📅 {isSpanish ? "Inicio del Mundial" : "World Cup starts"}:
              <br />
              <span className="text-yellow-400">11 de junio de 2026</span>
            </div>

            <div className="rounded-xl bg-slate-800 border border-slate-600 p-4 font-bold">
              🔥 {isSpanish ? "Inscripciones abiertas" : "Registration open"}
              <br />
              <span className="text-green-400">
                {isSpanish ? "Hasta el 11 de junio" : "Until June 11"}
              </span>
            </div>

            <div className="rounded-xl bg-slate-800 border border-slate-600 p-4 font-bold">
              📊 {isSpanish ? "Ranking oficial" : "Official ranking"}
              <br />
              <span className="text-blue-400">
                {isSpanish ? "Durante todo el torneo" : "Throughout the tournament"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-yellow-400 text-black p-6 mb-10 w-full max-w-3xl shadow-xl">
            <h2 className="text-2xl font-extrabold mb-4">
              ⏳ {isSpanish ? "Cierre de inscripciones" : "Registration closes"}
            </h2>

            <p className="font-bold mb-4">
              {isSpanish
                ? "Jueves 11 de junio de 2026 a las 14:00 hrs Chile"
                : "Thursday, June 11, 2026 at 2:00 PM Chile time"}
            </p>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-3xl font-extrabold">{timeLeft.days}</p>
                <p className="text-sm">{isSpanish ? "Días" : "Days"}</p>
              </div>

              <div>
                <p className="text-3xl font-extrabold">{timeLeft.hours}</p>
                <p className="text-sm">{isSpanish ? "Horas" : "Hours"}</p>
              </div>

              <div>
                <p className="text-3xl font-extrabold">{timeLeft.minutes}</p>
                <p className="text-sm">{isSpanish ? "Min" : "Min"}</p>
              </div>

              <div>
                <p className="text-3xl font-extrabold">{timeLeft.seconds}</p>
                <p className="text-sm">{isSpanish ? "Seg" : "Sec"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-600/40 bg-slate-800/70 p-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 border-b border-slate-600/40 pb-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                🏆 {isSpanish ? "Premios" : "Prizes"}
              </h2>
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
                <li>{isSpanish ? "El ranking se actualizará al finalizar cada fecha de la Fase de Grupos y posteriormente al término de cada ronda eliminatoria." : "The ranking will be updated after each Group Stage matchday and then after each knockout round."}</li>
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

              <div className="grid gap-4 mt-10">
                <button className="bg-yellow-400 text-black font-extrabold py-5 rounded-xl hover:bg-yellow-300 text-xl">
                  🚀 {isSpanish ? "Participar Ahora" : "Join Now"}
                </button>

                <button className="bg-blue-600 text-white font-extrabold py-5 rounded-xl hover:bg-blue-500 text-xl">
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