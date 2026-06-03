import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-8">

      <Image
        src="/logo-cdae.jpg"
        alt="CDA Estudiantes de Calbuco"
        width={220}
        height={220}
        className="mb-6 mt-6"
      />

      <h1 className="text-5xl font-bold text-center mb-6">
        ⚽ CDA Estudiantes Mundial 2026
      </h1>

      <p className="text-xl text-center max-w-2xl mb-8">
        Predice los resultados del Mundial 2026, compite con participantes
        de distintos países y ayuda al Club Deportivo Estudiantes de Calbuco.
      </p>

      <div className="bg-slate-800 p-8 rounded-xl max-w-3xl w-full shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          🏆 Premios
        </h2>

        <ul className="space-y-2 mb-6">
          <li>🥇 1° Lugar: $150.000 CLP / €150</li>
          <li>🥈 2° Lugar: $50.000 CLP / €50</li>
          <li>🥉 3° Lugar: $30.000 CLP / €30</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          🎯 Sistema de Puntuación
        </h2>

        <ul className="space-y-2 mb-6">
          <li>✅ Resultado exacto = 5 puntos</li>
          <li>✅ Ganador o empate correcto = 3 puntos</li>
          <li>✅ Invita a 2 participantes = +25 puntos</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          💰 Inscripción
        </h2>

        <p className="mb-6">
          Valor de inscripción:
          <br />
          <strong>$10.000 CLP</strong> o <strong>€10</strong>
          <br />
          Pago mediante transferencia bancaria.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          📋 Reglas Generales
        </h2>

        <ul className="space-y-2 mb-8">
          <li>• Cada participante puede registrar una sola cuenta.</li>

          <li>• El pago debe estar confirmado para participar.</li>

          <li>
            • Los pronósticos para cada fase deberán registrarse antes de una hora
            del inicio de dicha fase. Una vez cerrada la fase, no se podrán realizar
            modificaciones.
          </li>

          <li>
            • El ranking se actualizará al finalizar cada fecha de la Fase de Grupos
            y posteriormente al término de cada ronda eliminatoria:
            Dieciseisavos de Final, Octavos de Final, Cuartos de Final,
            Semifinales y Final.
          </li>

          <li>
            • En caso de empate en la clasificación final, se utilizará el número
            de resultados exactos acertados como criterio de desempate.
          </li>

          <li>
            • La participación implica la aceptación de todas las reglas del concurso.
          </li>

          <li>
            • La organización resolverá cualquier situación no contemplada en las reglas.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          🎮 ¿Cómo se juega?
        </h2>

        <ol className="space-y-2 mb-8 list-decimal list-inside">
          <li>Inscríbete realizando el pago correspondiente.</li>
          <li>Registra tus pronósticos antes del cierre de cada fase.</li>
          <li>Acumula puntos acertando resultados o ganadores.</li>
          <li>Sigue el ranking oficial durante todo el Mundial.</li>
          <li>Compite por los premios finales.</li>
        </ol>

        <div className="flex flex-col md:flex-row gap-4">

          <button className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition">
            🚀 Participar Ahora
          </button>

          <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition">
            🏆 Ver Ranking Oficial
          </button>

        </div>

      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        Organiza: Club Deportivo Estudiantes de Calbuco
      </p>

    </main>
  );
}