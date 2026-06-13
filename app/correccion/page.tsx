"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const partidos = Array.from({ length: 22 }, (_, i) => i + 3);

export default function CorreccionPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
  });

  const [predictions, setPredictions] = useState<
    Record<number, { local: string; visita: string }>
  >({});

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePrediction = (
    partidoId: number,
    field: "local" | "visita",
    value: string
  ) => {
    setPredictions({
      ...predictions,
      [partidoId]: {
        ...predictions[partidoId],
        [field]: value,
      },
    });
  };

  const guardarCorrecciones = async () => {
    setMessage("");

    if (!form.nombre || !form.email) {
      setMessage("Completa nombre y correo.");
      return;
    }

    const rows = partidos.map((id) => ({
      nombre: form.nombre,
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp,
      partido_id: id,
      goles_local: Number(predictions[id]?.local ?? 0),
      goles_visitante: Number(predictions[id]?.visita ?? 0),
    }));

    setSaving(true);

    const { error } = await supabase
      .from("correcciones_pronosticos")
      .insert(rows);

    setSaving(false);

    if (error) {
      console.error(error);
      setMessage("No se pudieron guardar las correcciones.");
      return;
    }

    setMessage("✅ Correcciones enviadas correctamente.");
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl font-extrabold mt-8 mb-4">
          ✍️ Corrección de Pronósticos
        </h1>

        <p className="text-slate-300 mb-6">
          Corrección excepcional solo para completar los partidos 3 al 24.
          Los partidos 1 y 2 ya están cerrados.
        </p>

        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="p-4 rounded-xl bg-white text-black"
              placeholder="Nombre completo"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-4 rounded-xl bg-white text-black"
              placeholder="Correo"
            />

            <input
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="p-4 rounded-xl bg-white text-black"
              placeholder="WhatsApp"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {partidos.map((id) => (
            <div
              key={id}
              className="bg-slate-800 rounded-xl p-4 grid grid-cols-[1fr_90px_20px_90px] items-center gap-3"
            >
              <span className="font-bold">Partido {id}</span>

              <input
                type="number"
                min="0"
                value={predictions[id]?.local ?? ""}
                onChange={(e) => handlePrediction(id, "local", e.target.value)}
                className="p-3 rounded-xl bg-white text-black text-center font-bold"
                placeholder="0"
              />

              <span className="text-center font-bold">-</span>

              <input
                type="number"
                min="0"
                value={predictions[id]?.visita ?? ""}
                onChange={(e) => handlePrediction(id, "visita", e.target.value)}
                className="p-3 rounded-xl bg-white text-black text-center font-bold"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        {message && (
          <div className="mt-6 bg-slate-800 border border-slate-600 rounded-xl p-5 text-center font-bold">
            {message}
          </div>
        )}

        <button
          onClick={guardarCorrecciones}
          disabled={saving}
          className="w-full mt-8 bg-yellow-400 text-black px-6 py-5 rounded-xl font-extrabold text-xl hover:bg-yellow-300 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Enviar correcciones"}
        </button>
      </div>
    </main>
  );
}