"use client";

import { useState } from "react";

export default function ParticiparPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const isSpanish = language === "es";

  const whatsappChile =
    "https://wa.me/56998243007?text=Hola,%20acabo%20de%20realizar%20el%20pago%20de%20inscripci%C3%B3n%20para%20CDA%20Estudiantes%20Mundial%202026.";
  const whatsappInternational =
    "https://wa.me/353831426585?text=Hello,%20I%20have%20just%20made%20the%20registration%20payment%20for%20CDA%20Estudiantes%20World%20Cup%202026.";

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <a href="/" className="text-blue-300 hover:underline">
            ← {isSpanish ? "Volver al inicio" : "Back to home"}
          </a>

          <div className="flex rounded-xl border border-slate-500 overflow-hidden">
            <button
              onClick={() => setLanguage("es")}
              className={`px-4 py-2 font-bold ${
                isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇪🇸 Español
            </button>

            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 font-bold ${
                !isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <section className="text-center mb-10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <img
              src="/logo-cdae.jpg"
              alt="CDA Estudiantes de Calbuco"
              className="h-40 rounded-xl bg-white"
            />

            <div className="hidden md:block h-36 w-px bg-slate-500" />

            <img
              src="/logo-mundial-2026.jpg"
              alt="Mundial FIFA 2026"
              className="h-40 rounded-xl bg-white p-3"
            />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">
            🚀 {isSpanish ? "Participar" : "Join"}
          </h1>

          <p className="text-slate-300 text-lg">
            {isSpanish
              ? "Inscríbete, envía tu comprobante y comienza a competir."
              : "Register, send your proof of payment and start competing."}
          </p>
        </section>

        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="grid gap-5">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black rounded-xl p-6 text-center shadow-xl">
              <h2 className="text-3xl font-extrabold">
                🇨🇱 $10.000 CLP | 🌍 €10
              </h2>

              <p className="mt-3 font-semibold">
                {isSpanish
                  ? "Inscripción oficial CDA Estudiantes Mundial 2026"
                  : "Official CDA Estudiantes World Cup 2026 Registration"}
              </p>
            </div>

            <div className="bg-red-600 rounded-xl p-5 text-center font-bold text-lg shadow-lg">
              ⏰{" "}
              {isSpanish
                ? "Inscripciones abiertas hasta el jueves 11 de junio de 2026 a las 14:00 hrs (Chile)"
                : "Registration closes on Thursday, June 11, 2026 at 14:00 Chile time"}
            </div>

            <div className="bg-blue-700 rounded-xl p-5 text-center shadow-lg">
              <h3 className="font-bold text-xl mb-2">
                🎁 {isSpanish ? "Programa de Referidos" : "Referral Program"}
              </h3>

              <p>
                {isSpanish
                  ? "Invita a 2 amigos que completen su inscripción y recibe +25 puntos extra en el ranking oficial."
                  : "Invite 2 friends who complete their registration and receive +25 bonus points in the official ranking."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "Nombre completo" : "Full name"}
              />

              <input
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "Correo electrónico" : "Email address"}
              />

              <input
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "País" : "Country"}
              />

              <input
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder="WhatsApp"
              />

              <input
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500 md:col-span-2"
                placeholder={
                  isSpanish
                    ? "Código de quien te invitó (opcional)"
                    : "Invitation code (optional)"
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-600">
                <h2 className="text-2xl font-bold mb-4">
                  🏦 BancoEstado Chile
                </h2>

                <p>
                  <strong>{isSpanish ? "Titular" : "Account holder"}:</strong>{" "}
                  Gonzalo Chavez Rivera
                </p>
                <p>
                  <strong>RUT:</strong> 17.034.357-3
                </p>
                <p>
                  <strong>{isSpanish ? "Tipo de cuenta" : "Account type"}:</strong>{" "}
                  Cuenta Vista
                </p>
                <p>
                  <strong>{isSpanish ? "N° Cuenta" : "Account number"}:</strong>{" "}
                  17034357
                </p>
                <p>
                  <strong>{isSpanish ? "Correo" : "Email"}:</strong>{" "}
                  profegonzachrivera@gmail.com
                </p>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-600">
                <h2 className="text-2xl font-bold mb-4">💳 Revolut</h2>

                <p>
                  <strong>{isSpanish ? "Titular" : "Account holder"}:</strong>{" "}
                  Gonzalo Leandro Chavez Rivera
                </p>
                <p>
                  <strong>IBAN:</strong> IE02 REVO 9903 6088 2519 79
                </p>
                <p>
                  <strong>{isSpanish ? "Correo" : "Email"}:</strong>{" "}
                  profegonzachrivera@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-600">
              <h2 className="text-2xl font-bold mb-4">
                📲 {isSpanish ? "Envío de comprobantes" : "Proof of payment"}
              </h2>

              <p className="text-slate-300 mb-5">
                {isSpanish
                  ? "Después de realizar la transferencia, envía el comprobante por WhatsApp para confirmar tu inscripción."
                  : "After making the transfer, send your proof of payment via WhatsApp to confirm your registration."}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={whatsappChile}
                  target="_blank"
                  className="bg-green-500 text-black text-center font-extrabold py-4 rounded-xl hover:bg-green-400"
                >
                  🇨🇱{" "}
                  {isSpanish
                    ? "Enviar comprobante Chile"
                    : "Send proof - Chile"}
                  <br />
                  +56 9 9824 3007
                </a>

                <a
                  href={whatsappInternational}
                  target="_blank"
                  className="bg-green-500 text-black text-center font-extrabold py-4 rounded-xl hover:bg-green-400"
                >
                  🌍{" "}
                  {isSpanish
                    ? "Enviar comprobante internacional"
                    : "Send proof - International"}
                  <br />
                  +353 83 142 6585
                </a>
              </div>
            </div>

            <div className="bg-yellow-400 text-black rounded-xl p-5 font-bold">
              ⚠️{" "}
              {isSpanish
                ? "La inscripción quedará confirmada únicamente después de verificar el pago correspondiente."
                : "Registration will only be confirmed after the corresponding payment has been verified."}
            </div>

            <button className="bg-yellow-400 text-black px-6 py-4 rounded-xl font-extrabold text-lg hover:bg-yellow-300">
              {isSpanish ? "Enviar inscripción" : "Submit registration"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}