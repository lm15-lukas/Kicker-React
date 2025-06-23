import { useState } from "react";
import { usePlayers } from "../../Tournament/context/PlayerContext";

export default function FinalRound() {
  const { players, stats } = usePlayers();
  const [matches, setMatches] = useState([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState(null);

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function createTeams(playerList) {
    const shuffled = shuffle(playerList);
    const teams = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      teams.push(shuffled.slice(i, i + 2));
    }
    return teams;
  }

  function generateBracket() {
    const topPlayers = [...players]
      .map((player) => ({
        player,
        ...(stats?.[player] || {}),
      }))
      .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
      .map((entry) => entry.player);

    if (topPlayers.length < 8) {
      alert("Mindestens 8 Spieler benötigt für einen KO-Baum.");
      return [];
    }

    if (topPlayers.length >= 8 && topPlayers.length < 16) {
      const top8 = topPlayers.slice(0, 8);
      const teams = createTeams(top8);
      const shuffledTeams = shuffle(teams);
      return [
        { round: "Halbfinale 1", players: [shuffledTeams[0], shuffledTeams[1]], result: null },
        { round: "Halbfinale 2", players: [shuffledTeams[2], shuffledTeams[3]], result: null },
        { round: "Finale", players: [null, null], result: null },
      ];
    } else {
      const top16 = topPlayers.slice(0, 16);
      const teams = createTeams(top16);
      const shuffledTeams  = shuffle(teams)
      return [
        { round: "Viertelfinale 1", players: [shuffledTeams[0], shuffledTeams[1]], result: null },
        { round: "Viertelfinale 2", players: [shuffledTeams[2], shuffledTeams[3]], result: null },
        { round: "Viertelfinale 3", players: [shuffledTeams[4], shuffledTeams[5]], result: null },
        { round: "Viertelfinale 4", players: [shuffledTeams[6], shuffledTeams[7]], result: null },
        { round: "Halbfinale 1", players: [null, null], result: null },
        { round: "Halbfinale 2", players: [null, null], result: null },
        { round: "Finale", players: [null, null], result: null },
      ];
    }
  }

  function startBracket() {
    const bracket = generateBracket();
    setMatches(bracket);
    setShowWinnerModal(false);
    setWinnerTeam(null);
  }

  function handleResultConfirm(result, matchIndex) {
    const updatedMatches = [...matches];
    updatedMatches[matchIndex].result = result;

    const winnerTeamNow =
      result[0] > result[1]
        ? updatedMatches[matchIndex].players[0]
        : updatedMatches[matchIndex].players[1];

    
    let nextMatchIndex = null;
    let positionInNextMatch = null;

    
    if (matches.length === 7) {
      
      if (matchIndex >= 0 && matchIndex <= 3) {
        nextMatchIndex = 4 + Math.floor(matchIndex / 2); 
        positionInNextMatch = matchIndex % 2 === 0 ? 0 : 1;
      }
      
      else if (matchIndex === 4 || matchIndex === 5) {
        nextMatchIndex = 6; 
        positionInNextMatch = matchIndex === 4 ? 0 : 1;
      }
      
      else if (matchIndex === 6) {
        
        setWinnerTeam(winnerTeamNow);
        setShowWinnerModal(true);
      }
    }

    
    if (matches.length === 3) {
      
      if (matchIndex === 0 || matchIndex === 1) {
        nextMatchIndex = 2; 
        positionInNextMatch = matchIndex === 0 ? 0 : 1;
      }
      
      else if (matchIndex === 2) {
        setWinnerTeam(winnerTeamNow);
        setShowWinnerModal(true);
      }
    }

    if (nextMatchIndex !== null) {
      const nextMatch = { ...updatedMatches[nextMatchIndex] };
      if (!nextMatch.players) nextMatch.players = [null, null];
      nextMatch.players[positionInNextMatch] = winnerTeamNow;
      updatedMatches[nextMatchIndex] = nextMatch;
    }

    setMatches(updatedMatches);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">KO-Baum</h1>

      <button
        onClick={startBracket}
        className="mb-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
      >
        KO-Baum starten (Top 8 oder 16)
      </button>

      {matches.length === 0 && (
        <p className="text-gray-400">Noch keine Matches vorhanden.</p>
      )}

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

      {/* Gewinner Modal */}
      {showWinnerModal && winnerTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-10 max-w-lg w-full text-center">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">🏆 Tournament Winner!</h2>
            <p className="text-2xl mb-6">
              <span className="font-semibold">"{winnerTeam[0]}"</span> and{" "}
              <span className="font-semibold">"{winnerTeam[1]}"</span>won the Tournament
              after the KO-Phase
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
