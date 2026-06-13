"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Match = {
  id: number;
  group: string;
  dateEs: string;
  dateEn: string;
  homeEs: string;
  awayEs: string;
  homeEn: string;
  awayEn: string;
  homeFlag: string;
  awayFlag: string;
};

const matches: Match[] = [
  { id: 3, group: "B", dateEs: "12 junio", dateEn: "June 12", homeEs: "Canadá", awayEs: "Bosnia y Herzegovina", homeEn: "Canada", awayEn: "Bosnia and Herzegovina", homeFlag: "ca", awayFlag: "ba" },
  { id: 4, group: "D", dateEs: "12 junio", dateEn: "June 12", homeEs: "Estados Unidos", awayEs: "Paraguay", homeEn: "United States", awayEn: "Paraguay", homeFlag: "us", awayFlag: "py" },
  { id: 5, group: "B", dateEs: "13 junio", dateEn: "June 13", homeEs: "Qatar", awayEs: "Suiza", homeEn: "Qatar", awayEn: "Switzerland", homeFlag: "qa", awayFlag: "ch" },
  { id: 6, group: "C", dateEs: "13 junio", dateEn: "June 13", homeEs: "Brasil", awayEs: "Marruecos", homeEn: "Brazil", awayEn: "Morocco", homeFlag: "br", awayFlag: "ma" },
  { id: 7, group: "C", dateEs: "13 junio", dateEn: "June 13", homeEs: "Haití", awayEs: "Escocia", homeEn: "Haiti", awayEn: "Scotland", homeFlag: "ht", awayFlag: "gb-sct" },
  { id: 8, group: "D", dateEs: "14 junio", dateEn: "June 14", homeEs: "Australia", awayEs: "Turquía", homeEn: "Australia", awayEn: "Turkey", homeFlag: "au", awayFlag: "tr" },
  { id: 9, group: "E", dateEs: "14 junio", dateEn: "June 14", homeEs: "Alemania", awayEs: "Curazao", homeEn: "Germany", awayEn: "Curaçao", homeFlag: "de", awayFlag: "cw" },
  { id: 10, group: "F", dateEs: "14 junio", dateEn: "June 14", homeEs: "Países Bajos", awayEs: "Japón", homeEn: "Netherlands", awayEn: "Japan", homeFlag: "nl", awayFlag: "jp" },
  { id: 11, group: "E", dateEs: "14 junio", dateEn: "June 14", homeEs: "Costa de Marfil", awayEs: "Ecuador", homeEn: "Ivory Coast", awayEn: "Ecuador", homeFlag: "ci", awayFlag: "ec" },
  { id: 12, group: "F", dateEs: "14 junio", dateEn: "June 14", homeEs: "Suecia", awayEs: "Túnez", homeEn: "Sweden", awayEn: "Tunisia", homeFlag: "se", awayFlag: "tn" },
  { id: 13, group: "H", dateEs: "15 junio", dateEn: "June 15", homeEs: "España", awayEs: "Cabo Verde", homeEn: "Spain", awayEn: "Cape Verde", homeFlag: "es", awayFlag: "cv" },
  { id: 14, group: "G", dateEs: "15 junio", dateEn: "June 15", homeEs: "Bélgica", awayEs: "Egipto", homeEn: "Belgium", awayEn: "Egypt", homeFlag: "be", awayFlag: "eg" },
  { id: 15, group: "H", dateEs: "15 junio", dateEn: "June 15", homeEs: "Arabia Saudita", awayEs: "Uruguay", homeEn: "Saudi Arabia", awayEn: "Uruguay", homeFlag: "sa", awayFlag: "uy" },
  { id: 16, group: "G", dateEs: "15 junio", dateEn: "June 15", homeEs: "Irán", awayEs: "Nueva Zelanda", homeEn: "Iran", awayEn: "New Zealand", homeFlag: "ir", awayFlag: "nz" },
  { id: 17, group: "I", dateEs: "16 junio", dateEn: "June 16", homeEs: "Francia", awayEs: "Senegal", homeEn: "France", awayEn: "Senegal", homeFlag: "fr", awayFlag: "sn" },
  { id: 18, group: "I", dateEs: "16 junio", dateEn: "June 16", homeEs: "Irak", awayEs: "Noruega", homeEn: "Iraq", awayEn: "Norway", homeFlag: "iq", awayFlag: "no" },
  { id: 19, group: "J", dateEs: "16 junio", dateEn: "June 16", homeEs: "Argentina", awayEs: "Argelia", homeEn: "Argentina", awayEn: "Algeria", homeFlag: "ar", awayFlag: "dz" },
  { id: 20, group: "J", dateEs: "17 junio", dateEn: "June 17", homeEs: "Austria", awayEs: "Jordania", homeEn: "Austria", awayEn: "Jordan", homeFlag: "at", awayFlag: "jo" },
  { id: 21, group: "K", dateEs: "17 junio", dateEn: "June 17", homeEs: "Portugal", awayEs: "RD Congo", homeEn: "Portugal", awayEn: "DR Congo", homeFlag: "pt", awayFlag: "cd" },
  { id: 22, group: "L", dateEs: "17 junio", dateEn: "June 17", homeEs: "Inglaterra", awayEs: "Croacia", homeEn: "England", awayEn: "Croatia", homeFlag: "gb-eng", awayFlag: "hr" },
  { id: 23, group: "L", dateEs: "17 junio", dateEn: "June 17", homeEs: "Ghana", awayEs: "Panamá", homeEn: "Ghana", awayEn: "Panama", homeFlag: "gh", awayFlag: "pa" },
  { id: 24, group: "K", dateEs: "17 junio", dateEn: "June 17", homeEs: "Uzbekistán", awayEs: "Colombia", homeEn: "Uzbekistan", awayEn: "Colombia", homeFlag: "uz", awayFlag: "co" },
];

export default function CorreccionPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [form, setForm] = useState({ nombre: "", email: "", whatsapp: "" });
  const [predictions, setPredictions] = useState<Record<number, { local: string; visita: string }>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const isSpanish = language === "es";

  const handlePrediction = (id: number, field: "local" | "visita", value: string) => {
    setPredictions({
      ...predictions,
      [id]: { ...predictions[id], [field]: value },
    });
  };

  const guardarCorrecciones = async () => {
    setMessage("");

    if (!form.nombre || !form.email) {
      setMessage(isSpanish ? "Completa nombre y correo." : "Please complete name and email.");
      return;
    }

    const rows = matches
      .filter(
        (m) =>
          predictions[m.id]?.local !== undefined &&
          predictions[m.id]?.visita !== undefined &&
          predictions[m.id]?.local !== "" &&
          predictions[m.id]?.visita !== ""
      )
      .map((m) => ({
        nombre: form.nombre,
        email: form.email.trim().toLowerCase(),
        whatsapp: form.whatsapp,
        partido_id: m.id,
        equipo_local: isSpanish ? m.homeEs : m.homeEn,
        equipo_visitante: isSpanish ? m.awayEs : m.awayEn,
        grupo: m.group,
        fecha: isSpanish ? m.dateEs : m.dateEn,
        goles_local: Number(predictions[m.id].local),
        goles_visitante: Number(predictions[m.id].visita),
      }));

    if (rows.length === 0) {
      setMessage(isSpanish ? "Debes completar al menos un partido." : "You must complete at least one match.");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("correcciones_pronosticos").insert(rows);
    setSaving(false);

    if (error) {
      console.error(error);
      setMessage(isSpanish ? "No se pudieron guardar las correcciones." : "Corrections could not be saved.");
      return;
    }

    setMessage(isSpanish ? `✅ Se enviaron ${rows.length} correcciones correctamente.` : `✅ ${rows.length} corrections submitted successfully.`);
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <a href="/" className="text-blue-300 hover:underline">
            ← {isSpanish ? "Volver al inicio" : "Back to home"}
          </a>

          <div className="flex rounded-xl border border-slate-500 overflow-hidden">
            <button type="button" onClick={() => setLanguage("es")} className={`px-4 py-2 font-bold ${isSpanish ? "bg-blue-600" : "bg-slate-800"}`}>
              🇪🇸 Español
            </button>
            <button type="button" onClick={() => setLanguage("en")} className={`px-4 py-2 font-bold ${!isSpanish ? "bg-blue-600" : "bg-slate-800"}`}>
              🇬🇧 English
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">
          ✍️ {isSpanish ? "Corrección de Pronósticos" : "Prediction Correction"}
        </h1>

        <p className="text-slate-300 mb-6">
          {isSpanish
            ? "Corrección excepcional solo para completar partidos pendientes del 3 al 24. Los partidos 1 y 2 ya están cerrados."
            : "Exceptional correction only to complete pending matches from 3 to 24. Matches 1 and 2 are already closed."}
        </p>

        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="p-4 rounded-xl bg-white text-black" placeholder={isSpanish ? "Nombre completo" : "Full name"} />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="p-4 rounded-xl bg-white text-black" placeholder={isSpanish ? "Correo" : "Email"} />
            <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="p-4 rounded-xl bg-white text-black" placeholder="WhatsApp" />
          </div>
        </div>

        <div className="grid gap-4">
          {matches.map((m) => (
            <div key={m.id} className="bg-slate-800 rounded-xl p-4">
              <div className="text-sm text-yellow-400 font-bold mb-3">
                {isSpanish ? "Partido" : "Match"} {m.id} · {isSpanish ? "Grupo" : "Group"} {m.group} · {isSpanish ? m.dateEs : m.dateEn}
              </div>

              <div className="grid grid-cols-[1fr_80px_20px_80px_1fr] items-center gap-3">
                <div className="flex items-center justify-end gap-2 font-bold text-right">
                  <span>{isSpanish ? m.homeEs : m.homeEn}</span>
                  <img src={`https://flagcdn.com/w40/${m.homeFlag}.png`} alt="" className="h-6 rounded" />
                </div>

                <input type="number" min="0" value={predictions[m.id]?.local ?? ""} onChange={(e) => handlePrediction(m.id, "local", e.target.value)} className="p-3 rounded-xl bg-white text-black text-center font-bold" placeholder="0" />

                <span className="text-center font-bold">-</span>

                <input type="number" min="0" value={predictions[m.id]?.visita ?? ""} onChange={(e) => handlePrediction(m.id, "visita", e.target.value)} className="p-3 rounded-xl bg-white text-black text-center font-bold" placeholder="0" />

                <div className="flex items-center justify-start gap-2 font-bold">
                  <img src={`https://flagcdn.com/w40/${m.awayFlag}.png`} alt="" className="h-6 rounded" />
                  <span>{isSpanish ? m.awayEs : m.awayEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {message && (
          <div className="mt-6 bg-slate-800 border border-slate-600 rounded-xl p-5 text-center font-bold">
            {message}
          </div>
        )}

        <button onClick={guardarCorrecciones} disabled={saving} className="w-full mt-8 bg-yellow-400 text-black px-6 py-5 rounded-xl font-extrabold text-xl hover:bg-yellow-300 disabled:opacity-60">
          {saving ? (isSpanish ? "Guardando..." : "Saving...") : isSpanish ? "Enviar correcciones" : "Submit corrections"}
        </button>
      </div>
    </main>
  );
}
              