import { motion } from "framer-motion";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaAtlassian } from "react-icons/fa";
import { useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-red-600 font-bold text-xl mr-3">
            K
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Kickr
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="lg:flex hidden space-x-8">
          {["Tournaments", "Player Profile", "Ranking", "Calender", "Group", "Log out/Leave"].map((item, index) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.7 + index * 0.2 }}
              className="relative text-gray-200 hover:text-red-500 font-semibold transition-colors duration-300 group"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (item === "Tournaments") navigate("/load");
                if (item === "Player Profile") navigate("/betafeature");
                if (item === "Ranking") navigate("/betafeature");
                if (item === "Calender") navigate("/betafeature");
                if (item === "Group") navigate("/betafeature");
                if (item === "Log out/Leave") navigate("/betafeature");
              }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>


        {/* Icons */}
        <div className="md:flex hidden items-center space-x-3">
          {/* Microsoft Teams */}
          <motion.a
            href="https://teams.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
          >
            <BsMicrosoftTeams className="w-6 h-6 text-white" />
          </motion.a>

          {/* Atlassian */}
          <motion.a
            href="https://id.atlassian.com/login"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
          >
            <FaAtlassian className="w-6 h-6 text-white" />
          </motion.a>

          {/* Impressum */}
          <motion.a
            onClick={() => navigate("/impressum")}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="cursor-pointer p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.a>
        </div>

        {/* Play Button */}
        <motion.button
          onClick={() => navigate("/configure")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="hidden md:block ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-red-700 font-bold hover:from-red-700 hover:to-green-700 hover:text-white transition-all duration-500"
        >
          Play
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
