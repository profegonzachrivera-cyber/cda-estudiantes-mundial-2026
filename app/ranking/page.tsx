export default function RankingPage() {
  const ranking = [
    { position: 1, name: "Próximamente", points: 0 },
    { position: 2, name: "Próximamente", points: 0 },
    { position: 3, name: "Próximamente", points: 0 },
  ];

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="text-blue-300 hover:underline">
          ← Volver al inicio
        </a>

        <section className="text-center my-10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
            <img src="/logo-cdae.jpg" alt="CDAE" className="h-36 rounded-xl bg-white" />
            <div className="hidden md:block h-32 w-px bg-slate-500" />
            <img src="/logo-mundial-2026.jpg" alt="Mundial 2026" className="h-36 rounded-xl bg-white p-3" />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">🏆 Ranking Oficial</h1>
          <p className="text-slate-300 text-lg">
            El ranking se actualizará durante el Mundial según las reglas oficiales.
          </p>
        </section>

        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-600 text-yellow-400">
                  <th className="py-4">Posición</th>
                  <th className="py-4">Participante</th>
                  <th className="py-4">Puntos</th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((player) => (
                  <tr key={player.position} className="border-b border-slate-700">
                    <td className="py-4 font-bold">#{player.position}</td>
                    <td className="py-4">{player.name}</td>
                    <td className="py-4 font-bold">{player.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-700 rounded-xl p-5">
            📊 El ranking oficial será publicado después de cada fecha de la Fase de Grupos
            y al finalizar cada ronda eliminatoria.
          </div>
        </div>
      </div>
    </main>
  );
}