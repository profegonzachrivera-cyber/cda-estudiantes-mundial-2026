"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Partido = {
  id: number;
  fechaEs: string;
  fechaEn: string;
  horaChile: string;
  horaIrlanda: string;
  cierreChile: string;
  cierreIrlanda: string;
  cierreDate: string;
  localEs: string;
  localEn: string;
  visitanteEs: string;
  visitanteEn: string;
  banderaLocal: string;
  banderaVisitante: string;
};

export default function DieciseisavosPronosticosPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [savingMatch, setSavingMatch] = useState<number | null>(null);
  const [savedMatches, setSavedMatches] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");

  const [participant, setParticipant] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    pais: "",
  });

  const [predictions, setPredictions] = useState<
    Record<number, { home: string; away: string }>
  >({});

  const isSpanish = language === "es";

const partidos: Partido[] = [
  {
    id: 101,
    fechaEs: "Martes 14 julio",
    fechaEn: "Tuesday, July 14",
    horaChile: "15:00 hrs Chile",
    horaIrlanda: "20:00 hrs Ireland",
    cierreChile: "14:00 hrs Chile",
    cierreIrlanda: "19:00 hrs Ireland",
    cierreDate: "2026-07-14T14:00:00-04:00",
    localEs: "Francia",
    localEn: "France",
    visitanteEs: "España",
    visitanteEn: "Spain",
    banderaLocal: "FR",
    banderaVisitante: "ES",
  },
  {
    id: 102,
    fechaEs: "Miércoles 15 julio",
    fechaEn: "Wednesday, July 15",
    horaChile: "15:00 hrs Chile",
    horaIrlanda: "20:00 hrs Ireland",
    cierreChile: "14:00 hrs Chile",
    cierreIrlanda: "19:00 hrs Ireland",
    cierreDate: "2026-07-15T14:00:00-04:00",
    localEs: "Inglaterra",
    localEn: "England",
    visitanteEs: "Argentina",
    visitanteEn: "Argentina",
    banderaLocal: "EN",
    banderaVisitante: "AR",
  },
];  

const isClosed = (partido: Partido) =>
    new Date() >= new Date(partido.cierreDate);

  const handlePredictionChange = (
    partidoId: number,
    side: "home" | "away",
    value: string
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [partidoId]: {
        home: prev[partidoId]?.home ?? "",
        away: prev[partidoId]?.away ?? "",
        [side]: value,
      },
    }));
  };

  const saveMatch = async (match: Partido) => {
    setMessage("");

    if (
      !participant.nombre.trim() ||
      !participant.email.trim() ||
      !participant.whatsapp.trim() ||
      !participant.pais.trim()
    ) {
      setMessage(
        isSpanish
          ? "Completa tus datos antes de guardar."
          : "Please complete your details before saving."
      );
      return;
    }

    if (isClosed(match)) {
      setMessage(
        isSpanish
          ? `El partido ${match.id} ya está cerrado.`
          : `Match ${match.id} is already closed.`
      );
      return;
    }

    const prediction = predictions[match.id];

    if (!prediction || prediction.home === "" || prediction.away === "") {
      setMessage(
        isSpanish
          ? `Completa el marcador del partido ${match.id}.`
          : `Please complete the score for match ${match.id}.`
      );
      return;
    }

    setSavingMatch(match.id);

    const row = {
      nombre: participant.nombre.trim(),
      email: participant.email.trim().toLowerCase(),
      whatsapp: participant.whatsapp.trim(),
      pais: participant.pais.trim(),
      partido_id: match.id,
      equipo_local: match.localEs,
      equipo_visitante: match.visitanteEs,
      goles_local: Number(prediction.home),
      goles_visitante: Number(prediction.away),
      fase: "Semifinales",
      fecha: isSpanish ? match.fechaEs : match.fechaEn,
      grupo: "16avos",
      puntos: 0,
    };

    const { error } = await supabase
      .from("pronosticos")
      .upsert(row, { onConflict: "email,partido_id" });

    setSavingMatch(null);

    if (error) {
      console.error(error);
      setMessage(
        isSpanish
          ? `No se pudo guardar el partido ${match.id}.`
          : `Match ${match.id} could not be saved.`
      );
      return;
    }

    setSavedMatches((prev) => ({
      ...prev,
      [match.id]: `${prediction.home} - ${prediction.away}`,
    }));

    setMessage(
      isSpanish
        ? `✅ Partido ${match.id} guardado correctamente.`
        : `✅ Match ${match.id} saved successfully.`
    );
  };

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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            🏆{" "}
            {isSpanish
              ? "Pronósticos Semifinales"
              : "Round of 32 Predictions"}
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            {isSpanish
              ? "Guarda cada partido por separado. Cada pronóstico se cierra una hora antes del inicio de su partido."
              : "Save each match separately. Each prediction closes one hour before its match starts."}
          </p>

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500 rounded-2xl p-5 max-w-3xl mx-auto">
            <p className="text-yellow-400 font-extrabold mb-2">
              ⏰{" "}
              {isSpanish
                ? "Cierre individual: una hora antes de cada partido."
                : "Individual deadline: one hour before each match."}
            </p>

            <p className="text-slate-200 font-bold">
              ⚠️{" "}
              {isSpanish
                ? "Solo cuenta el resultado al término del tiempo reglamentario. No se consideran alargue ni penales."
                : "Only the result at the end of regular time counts. Extra time and penalties are not included."}
            </p>
          </div>
        </section>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-600 mb-8">
          <h2 className="text-2xl font-extrabold mb-5">
            👤 {isSpanish ? "Datos del participante" : "Participant details"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="p-4 rounded-xl text-black font-bold bg-white"
              placeholder={isSpanish ? "Nombre completo" : "Full name"}
              value={participant.nombre}
              onChange={(e) =>
                setParticipant({ ...participant, nombre: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold bg-white"
              placeholder={
                isSpanish
                  ? "Correo usado en la inscripción"
                  : "Email used during registration"
              }
              value={participant.email}
              onChange={(e) =>
                setParticipant({ ...participant, email: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold bg-white"
              placeholder="WhatsApp"
              value={participant.whatsapp}
              onChange={(e) =>
                setParticipant({ ...participant, whatsapp: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold bg-white"
              placeholder={isSpanish ? "País" : "Country"}
              value={participant.pais}
              onChange={(e) =>
                setParticipant({ ...participant, pais: e.target.value })
              }
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {partidos.map((match) => {
            const closed = isClosed(match);
            const home = predictions[match.id]?.home ?? "";
            const away = predictions[match.id]?.away ?? "";

            return (
              <div
                key={match.id}
                className={`rounded-2xl p-6 border ${
                  closed
                    ? "bg-slate-900 border-red-500/50 opacity-70"
                    : "bg-slate-800 border-slate-600"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-yellow-400 font-extrabold">
                    {isSpanish ? "Partido" : "Match"} {match.id}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      closed ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {closed
                      ? isSpanish
                        ? "Cerrado"
                        : "Closed"
                      : isSpanish
                      ? "Abierto"
                      : "Open"}
                  </span>
                </div>

                <p className="text-slate-300 mb-1">
                  📅 {isSpanish ? match.fechaEs : match.fechaEn}
                </p>

                <p className="text-slate-300 mb-1">
                  🕒 {isSpanish ? match.horaChile : match.horaIrlanda}
                </p>

                <p className="text-yellow-400 font-bold mb-5">
                  ⏰ {isSpanish ? "Cierre" : "Closes"}:{" "}
                  {isSpanish ? match.cierreChile : match.cierreIrlanda}
                </p>

                <div className="bg-slate-900 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_170px_1fr] items-center gap-4">
                    <div className="text-center md:text-right font-bold text-lg">
                      <span className="mr-2">{match.banderaLocal}</span>
                      {isSpanish ? match.localEs : match.localEn}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <input
                        type="number"
                        min="0"
                        disabled={closed}
                        className="w-16 h-16 rounded-xl bg-white text-black text-center text-3xl font-extrabold disabled:opacity-50"
                        value={home}
                        onChange={(e) =>
                          handlePredictionChange(
                            match.id,
                            "home",
                            e.target.value
                          )
                        }
                      />

                      <span className="text-3xl font-extrabold">-</span>

                      <input
                        type="number"
                        min="0"
                        disabled={closed}
                        className="w-16 h-16 rounded-xl bg-white text-black text-center text-3xl font-extrabold disabled:opacity-50"
                        value={away}
                        onChange={(e) =>
                          handlePredictionChange(
                            match.id,
                            "away",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="text-center md:text-left font-bold text-lg">
                      <span className="mr-2">{match.banderaVisitante}</span>
                      {isSpanish ? match.visitanteEs : match.visitanteEn}
                    </div>
                  </div>

                  {savedMatches[match.id] && (
                    <p className="mt-4 text-green-400 font-bold text-center">
                      ✅ {isSpanish ? "Guardado" : "Saved"}:{" "}
                      {savedMatches[match.id]}
                    </p>
                  )}

                  <button
                    onClick={() => saveMatch(match)}
                    disabled={closed || savingMatch === match.id}
                    className="mt-5 w-full bg-green-500 text-black font-extrabold py-4 rounded-xl hover:bg-green-400 transition disabled:opacity-50"
                  >
                    {savingMatch === match.id
                      ? isSpanish
                        ? "Guardando..."
                        : "Saving..."
                      : isSpanish
                      ? `Guardar partido ${match.id}`
                      : `Save match ${match.id}`}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {message && (
          <div className="mt-8 bg-blue-700 rounded-xl p-5 text-center font-bold">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}