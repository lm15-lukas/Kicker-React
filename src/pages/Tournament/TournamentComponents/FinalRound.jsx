import { Trophy } from "lucide-react";
import { usePlayers } from "../context/PlayerContext";
import { useState } from "react";
import Button from "./Button";

export default function FinalRound() {
    const [activeMatchIndex, setActiveMatchIndex] = useState(null);

    const { players } = usePlayers();
    const top8 = [...players].slice(0, 8);
    const queaterFinals = [
        [top8[0], top8[1], top8[2], top8[3]],
        [top8[4], top8[5], top8[6], top8[7]]
    ]
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 overflow-x-auto">
            <Trophy size={48} color="#facc15" className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-center mb-12">KO-Tournament</h1>

            <div className="flex justify-center space-x-16">
                {/* Runde 1 */}
                <div className="flex flex-col space-y-8">
                    <h2 className="text-center font-bold text-lg">Quarter Final</h2>
                    {queaterFinals.map((match, i) => (
                        <div
                            key={i}
                            className="w-48 bg-gray-800 p-4 rounded-lg text-center shadow-md border-l-4 border-green-500"
                        >
                            <p className="text-green-400 font-semibold">{match[0]}</p>
                            <p className="text-green-400 font-semibold">{match[1]}</p>
                            <hr className="my-2 border-gray-600" />
                            <button
                                onClick={() => setActiveMatchIndex(activeMatchIndex === i ? null : i)}
                                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white mb-2"
                            >
                                {activeMatchIndex === i ? "Close" : "Enter Match Results"}
                            </button>
                            <p className="text-blue-400 font-semibold">{match[2]}</p>
                            <p className="text-blue-400 font-semibold">{match[3]}</p>

                            <p className="text-green-400 font-semibold">{match[4]}</p>
                            <p className="text-green-400 font-semibold">{match[5]}</p>

                            <hr className="my-2 border-gray-600" />
                            <p className="text-blue-400 font-semibold">{match[6]}</p>
                            <p className="text-blue-400 font-semibold">{match[7]}</p>
                            {activeMatchIndex !== null && (
                                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                                    <div className="bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg">
                                        <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">Enter Result</h3>
                                        <Button
                                            onConfirm={(result) => {
                                                console.log("Result for match", activeMatchIndex, result);
                                                setActiveMatchIndex(null); 
                                            }}
                                        />
                                        <div className="text-center mt-4">
                                            <button
                                                onClick={() => setActiveMatchIndex(null)}
                                                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

                {/* Runde 2 */}
                <div className="flex flex-col space-y-16 mt-16">
                    <h2 className="text-center font-bold text-lg">Semi Final</h2>
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
                    <div className="flex mr-10 gap-0">
                        <Trophy size={48} color="#facc15" className="mx-auto mb-4 h-10" />
                        <h2 className="text-center font-bold text-lg mb-4"> Sieger</h2>
                    </div>
                    <div className="w-48 bg-green-700 p-4 rounded-lg text-center shadow-xl border-2 border-white">
                        <p className="font-bold text-xl">🏅 Team XYZ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
