import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeadHeader from "../ConfigureGame/ConGamcomponents/Header";

const mockTournamentData = [
  { name: "Team Alpha", wins: 3, draws: 1, losses: 0 },
  { name: "Team Bravo", wins: 2, draws: 2, losses: 0 },
  { name: "Team Charlie", wins: 1, draws: 1, losses: 2 },
  { name: "Team Delta", wins: 0, draws: 2, losses: 2 },
];

const calculatePoints = (team) => team.wins * 3 + team.draws;

const ScoreboardPage = () => {
  const navigate = useNavigate();

  const teamsWithPoints = mockTournamentData.map((team) => ({
    ...team,
    points: calculatePoints(team),
  }));

  const sortedTeams = [...teamsWithPoints].sort((a, b) => b.points - a.points);

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
          🏆 Turnier-Scoreboard
        </motion.h1>

        <div className="space-y-4">
          {sortedTeams.map((team, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={team.name}
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
                <span className="text-xl flex-1 truncate">{team.name}</span>
                <span className="text-xl font-bold">{team.points} pts</span>

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
};

export default ScoreboardPage;
