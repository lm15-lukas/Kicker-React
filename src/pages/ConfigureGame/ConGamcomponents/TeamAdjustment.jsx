import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MonsterLogo from './monster.svg';
import { motion } from 'framer-motion';

const NavigationButtons = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default function PlayerInputList() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("player-names");
    return saved ? JSON.parse(saved) : [""];
  });
  const inputRefs = useRef([]);

  useEffect(() => {
    const lastIndex = players.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  }, [players.length]);

  useEffect(() => {
    localStorage.setItem('player-names', JSON.stringify(players));
  }, [players]);

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (players[index].trim() !== "") {
        setPlayers([...players, ""]);
      }
    }
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers.length > 0 ? updatedPlayers : [""]);
  };

  const handleCreateTournament = () => {
    if (!isValidPlayerList()) {
      setError("At least 4 player names are required.");
      return;
    }

    const duplicateName = findDuplicateName();
    if (duplicateName) {
      setError(`The name "${duplicateName}" is used more than once.`);
      return;
    }

    setError("");
    navigate('/tournament');
  };

  const isValidPlayerList = () => {
    const nonEmptyPlayers = players.filter(name => name.trim() !== "");
    return nonEmptyPlayers.length >= 4;
  };

  const findDuplicateName = () => {
    const seen = {};
    for (let name of players) {
      const trimmed = name.trim();
      if (trimmed === "") continue;
      const lower = trimmed.toLowerCase();
      if (seen[lower]) {
        return trimmed;
      } else {
        seen[lower] = true;
      }
    }
    return null;
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-4 flex items-center justify-center shadow-lg">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Monster DYP
        </motion.h1>
        <div className="ml-auto">
          <motion.button
            className="bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-2 px-4 rounded hover:from-red-700 hover:to-green-700 transition-all"
            onClick={handleCreateTournament}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create Tournament
          </motion.button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <motion.h2
          className="text-xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Enter Player Names
        </motion.h2>
        <motion.h3
          className="text-lg mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Minimum 4 Players
        </motion.h3>
        {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
        <ul className="space-y-4">
          {players.map((name, index) => (
            <li key={index} className="flex items-center">
              <input
                type="text"
                value={name}
                ref={el => inputRefs.current[index] = el}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={`Player ${index + 1}`}
                className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="button"
                onClick={() => handleRemovePlayer(index)}
                title="Remove"
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <NavigationButtons />
    </>
  );
}