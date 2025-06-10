import { useState } from 'react';
import TeamAdjustment from './TeamAdjustment.jsx';
import monster from './monster.svg';
import play from './play-solid.svg';
import HeadHeader from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SelectGameMode() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState('');

  const handleTeamAdjustment = () => {
    setTeams("team-building");
    navigate('/team-adjustment');
  };

  if (teams === "team-building") {
    return <TeamAdjustment />;
  }

  return (
    <>
      <HeadHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Select a Game Mode
        </motion.h1>
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-all"
            onClick={handleTeamAdjustment}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={monster} alt="ghost" className="w-16 h-16 mb-4" />
            <img src={play} alt="playbutton" className="w-8 h-8 mb-4" />
            <h4 className="text-xl font-bold">Monster DYP</h4>
          </motion.div>
        </div>
      </div>
    </>
  );
}
