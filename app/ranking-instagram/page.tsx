"use client";

import { useState } from "react";

export default function RankingInstagramPage() {
  const ranking = Array.from({ length: 50 }, (_, index) => ({
    position: index + 1,
    name: "Próximamente",
    points: 0,
  }));

  const [page, setPage] = useState(0);
  const playersPerPage = 10;
  const totalPages = Math.ceil(ranking.length / playersPerPage);

  const currentPlayers = ranking.slice(
    page * playersPerPage,
    page * playersPerPage + playersPerPage
  );

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10 flex flex-col items-center">
      <section className="w-[1080px] max-w-full bg-gradient-to-b from-[#07111f] to-[#12325a] rounded-3xl p-10 shadow-2xl border border-blue-400">
        <div className="flex justify-center items-center gap-8 mb-8">
          <img
            src="/logo-cdae.jpg"
            alt="CDAE"
            className="h-32 rounded-xl bg-white"
          />

          <img
            src="/logo-mundial-2026.jpg"
            alt="Mundial 2026"
            className="h-32 rounded-xl bg-white p-3"
          />
        </div>

        <h1 className="text-6xl font-extrabold text-center mb-3">
          🏆 RANKING OFICIAL
        </h1>

        <p className="text-center text-yellow-400 text-3xl font-bold mb-4">
          CDA Estudiantes Mundial 2026
        </p>

        <p className="text-center text-white text-2xl font-bold mb-10">
          Posiciones {page * playersPerPage + 1} -{" "}
          {Math.min((page + 1) * playersPerPage, ranking.length)}
        </p>

        <div className="bg-slate-900/80 rounded-2xl p-8">
          {currentPlayers.map((player) => (
            <div
              key={player.position}
              className="grid grid-cols-[90px_1fr_130px] items-center border-b border-slate-700 py-5 text-3xl"
            >
              <div className="font-extrabold text-yellow-400">
                #{player.position}
              </div>

              <div className="font-bold">{player.name}</div>

              <div className="text-right font-extrabold">
                {player.points} pts
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-2xl font-bold">
            ⚽ Predice, suma puntos y compite por premios
          </p>

          <p className="text-yellow-400 text-xl mt-2">
            cda-estudiantes-mundial-2026.vercel.app
          </p>
        </div>
      </section>

      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`px-6 py-3 rounded-xl font-bold ${
              page === index
                ? "bg-yellow-400 text-black"
                : "bg-slate-700 text-white"
            }`}
          >
            {index * 10 + 1}-{Math.min((index + 1) * 10, ranking.length)}
          </button>
        ))}
      </div>
    </main>
  );
}