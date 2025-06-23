import { Trophy } from "lucide-react";
import { usePlayers } from "../../Tournament/context/PlayerContext";
import { useState } from "react";
import Button from "../../Tournament/TournamentComponents/Button";

export default function FinalRound() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [activeMatch, setActiveMatch] = useState(null);

    const { players } = usePlayers();
    const top8 = [...players].slice(0, 8);

    const quarterFinals = [
        [top8[0], top8[1]],
        [top8[2], top8[3]],
        [top8[4], top8[5]],
        [top8[6], top8[7]],
    ];

    const handleOpenOverlay = (matchIndex) => {
        setActiveMatch(matchIndex);
        setShowOverlay(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 overflow-x-auto">
            <Trophy size={48} color="#facc15" className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-center mb-12">KO-Tournament</h1>

            <div className="flex justify-center space-x-16">
                {/* Quarter Finals */}
                <div className="flex flex-col space-y-8">
                    <h2 className="text-center font-bold text-lg">Quarter Final</h2>
                    {quarterFinals.map((match, index) => (
                        <div
                            key={index}
                            className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-green-500"
                        >
                            <p className="text-green-400 font-semibold">{match[0] || "Team A"}</p>
                            <p className="text-blue-400 font-semibold">{match[1] || "Team B"}</p>

                            <button
                                onClick={() => handleOpenOverlay(index)}
                                className="mt-4 px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm"
                            >
                                Enter Results
                            </button>
                        </div>
                    ))}
                </div>

                {/* Semi Finals */}
                <div className="flex flex-col space-y-16 mt-16">
                    <h2 className="text-center font-bold text-lg">Semi Final</h2>
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-yellow-400"
                        >
                            <p className="text-green-400 font-semibold">Winner {i * 2 + 1}</p>
                            <p className="text-blue-400 font-semibold">Winner {i * 2 + 2}</p>

                            <button
                                onClick={() => handleOpenOverlay(4 + i)}
                                className="mt-4 px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm"
                            >
                               Enter Results
                            </button>
                        </div>
                    ))}
                </div>

                {/* Final */}
                <div className="flex flex-col justify-center mt-32">
                    <h2 className="text-center font-bold text-lg mb-8">Finale</h2>
                    <div className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-red-500">
                        <p className="text-green-400 font-semibold">Finalist 1</p>
                        <p className="text-blue-400 font-semibold">Finalist 2</p>

                        <button
                            onClick={() => handleOpenOverlay(6)}
                            className="mt-4 px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm"
                        >
                            Enter Results
                        </button>
                    </div>
                </div>

                {/* Sieger */}
                <div className="flex flex-col justify-center mt-40">
                    <div className="flex mr-10 gap-0">
                        <Trophy size={48} color="#facc15" className="mx-auto mb-4 h-10" />
                        <h2 className="text-center font-bold text-lg mb-4">Sieger</h2>
                    </div>
                    <div className="w-48 bg-green-700 p-4 rounded-lg text-center shadow-xl border-2 border-white">
                        <p className="font-bold text-xl">🏅 Team XYZ</p>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {showOverlay && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setShowOverlay(false)}
                    />
                    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4">
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Entered Result  fo Match #{activeMatch + 1}
                            </h2>

                            <Button onConfirm={() => setShowOverlay(false)} />

                            <div className="mt-6 text-right">
                                <button
                                    onClick={() => setShowOverlay(false)}
                                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
