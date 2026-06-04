"use client";

import { useState } from "react";

export default function ParticiparPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    pais: "",
    whatsapp: "",
    codigo_referido: "",
  });

  const isSpanish = language === "es";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registrationMessage = encodeURIComponent(
    isSpanish
      ? `Hola, quiero inscribirme al CDA Estudiantes Mundial 2026.

Nombre: ${form.nombre}
Correo: ${form.email}
País: ${form.pais}
WhatsApp: ${form.whatsapp}
Código referido: ${form.codigo_referido || "No informado"}

Adjunto mi comprobante de pago.`
      : `Hello, I want to register for CDA Estudiantes World Cup 2026.

Name: ${form.nombre}
Email: ${form.email}
Country: ${form.pais}
WhatsApp: ${form.whatsapp}
Referral code: ${form.codigo_referido || "Not provided"}

I am attaching my proof of payment.`
  );

  const whatsappRegistrationLink = isSpanish
    ? `https://wa.me/56998243007?text=${registrationMessage}`
    : `https://wa.me/353831426585?text=${registrationMessage}`;

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <a href="/" className="text-blue-300 hover:underline">
            ← {isSpanish ? "Volver al inicio" : "Back to home"}
          </a>

          <div className="flex rounded-xl border border-slate-500 overflow-hidden">
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`px-4 py-2 font-bold ${
                isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇪🇸 Español
            </button>

            <button
              type="button"
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
            <img src="/logo-cdae.jpg" alt="CDAE" className="h-40 rounded-xl bg-white" />
            <div className="hidden md:block h-36 w-px bg-slate-500" />
            <img src="/logo-mundial-2026.jpg" alt="Mundial 2026" className="h-40 rounded-xl bg-white p-3" />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">
            🚀 {isSpanish ? "Participar" : "Join"}
          </h1>

          <p className="text-slate-300 text-lg">
            {isSpanish
              ? "Completa tus datos y envía tu inscripción junto al comprobante por WhatsApp."
              : "Complete your details and send your registration with proof of payment via WhatsApp."}
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

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "Nombre completo" : "Full name"}
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "Correo electrónico" : "Email address"}
              />

              <input
                name="pais"
                value={form.pais}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder={isSpanish ? "País" : "Country"}
              />

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white text-black placeholder:text-slate-500"
                placeholder="WhatsApp"
              />

              <input
                name="codigo_referido"
                value={form.codigo_referido}
                onChange={handleChange}
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
                <h2 className="text-2xl font-bold mb-4">🏦 BancoEstado Chile</h2>
                <p><strong>Titular:</strong> Gonzalo Chavez Rivera</p>
                <p><strong>RUT:</strong> 17.034.357-3</p>
                <p><strong>Tipo de cuenta:</strong> Cuenta Vista</p>
                <p><strong>N° Cuenta:</strong> 17034357</p>
                <p><strong>Correo:</strong> profegonzachrivera@gmail.com</p>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-600">
                <h2 className="text-2xl font-bold mb-4">💳 Revolut</h2>
                <p><strong>Titular:</strong> Gonzalo Leandro Chavez Rivera</p>
                <p><strong>IBAN:</strong> IE02 REVO 9903 6088 2519 79</p>
                <p><strong>Correo:</strong> profegonzachrivera@gmail.com</p>
              </div>
            </div>

            <div className="bg-yellow-400 text-black rounded-xl p-5 font-bold text-center">
              ⚠️{" "}
              {isSpanish
                ? "La inscripción quedará confirmada únicamente después de verificar el pago correspondiente."
                : "Registration will only be confirmed after the corresponding payment has been verified."}
            </div>

            <a
              href={whatsappRegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full bg-yellow-400 text-black px-6 py-5 rounded-xl font-extrabold text-xl hover:bg-yellow-300 active:scale-[0.99]"
            >
              🚀{" "}
              {isSpanish
                ? "Enviar inscripción y comprobante"
                : "Send registration and proof"}
            </a>

            <p className="text-center text-slate-300">
              {isSpanish
                ? "Al presionar el botón se abrirá WhatsApp con tus datos. Luego adjunta la imagen del comprobante."
                : "When you press the button, WhatsApp will open with your details. Then attach your proof of payment image."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}