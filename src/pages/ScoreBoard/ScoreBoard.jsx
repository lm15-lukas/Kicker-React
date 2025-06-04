import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ScoreBoard = () => {
  const navigate = useNavigate();
  const [winner, setWinner] = useState(null);

  // Platzhalter-Daten
  const [scores, setScores] = useState([
    { team: "Team Alpha", points: 12 },
    { team: "Team Beta", points: 9 },
    { team: "Team Gamma", points: 6 },
  ]);

  useEffect(() => {
    const topTeam = scores.reduce((prev, current) =>
      prev.points > current.points ? prev : current
    );
    setWinner(topTeam);
  }, [scores]);

  return (
    <section className="h-screen bg-gradient-to-r from-red-900 to-black text-white flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-5xl font-bold mb-8 text-center"
      >
        Turnier-Scoreboard
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Aktueller Punktestand</h2>
        <ul className="space-y-3">
          {scores.map((team, index) => (
            <li key={index} className="flex justify-between border-b border-gray-600 pb-2">
              <span>{team.team}</span>
              <span>{team.points} Punkte</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {winner && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
          className="mt-10 bg-green-700 px-6 py-4 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold">🏆 Gewinner: {winner.team} 🏆</h2>
        </motion.div>
      )}

      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-6 py-3 bg-white text-red-700 font-bold rounded-xl hover:bg-red-700 hover:text-white transition-all duration-300"
      >
        Zurück zum Startbildschirm
      </motion.button>
      
      <motion.button
         onClick={() => {
         localStorage.removeItem("tournamentScores");
         navigate("/");
         }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-800 transition-all duration-300"
         >
  Turnier zurücksetzen
    </motion.button>

    </section>
  );
};

export default ScoreBoard;
