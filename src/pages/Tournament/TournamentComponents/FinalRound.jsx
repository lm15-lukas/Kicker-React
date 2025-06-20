export default function KOBaum() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mb-12">🏆 KO-Turnierbaum</h1>

      <div className="flex justify-center space-x-16">
        {/* Runde 1 */}
        <div className="flex flex-col space-y-8">
          <h2 className="text-center font-bold text-lg">Viertelfinale</h2>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-green-500"
            >
              <p className="text-green-400 font-semibold">Team A{i + 1}</p>
              <p className="text-blue-400 font-semibold">Team B{i + 1}</p>
            </div>
          ))}
        </div>

        {/* Runde 2 */}
        <div className="flex flex-col space-y-16 mt-16">
          <h2 className="text-center font-bold text-lg">Halbfinale</h2>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-yellow-400"
            >
              <p className="text-green-400 font-semibold">Winner {i * 2 + 1}</p>
              <p className="text-blue-400 font-semibold">Winner {i * 2 + 2}</p>
            </div>
          ))}
        </div>

        {/* Finale */}
        <div className="flex flex-col justify-center mt-32">
          <h2 className="text-center font-bold text-lg mb-8">Finale</h2>
          <div className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-red-500">
            <p className="text-green-400 font-semibold">Finalist 1</p>
            <p className="text-blue-400 font-semibold">Finalist 2</p>
          </div>
        </div>

        {/* Sieger */}
        <div className="flex flex-col justify-center mt-40">
          <h2 className="text-center font-bold text-lg mb-4">🏆 Sieger</h2>
          <div className="w-48 bg-green-700 p-4 rounded-lg text-center shadow-xl border-2 border-white">
            <p className="font-bold text-xl">🏅 Team XYZ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
