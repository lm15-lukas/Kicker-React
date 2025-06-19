import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeadHeader from '../ConfigureGame/ConGamcomponents/Header';

const ScoreboardPage = () => {
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const savedTournaments = JSON.parse(localStorage.getItem('saved-tournaments') || '[]');
    const lastTournament = savedTournaments[savedTournaments.length - 1]; // → letztes gespeichertes Turnier
    setTournament(lastTournament);
  }, []);

  if (!tournament) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No tournament data available.</p>
      </div>
    );
  }

  const statsArray = Object.entries(tournament.stats).map(([player, stats]) => ({
    player,
    ...stats,
  }));

  const sortedStats = [...statsArray].sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-900 to-black text-white">
      <HeadHeader />

      <main className="pt-24 px-4 pb-16 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🏆 {tournament.name}
        </motion.h1>

        <div className="space-y-4">
          {sortedStats.map((entry, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={entry.player}
                className={`relative flex justify-between items-center p-4 rounded-lg shadow-md ${
                  isTop
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-200 text-black ring-4 ring-yellow-500"
                    : "bg-gray-800 text-white"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-xl font-bold w-10">{index + 1}.</span>
                <span className="text-xl flex-1 truncate">{entry.player}</span>
                <span className="text-xl font-bold">{entry.points} pts</span>

                {isTop && (
                  <motion.div
                    className="absolute -top-4 -right-4 text-3xl"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    🏆
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-4 left-4 flex space-x-2 z-50">
        <motion.button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.button>
      </div>
    </div>
  );
};

export default ScoreboardPage;
