import { useState } from 'react';
import { usePlayers } from '../../Tournament/context/PlayerContext';

export default function FinalRound() {
  const { players, stats } = usePlayers();
  const [matches, setMatches] = useState([]);

  
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
      alert('Mindestens 8 Spieler benötigt für einen KO-Baum.');
      return [];
    }

    if (topPlayers.length >= 8 && topPlayers.length < 16) {
      const top8 = topPlayers.slice(0, 8);
      const teams = createTeams(top8);
      return [
        { round: 'Semi-Final 1', players: [teams[0], teams[1]], result: null },
        { round: 'Semi-Final 2', players: [teams[2], teams[3]], result: null },
        { round: 'Final', players: [null, null], result: null },
      ];
    } else {
      const top16 = topPlayers.slice(0, 16);
      const teams = createTeams(top16);
      return [
        { round: 'Viertelfinale 1', players: [teams[0], teams[1]], result: null },
        { round: 'Viertelfinale 2', players: [teams[2], teams[3]], result: null },
        { round: 'Viertelfinale 3', players: [teams[4], teams[5]], result: null },
        { round: 'Viertelfinale 4', players: [teams[6], teams[7]], result: null },
        { round: 'Semi-Final 1', players: [null, null], result: null },
        { round: 'Semi-Final 2', players: [null, null], result: null },
        { round: 'Final', players: [null, null], result: null },
      ];
    }
  }

  function startBracket() {
    const bracket = generateBracket();
    setMatches(bracket);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">KO-Baum</h1>

      <button
        onClick={startBracket}
        className="mb-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Start K-O (Top 8 oder Top 16)
      </button>

      {matches.length === 0 && (
        <p className="text-gray-400">Noch keine Matches im KO-Baum vorhanden.</p>
      )}

      <div className="space-y-6 w-full max-w-2xl">
        {matches.map((match, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center mb-3">
              {match.round}
            </h3>
            <div className="flex justify-between px-4">
              <div>
                <p className="text-green-400 font-semibold">Team A</p>
                <p>{match.players?.[0]?.[0] || '-'}</p>
                <p>{match.players?.[0]?.[1] || '-'}</p>
              </div>
              <div>
                <p className="text-blue-400 font-semibold">Team B</p>
                <p>{match.players?.[1]?.[0] || '-'}</p>
                <p>{match.players?.[1]?.[1] || '-'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
