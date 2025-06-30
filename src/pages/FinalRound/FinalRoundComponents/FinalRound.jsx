import { useState } from "react";
import { usePlayers } from "../../Tournament/context/PlayerContext";
import { Trophy } from "lucide-react";

export default function FinalRound() {
    const { players, stats } = usePlayers();
    const [matches, setMatches] = useState([]);
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [winnerTeam, setWinnerTeam] = useState(null);

    function generateBracket() {
        const sortedPlayers = JSON.parse(localStorage.getItem("sortedPlayers")) || [];

        if (sortedPlayers.length < 8) {
            alert("Mindestens 8 Spieler erforderlich.");
            return [];
        }

        if (sortedPlayers.length < 16) {

            const top8 = sortedPlayers.slice(0, 8);
            const teams = [
                [top8[0], top8[1]],
                [top8[2], top8[3]],
                [top8[4], top8[5]],
                [top8[6], top8[7]],
            ];

            return [
                { round: "Semi Final 1", players: [teams[0], teams[1]], result: null },
                { round: "Semi Final 2", players: [teams[2], teams[3]], result: null },
                { round: "Final", players: [null, null], result: null },
            ];
        }


        const top16 = sortedPlayers.slice(0, 16);
        const teams = [];

        for (let i = 0; i < 8; i++) {
            const team = [top16[i], top16[15 - i]];
            teams.push(team);
        }

        return [
            { round: "Quarter Final 1", players: [teams[0], teams[1]], result: null },
            { round: "Quarter Final 2", players: [teams[2], teams[3]], result: null },
            { round: "Quarter Final 3", players: [teams[4], teams[5]], result: null },
            { round: "Quarter Final 4", players: [teams[6], teams[7]], result: null },
            { round: "Semi Final 1", players: [null, null], result: null },
            { round: "Semi Final 2", players: [null, null], result: null },
            { round: "Final", players: [null, null], result: null },
        ];
    }




    function startBracket() {
        const bracket = generateBracket();
        setMatches(bracket);
        setShowWinnerModal(false);
        setWinnerTeam(null);
    }

    function handleResultConfirm(result, matchIndex) {
        const updated = [...matches];
        updated[matchIndex].result = result;

        const winner =
            result[0] > result[1]
                ? updated[matchIndex].players[0]
                : updated[matchIndex].players[1];

        let nextMatchIndex = null;
        let pos = null;

        if (matches.length === 7) {
            if (matchIndex <= 3) {
                nextMatchIndex = 4 + Math.floor(matchIndex / 2);
                pos = matchIndex % 2;
            } else if (matchIndex === 4 || matchIndex === 5) {
                nextMatchIndex = 6;
                pos = matchIndex === 4 ? 0 : 1;
            } else if (matchIndex === 6) {
                setWinnerTeam(winner);
                setShowWinnerModal(true);
            }
        }

        if (matches.length === 3) {
            if (matchIndex <= 1) {
                nextMatchIndex = 2;
                pos = matchIndex;
            } else if (matchIndex === 2) {
                setWinnerTeam(winner);
                setShowWinnerModal(true);
            }
        }

        if (nextMatchIndex !== null) {
            const next = { ...updated[nextMatchIndex] };
            if (!next.players) next.players = [null, null];
            next.players[pos] = winner;
            updated[nextMatchIndex] = next;
        }

        setMatches(updated);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">KO-Baum</h1>

            <button
                onClick={startBracket}
                className="mb-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
                Start KO-Phase (Top 8 or 16)
            </button>

            {matches.length === 0 && <p className="text-gray-400">Noch keine Matches.</p>}

            {matches.map((match, idx) => (
                <div
                    key={idx}
                    className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl mb-4"
                >
                    <h3 className="text-xl text-center font-semibold mb-3">{match.round}</h3>

                    <div className="flex justify-between px-4 mb-3">
                        <div>
                            <p className="text-green-400 font-semibold">Team A</p>
                            <p>{match.players?.[0]?.[0] || "-"}</p>
                            <p>{match.players?.[0]?.[1] || "-"}</p>
                        </div>
                        <div>
                            <p className="text-blue-400 font-semibold">Team B</p>
                            <p>{match.players?.[1]?.[0] || "-"}</p>
                            <p>{match.players?.[1]?.[1] || "-"}</p>
                        </div>
                    </div>

                    {match.players?.[0] && match.players?.[1] && match.result === null && (
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => handleResultConfirm([1, 0], idx)}
                                className="px-4 py-2 bg-green-700 rounded hover:bg-green-800"
                            >
                                Team A won
                            </button>
                            <button
                                onClick={() => handleResultConfirm([0, 1], idx)}
                                className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800"
                            >
                                Team B won
                            </button>
                        </div>
                    )}

                    {match.result !== null && (
                        <p className="text-center text-sm text-gray-400 mt-2">
                            Ergebnis: {match.result[0]} : {match.result[1]}
                        </p>
                    )}
                </div>
            ))}

            {showWinnerModal && winnerTeam && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-10 max-w-lg w-full text-center">
                        <h2 className="text-4xl font-bold mb-6 text-yellow-400 flex flex-col items-center animate-bounce">
                            <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-glow mb-2" strokeWidth={1.5} />
                            Tournament Winner!
                        </h2>

                        <p className="text-2xl mb-6">
                            <span className="font-semibold">"{winnerTeam[0]}"</span> and{" "}
                            <span className="font-semibold">"{winnerTeam[1]}"</span> won the Tournament!
                        </p>
                        <button
                            onClick={() => setShowWinnerModal(false)}
                            className="mt-4 px-6 py-3 bg-red-600 rounded hover:bg-red-700 text-white"
                        >
                            Close
                        </button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}
