import { motion } from "framer-motion";
import HeadHeader from "../ConfigureGame/ConGamcomponents/Header";

const mockTournamentData = [
  { name: "Team Alpha", wins: 3, draws: 1, losses: 0 },
  { name: "Team Bravo", wins: 2, draws: 2, losses: 0 },
  { name: "Team Charlie", wins: 1, draws: 1, losses: 2 },
  { name: "Team Delta", wins: 0, draws: 2, losses: 2 },
];

// Punktevergabe: Sieg = 3, Unentschieden = 1, Niederlage = 0
const calculatePoints = (team) => team.wins * 3 + team.draws;

const ScoreboardPage = () => {
  const teamsWithPoints = mockTournamentData.map((team) => ({
    ...team,
    points: calculatePoints(team),
  }));

  const sortedTeams = teamsWithPoints.sort((a, b) => b.points - a.points);

  return (
    <div className="bg-black text-white min-h-screen">
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
          {sortedTeams.map((team, index) => (
            <motion.div
              key={team.name}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black"
                  : "bg-gray-800"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="text-xl font-bold w-10">{index + 1}.</span>
              <span className="text-xl flex-1">{team.name}</span>
              <span className="text-xl font-bold">{team.points} pts</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScoreboardPage;