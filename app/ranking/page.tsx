export default function RankingPage() {
  const ranking = Array.from({ length: 50 }, (_, index) => ({
    position: index + 1,
    name: "Próximamente",
    flag: "🌍",
    points: 0,
  }));

  const groups = [];
  for (let i = 0; i < ranking.length; i += 10) {
    groups.push(ranking.slice(i, i + 10));
  }

  const medal = (position: number) => {
    if (position === 1) return "🥇";
    if (position === 2) return "🥈";
    if (position === 3) return "🥉";
    return `#${position}`;
  };

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <section className="text-center my-10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <img
              src="/logo-cdae.jpg"
              alt="CDAE"
              className="h-36 rounded-xl bg-white"
            />

            <div className="hidden md:block h-32 w-px bg-slate-500" />

            <img
              src="/logo-mundial-2026.jpg"
              alt="Mundial 2026"
              className="h-36 rounded-xl bg-white p-3"
            />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">🏆 Ranking Oficial</h1>

          <p className="text-slate-300 text-lg">
            Ranking completo de participantes del CDA Estudiantes Mundial 2026.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700"
            >
              <h2 className="text-2xl font-bold mb-5 text-yellow-400">
                Posiciones {index * 10 + 1} - {index * 10 + group.length}
              </h2>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600 text-slate-300">
                    <th className="py-3">Pos</th>
                    <th className="py-3">Participante</th>
                    <th className="py-3 text-center">🌍</th>
                    <th className="py-3 text-right">Puntos</th>
                  </tr>
                </thead>

                <tbody>
                  {group.map((player) => (
                    <tr
                      key={player.position}
                      className="border-b border-slate-700"
                    >
                      <td className="py-3 font-bold text-yellow-400">
                        {medal(player.position)}
                      </td>

                      <td className="py-3">{player.name}</td>

                      <td className="py-3 text-center text-2xl">
                        {player.flag}
                      </td>

                      <td className="py-3 text-right font-bold">
                        {player.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-700 rounded-xl p-5 text-center font-bold">
          📊 El ranking oficial será actualizado después de cada fecha de la
          Fase de Grupos y al finalizar cada ronda eliminatoria.
        </div>

        <div className="mt-6 text-center">
          <a
            href="/ranking-instagram"
            className="inline-block bg-pink-500 text-white font-extrabold px-8 py-4 rounded-xl hover:bg-pink-400"
          >
            📸 Ver versión para Instagram
          </a>
        </div>
      </div>
    </main>
  );
}