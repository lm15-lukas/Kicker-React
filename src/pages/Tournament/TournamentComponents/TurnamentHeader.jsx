import { useNavigate } from "react-router-dom";
import Trophy from "../assets/images/trophy-solid.svg";
import { motion } from "framer-motion";
import FinalRound from "./FinalRound";

export default function TournamentHeader({onEndTournament}) {
  const tournamentName = localStorage.getItem("tournament-name") || "Unnamed Tournament";
  const navigate = useNavigate();

  const handleEndTournament = () => {
    onEndTournament();
    navigate("/scoreboard");
  };
  function handleFinalRound(){
  navigate('/finalRound')
  }

  return (
    <header className="bg-gray-900 text-white py-4 px-6 pl-64 flex justify-between items-center shadow-lg rounded-b-xl">
      <div className="flex items-center space-x-4">
        <img src={Trophy} alt="Trophy" className="w-8 h-8 text-yellow-400" />
        <h1 className="text-2xl font-semibold">Tournament: "{tournamentName}"</h1>
      </div>
      <div className="flex gap-5">
      <motion.button
        onClick={handleEndTournament}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        End Tournament
      </motion.button>
      <motion.button
      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
      onClick={handleFinalRound}
      >
        Play final Round
      </motion.button>
      </div>
    </header>
  );
}
