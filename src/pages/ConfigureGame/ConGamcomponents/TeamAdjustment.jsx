import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PlayerAdjustment() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("player-names");
    return saved ? JSON.parse(saved) : [];
  });
  const [newPlayer, setNewPlayer] = useState("");
  const [showTournamentNameInput, setShowTournamentInput] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("player-names", JSON.stringify(players));
  }, [players]);

 const handleAddPlayer = () => {
  const trimmedName = newPlayer.trim();
  if (trimmedName === "") {
    setError("Player name cannot be empty.");
    return;
  }
  if (players.some((p) => p.toLowerCase() === trimmedName.toLowerCase())) {
    setError(`The Player Name "${trimmedName}" already exists.`);
    return;
  }
  setPlayers([...players, trimmedName]);
  setNewPlayer("");
  setError("");
};


  const handleRemovePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const handleStart = () => {
    if (players.length < 4) {
      setError("Please add at least 4 players.");
      return;
    }
    setShowTournamentInput(true);
    setError("");
  };

  const handleConfirmTournament = () => {
    if (tournamentName.trim() === "") {
      setError("Please enter a tournament name.");
      return;
    }
    localStorage.setItem("tournament-name", tournamentName.trim());
    localStorage.setItem("matches", JSON.stringify([]));
    localStorage.setItem("results", JSON.stringify([]));
    navigate("/tournament");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddPlayer();
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-4 relative">
      <h1 className="text-3xl font-bold mb-6">Player Adjustment</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => {
            setNewPlayer(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Player Name"
          className="bg-gray-700 text-white p-2 rounded-lg"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 mb-6">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-lg w-64"
          >
            <span>{player}</span>
            <button
              onClick={() => handleRemovePlayer(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <motion.button
        onClick={handleStart}
        className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
          players.length >= 4
            ? "bg-gradient-to-r from-red-600 to-green-600 text-white hover:from-red-700 hover:to-green-700"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
        whileHover={players.length >= 4 ? { scale: 1.05 } : {}}
        whileTap={players.length >= 4 ? { scale: 0.95 } : {}}
      >
        Start Tournament
      </motion.button>

      {showTournamentNameInput && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4 rounded-lg">
          <h3 className="text-2xl mb-4">Enter Tournament Name</h3>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Tournament Name"
            className="bg-gray-700 text-white p-2 rounded-lg mb-4 w-full max-w-xs"
          />
          <div className="flex space-x-2">
            <button
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              onClick={handleConfirmTournament}
            >
              Confirm
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setShowTournamentInput(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-4 flex space-x-2 z-50">
        <motion.button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Zurück
        </motion.button>
        <motion.button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Startseite
        </motion.button>
      </div>
    </div>
  );
}
