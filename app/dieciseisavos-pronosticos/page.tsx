"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Partido = {
  id: number;
  grupo: string;
  fechaEs: string;
  fechaEn: string;
  horaChile: string;
  horaIrlanda: string;
  cierreChile: string;
  cierreDate: string;
  kickoffDate: string;
  localEs: string;
  localEn: string;
  visitanteEs: string;
  visitanteEn: string;
  banderaLocal: string;
  banderaVisitante: string;
};

export default function DieciseisavosPronosticosPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [saving, setSaving] = useState(false);
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
      id: 73,
      grupo: "16avos",
      fechaEs: "Domingo 28 junio",
      fechaEn: "Sunday, June 28",
      horaChile: "15:00 hrs Chile",
      horaIrlanda: "20:00 hrs Ireland",
      cierreChile: "14:00 hrs Chile",
      kickoffDate: "2026-06-28T15:00:00-04:00",
      cierreDate: "2026-06-28T14:00:00-04:00",
      localEs: "Sudáfrica",
      localEn: "South Africa",
      visitanteEs: "Canadá",
      visitanteEn: "Canada",
      banderaLocal: "🇿🇦",
      banderaVisitante: "🇨🇦",
    },
    {
      id: 74,
      grupo: "16avos",
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "13:00 hrs Chile",
      horaIrlanda: "18:00 hrs Ireland",
      cierreChile: "12:00 hrs Chile",
      kickoffDate: "2026-06-29T13:00:00-04:00",
      cierreDate: "2026-06-29T12:00:00-04:00",
      localEs: "Brasil",
      localEn: "Brazil",
      visitanteEs: "Japón",
      visitanteEn: "Japan",
      banderaLocal: "🇧🇷",
      banderaVisitante: "🇯🇵",
    },
    {
      id: 75,
      grupo: "16avos",
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "16:30 hrs Chile",
      horaIrlanda: "21:30 hrs Ireland",
      cierreChile: "15:30 hrs Chile",
      kickoffDate: "2026-06-29T16:30:00-04:00",
      cierreDate: "2026-06-29T15:30:00-04:00",
      localEs: "Alemania",
      localEn: "Germany",
      visitanteEs: "Paraguay",
      visitanteEn: "Paraguay",
      banderaLocal: "🇩🇪",
      banderaVisitante: "🇵🇾",
    },
    {
      id: 76,
      grupo: "16avos",
      fechaEs: "Lunes 29 junio",
      fechaEn: "Monday, June 29",
      horaChile: "21:00 hrs Chile",
      horaIrlanda: "02:00 hrs Ireland",
      cierreChile: "20:00 hrs Chile",
      kickoffDate: "2026-06-29T21:00:00-04:00",
      cierreDate: "2026-06-29T20:00:00-04:00",
      localEs: "Países Bajos",
      localEn: "Netherlands",
      visitanteEs: "Marruecos",
      visitanteEn: "Morocco",
      banderaLocal: "🇳🇱",
      banderaVisitante: "🇲🇦",
    },
    {
      id: 77,
      grupo: "16avos",
      fechaEs: "Martes 30 junio",
      fechaEn: "Tuesday, June 30",
      horaChile: "13:00 hrs Chile",
      horaIrlanda: "18:00 hrs Ireland",
      cierreChile: "12:00 hrs Chile",
      kickoffDate: "2026-06-30T13:00:00-04:00",
      cierreDate: "2026-06-30T12:00:00-04:00",
      localEs: "Costa de Marfil",
      localEn: "Ivory Coast",
      visitanteEs: "Noruega",
      visitanteEn: "Norway",
      banderaLocal: "🇨🇮",
      banderaVisitante: "🇳🇴",
    },
    {
      id: 78,
      grupo: "16avos",
      fechaEs: "Martes 30 junio",
      fechaEn: "Tuesday, June 30",
      horaChile: "17:00 hrs Chile",
      horaIrlanda: "22:00 hrs Ireland",
      cierreChile: "16:00 hrs Chile",
      kickoffDate: "2026-06-30T17:00:00-04:00",
      cierreDate: "2026-06-30T16:00:00-04:00",
      localEs: "Francia",
      localEn: "France",
      visitanteEs: "Suecia",
      visitanteEn: "Sweden",
      banderaLocal: "🇫🇷",
      banderaVisitante: "🇸🇪",
    },
  ];

  const isClosed = (partido: Partido) => {
    return new Date() >= new Date(partido.cierreDate);
  };

  const teamName = (partido: Partido, side: "local" | "visitante") => {
    if (side === "local") {
      return isSpanish ? partido.localEs : partido.localEn;
    }

    return isSpanish ? partido.visitanteEs : partido.visitanteEn;
  };

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

  const handleSubmit = async () => {
    setMessage("");

    if (
      !participant.nombre.trim() ||
      !participant.email.trim() ||
      !participant.whatsapp.trim() ||
      !participant.pais.trim()
    ) {
      setMessage(
        isSpanish
          ? "Completa nombre, correo, WhatsApp y país."
          : "Please complete name, email, WhatsApp and country."
      );
      return;
    }

    const partidosAbiertos = partidos.filter((p) => !isClosed(p));

    const rows = partidosAbiertos
      .filter((match) => {
        const prediction = predictions[match.id];
        return prediction?.home !== "" && prediction?.away !== "";
      })
      .map((match) => ({
        nombre: participant.nombre.trim(),
        email: participant.email.trim().toLowerCase(),
        whatsapp: participant.whatsapp.trim(),
        pais: participant.pais.trim(),
        partido_id: match.id,
        equipo_local: match.localEs,
        equipo_visitante: match.visitanteEs,
        goles_local: Number(predictions[match.id].home),
        goles_visitante: Number(predictions[match.id].away),
        fase: "16avos de Final",
        fecha: isSpanish ? match.fechaEs : match.fechaEn,
        grupo: "16avos",
        puntos: 0,
      }));

    if (rows.length === 0) {
      setMessage(
        isSpanish
          ? "No hay pronósticos nuevos para guardar o los partidos ya están cerrados."
          : "There are no new predictions to save or the matches are already closed."
      );
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("pronosticos")
      .upsert(rows, { onConflict: "email,partido_id" });

    setSaving(false);

    if (error) {
      console.error(error);
      setMessage(
        isSpanish
          ? "No se pudieron guardar los pronósticos. Revisa los datos e intenta nuevamente."
          : "Predictions could not be saved. Please check your details and try again."
      );
      return;
    }

    setMessage(
      isSpanish
        ? "Pronósticos guardados correctamente."
        : "Predictions saved successfully."
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
            🏆 {isSpanish ? "Pronósticos 16avos de Final" : "Round of 32 Predictions"}
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            {isSpanish
              ? "Completa tus pronósticos para los cruces confirmados. Cada partido se cierra una hora antes de su inicio."
              : "Submit your predictions for the confirmed matches. Each match closes one hour before kick-off."}
          </p>

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500 rounded-2xl p-5 max-w-3xl mx-auto">
            <p className="text-yellow-400 font-extrabold mb-2">
              ⏰{" "}
              {isSpanish
                ? "Cada pronóstico se cierra una hora antes del inicio de su partido."
                : "Each prediction closes one hour before its match starts."}
            </p>

            <p className="text-slate-200 font-bold">
              ⚠️{" "}
              {isSpanish
                ? "Importante: el pronóstico considera solo el resultado al término del tiempo reglamentario. No se consideran alargue ni penales."
                : "Important: predictions only count the result at the end of regular time. Extra time and penalties are not included."}
            </p>
          </div>
        </section>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-600 mb-8">
          <h2 className="text-2xl font-extrabold mb-5">
            👤 {isSpanish ? "Datos del participante" : "Participant details"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="p-4 rounded-xl text-black font-bold"
              placeholder={isSpanish ? "Nombre completo" : "Full name"}
              value={participant.nombre}
              onChange={(e) =>
                setParticipant({ ...participant, nombre: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold"
              placeholder={isSpanish ? "Correo usado en la inscripción" : "Email used during registration"}
              value={participant.email}
              onChange={(e) =>
                setParticipant({ ...participant, email: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold"
              placeholder="WhatsApp"
              value={participant.whatsapp}
              onChange={(e) =>
                setParticipant({ ...participant, whatsapp: e.target.value })
              }
            />

            <input
              className="p-4 rounded-xl text-black font-bold"
              placeholder={isSpanish ? "País" : "Country"}
              value={participant.pais}
              onChange={(e) =>
                setParticipant({ ...participant, pais: e.target.value })
              }
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {partidos.map((partido) => {
            const closed = isClosed(partido);

            return (
              <div
                key={partido.id}
                className={`rounded-2xl p-6 border ${
                  closed
                    ? "bg-slate-900 border-red-500/50 opacity-70"
                    : "bg-slate-800 border-slate-600"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-yellow-400 font-extrabold">
                    {isSpanish ? "Partido" : "Match"} {partido.id}
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
                  📅 {isSpanish ? partido.fechaEs : partido.fechaEn}
                </p>

                <p className="text-slate-300 mb-1">
                  🕒 {isSpanish ? partido.horaChile : partido.horaIrlanda}
                </p>

                <p className="text-yellow-400 font-bold mb-5">
                  ⏰ {isSpanish ? "Cierre" : "Closes"}:{" "}
                  {isSpanish ? partido.cierreChile : partido.horaIrlanda}
                </p>

                <div className="bg-slate-900 rounded-xl p-5">
                  <div className="grid grid-cols-[1fr_90px_1fr] items-center gap-3">
                    <div className="text-right font-bold">
                      <span className="mr-2">{partido.banderaLocal}</span>
                      {teamName(partido, "local")}
                    </div>

                    <div className="flex gap-2 justify-center">
                      <input
                        type="number"
                        min="0"
                        disabled={closed}
                        className="w-12 p-2 rounded-lg text-black text-center font-bold"
                        value={predictions[partido.id]?.home ?? ""}
                        onChange={(e) =>
                          handlePredictionChange(
                            partido.id,
                            "home",
                            e.target.value
                          )
                        }
                      />

                      <span className="font-bold pt-2">-</span>

                      <input
                        type="number"
                        min="0"
                        disabled={closed}
                        className="w-12 p-2 rounded-lg text-black text-center font-bold"
                        value={predictions[partido.id]?.away ?? ""}
                        onChange={(e) =>
                          handlePredictionChange(
                            partido.id,
                            "away",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="font-bold">
                      <span className="mr-2">{partido.banderaVisitante}</span>
                      {teamName(partido, "visitante")}
                    </div>
                  </div>
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

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-8 w-full bg-yellow-400 text-black font-extrabold py-5 rounded-xl hover:bg-yellow-300 text-xl transition disabled:opacity-60"
        >
          {saving
            ? isSpanish
              ? "Guardando..."
              : "Saving..."
            : isSpanish
            ? "Guardar pronósticos"
            : "Save predictions"}
        </button>
      </div>
    </main>
  );
}