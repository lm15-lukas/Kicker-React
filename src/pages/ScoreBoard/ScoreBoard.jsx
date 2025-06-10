import { motion } from 'framer-motion';

const ScoreBoard = ({ teams }) => {
  // Beispiel-Daten, falls keine Teams übergeben werden
  const sampleTeams = [
    { name: 'Team Alpha', points: 12 },
    { name: 'Team Bravo', points: 9 },
    { name: 'Team Charlie', points: 15 },
    { name: 'Team Delta', points: 6 },
  ];

  const sortedTeams = (teams || sampleTeams).sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏆 Scoreboard
      </motion.h1>

      <div className="w-full max-w-3xl space-y-4">
        {sortedTeams.map((team, index) => (
          <motion.div
            key={team.name}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-black'
                : 'bg-gray-800'
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
    </div>
  );
};

export default ScoreBoard;