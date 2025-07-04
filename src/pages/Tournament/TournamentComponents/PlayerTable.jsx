import { useEffect, useState } from 'react';
import { usePlayers } from '../context/PlayerContext.jsx';
import AddPlayer from './AddPlayer.jsx';
import { WinningLogic } from '../logic/WinningLogic.jsx';
import WinningSets from './WinningSets.jsx';
import FormatResults from './FormatResults.jsx';
import Trashbin from '../assets/images/trash-solid.svg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TournamentHeader from './TurnamentHeader.jsx';

export default function PlayerTable() {

  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem('form');
    return stored ? JSON.parse(stored) : {
      goals: '',
      length: '',
      points: '',
      date: '',
      sets: '',
    };
  });

  const navigate = useNavigate();
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('matches');
    return saved ? JSON.parse(saved) : [];
  });
  const [playedPlayers, setPlayedPlayers] = useState(() => {
    const saved = localStorage.getItem('playedPlayers');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMatchResults, setShowMatchResults] = useState({});
  const [matchToDelete, setMatchToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const storedWinningForm = JSON.parse(localStorage.getItem('form') || '{}');
  const goalsToWin = parseInt(storedWinningForm.goals, 10) || 4;
  const tournamentName = localStorage.getItem('tournament-name') || 'Unnamed Tournament';

  const stats = WinningLogic(matches, goalsToWin);
  const { players, removePlayer, addPlayer} = usePlayers();

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('playedPlayers', JSON.stringify(playedPlayers));
  }, [playedPlayers]);
  useEffect(() => {
    const sortedPlayers = players
      .map((player) => ({
        player,
        ...stats[player] || {
          games: 0,
          wins: 0,
          losses: 0,
          points: 0,
          goalDiff: 0,
        }
      }))
      .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
      .map((entry) => entry.player);

    localStorage.setItem("sortedPlayers", JSON.stringify(sortedPlayers));
  }, [players, stats]);


  function startNewRound() {
    const unplayed = players.filter((p) => !playedPlayers.includes(p));
    const played = players.filter((p) => playedPlayers.includes(p));

    let selectedPlayers = [];

    if (unplayed.length >= 2 && played.length >= 2) {
      const newOnes = shuffle(unplayed).slice(0, 2);
      const experienced = shuffle(played).slice(0, 2);
      selectedPlayers = [...newOnes, ...experienced];
    } else {
      selectedPlayers = shuffle(players).slice(0, 4);
    }

    const updatedPlayed = [...new Set([...playedPlayers, ...selectedPlayers])];
    setPlayedPlayers(updatedPlayed);

    const newMatch = {
      players: [
        selectedPlayers.slice(0, 2),
        selectedPlayers.slice(2, 4),
      ],
      result: null,
    };

    setMatches((prevMatches) => [...prevMatches, newMatch]);
  }

  function shuffle(array) {
    return [...array].sort(() => 0.5 - Math.random());
  }

  function toggleMatchResult(index) {
    setShowMatchResults((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  function confirmDeleteMatch(index) {
    setMatchToDelete(index);
    setShowDeleteModal(true);
  }

  function removeMatch() {
    if (matchToDelete !== null) {
      setMatches((prevMatches) => prevMatches.filter((_, i) => i !== matchToDelete));
      setMatchToDelete(null);
      setShowDeleteModal(false);
    }
  }

  function handleResultConfirm(result, index, matchPlayers) {
    const newMatch = {
      players: matchPlayers,
      result: result,
    };

    setMatches((prevMatches) => {
      const updatedMatches = [...prevMatches];
      updatedMatches[index] = newMatch;
      return updatedMatches;
    });

    setShowMatchResults((prev) => ({
      ...prev,
      [index]: false,
    }));
  }

  function saveTournament() {
    const newTournament = {
      name: tournamentName,
      date: new Date().toISOString(),
      players,
      matches,
      stats,
      formData,
      playedPlayers,
    };

    const saved = JSON.parse(localStorage.getItem('saved-tournaments') || '[]');
    saved.push(newTournament);
    localStorage.setItem('saved-tournaments', JSON.stringify(saved));

    localStorage.removeItem('matches');
    localStorage.removeItem('playedPlayers');
    localStorage.removeItem('form');
    localStorage.removeItem('tournament-name');
    localStorage.removeItem('player-names');

    navigate('/load');
  }

  return (
    <>
      <TournamentHeader onEndTournament={saveTournament} />
      <div className='w-full min-h-screen bg-gray-900 text-white p-4'>
        <div className="flex ml-60">

          <div className="w-full max-w-4xl mx-auto">

            {/* Matches */}
            <div className="space-y-4">
              {matches.map((match, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-4 shadow-lg">

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg text-green-400">Team A</p>
                      <p>{match.players[0]?.[0] || '—'}</p>
                      <p>{match.players[0]?.[1] || '—'}</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <FormatResults resultArray={match.result} />
                      <motion.button
                        onClick={() => toggleMatchResult(index)}
                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                      >
                        {showMatchResults[index] ? "Close Results" : "Enter Result"}
                      </motion.button>
                      <button onClick={() => confirmDeleteMatch(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <img src={Trashbin} alt="Delete" className="w-5 h-5 mb-5" />
                      </button>
                    </div>

                    <div>
                      <p className="font-semibold text-lg text-blue-400">Team B</p>
                      <p>{match.players[1]?.[0] || '—'}</p>
                      <p>{match.players[1]?.[1] || '—'}</p>
                    </div>
                  </div>

                  {showMatchResults[index] && (
                    <div className="flex justify-center border-t border-gray-600 pt-4">
                      <WinningSets matchPlayers={match.players} index={index} onResultConfirm={handleResultConfirm} />
                    </div>
                  )}
                </div>
              ))}

              <motion.button
                onClick={startNewRound}
                className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {matches.length === 0 ? "Start First Round" : "Start New Round"}
              </motion.button>
            </div>
          </div>
          <div className='mt-8 w-full flex justify-end'>
            <motion.div className="w-[500px] bg-gray-800 rounded-lg p-4 shadow-lg max-h-[50vh] overflow-y-auto"
              animate={{ height: "auto" }}
              initial={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full flex flex-col">
                {/* Fester Kopfbereich */}
                <div className="bg-gray-900 text-white px-4 py-4 shadow z-10">
                  <h2 className="text-3xl font-bold mb-2">"{tournamentName}"</h2>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Participants</h3>
                    <AddPlayer onAdd={addPlayer} />
                  </div>
                </div>

                {/* Scrollbarer Tabellenbereich */}
                <div className="flex-grow overflow-auto">
                  <table className="min-w-full text-left border-none text-sm">
                    <thead className="sticky top-0 bg-gray-800 text-gray-200 z-10">
                      <tr>
                        <th className="p-3 py-4">#</th>
                        <th className="p-3 py-4">Player</th>
                        <th className="p-3 py-4">G</th>
                        <th className="p-3 py-4">W</th>
                        <th className="p-3 py-4">L</th>
                        <th className="p-3 py-4">Pts</th>
                        <th className="p-3 py-4">Diff</th>
                        <th className="p-3 py-4">✕</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players
                        .map((player) => ({
                          player,
                          ...stats[player] || {
                            games: 0,
                            wins: 0,
                            losses: 0,
                            points: 0,
                            goalDiff: 0,
                          }
                        }))
                        .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
                        .map((p, index) => (
                          <tr key={p.player} className="even:bg-gray-800 odd:bg-gray-900 text-white">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{p.player}</td>
                            <td className="p-3">{p.games}</td>
                            <td className="p-3">{p.wins}</td>
                            <td className="p-3">{p.losses}</td>
                            <td className="p-3">{p.points}</td>
                            <td className="p-3">{p.goalDiff}</td>
                            <td className="p-3">
                              <button
                                onClick={() => removePlayer(p.player)}
                                className="text-red-400 hover:text-red-600"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <div className="flex justify-center mt-4">
                      <motion.button
                        onClick={() => setShowSaveModal(true)}
                        className="px-4 py-2 rounded bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Tournament
                      </motion.button>
                    </div>

                  </table>
                </div>
              </div>




            </motion.div>
          </div>
        </div>

        {/* Modals & Navigation bleiben unverändert */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 space-y-4">
              <p className="text-lg">Are you sure you want to delete this match?</p>
              <div className="flex justify-between">
                <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-700" onClick={removeMatch}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 space-y-4">
              <h3 className="text-2xl mb-2">Save Tournament "{tournamentName}"?</h3>
              <div className="flex justify-between">
                <button className="px-4 py-2 rounded bg-green-600 hover:bg-green-700" onClick={saveTournament}>
                  Yes, Save
                </button>
                <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-700" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-4 left-4 flex space-x-2 z-50">
        </div>
      </div>
    </>
  );
}
