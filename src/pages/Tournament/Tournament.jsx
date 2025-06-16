import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeadHeader from "../ConfigureGame/ConGamcomponents/Header";

const TournamentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <HeadHeader />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1
          className="text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎮 Turnier läuft...
        </motion.h1>

        <motion.button
          onClick={() => navigate("/scoreboard")}
          className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-green-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Scoreboard anzeigen
        </motion.button>
      </main>
    </div>
  );
};

export default TournamentPage;
