import { motion } from "framer-motion";
import { SiPersonio } from "react-icons/si";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaAtlassian } from "react-icons/fa";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ Navigation importieren

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate(); // ✅ Navigation Hook

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
          className="flex items-center"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-red-600 font-bold text-xl mr-3">K</div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">Kickr</span>
        </motion.div>

        {/* Navigation */}
        <nav className="lg:flex hidden space-x-8">
          {["Tournaments","Player Profile", "Ranking", "Calender", "Group", "Log out/Leave"].map((item, index) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.7 + index * 0.2 }}
              className="relative text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-300 group"
              href="#"
              onClick={(e) =>{
                e.preventDefault();
                if(item === "Tournaments") navigate("/load");
              }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        {/* Icons */}
        <div className="md:flex hidden items-center space-x-4">
          <motion.a href="https://impaq.personio.de/login/index" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
            <SiPersonio className="w-5 h-5" />
          </motion.a>
          <motion.a href="https://teams.microsoft.com" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
            <BsMicrosoftTeams className="w-5 h-5" />
          </motion.a>
          <motion.a href="https://id.atlassian.com/login" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
            <FaAtlassian className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Spielen Button (Desktop) */}
        <motion.button
          onClick={() => navigate("/configure")} // ✅ Navigation aktivieren
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          className="hidden md:block ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-red-700 font-bold hover:from-red-700 hover:to-green-700 hover:text-white transition-all duration-500"
        >
          Play
        </motion.button>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button whileTap={{ scale: 0.7 }} onClick={toggleMenu} className="text-gray-300">
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
      >
        <nav className="flex flex-col space-y-3">
          {["Tournaments","Player Profile", "Ranking", "Calender", "Group", "Log out/Leave"].map((item) => (
            <a onClick={toggleMenu} className="text-gray-300 font-medium py-2" key={item} href="#">
              {item}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            <a href="https://impaq.personio.de/login/index" target="_blank" rel="noopener noreferrer">
              <SiPersonio className="h-5 w-5 text-gray-300" />
            </a>
            <a href="https://teams.microsoft.com" target="_blank" rel="noopener noreferrer">
              <BsMicrosoftTeams className="h-5 w-5 text-gray-300" />
            </a>
            <a href="https://id.atlassian.com/login" target="_blank" rel="noopener noreferrer">
              <FaAtlassian className="h-5 w-5 text-gray-300" />
            </a>
          </div>

          {/* Spielen Button (Mobile) */}
          <button
            onClick={() => {
              toggleMenu();
              navigate("/configure"); // ✅ Navigation aktivieren
            }}
            className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-bold"
          >
            Play
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;