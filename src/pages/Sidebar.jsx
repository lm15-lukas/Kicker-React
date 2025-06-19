import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Settings, Table, FolderPlus, PlayCircle } from "lucide-react";

export default function Sidebar() {
  const links = [
    { to: "/configure-game-pgae", label: "Home", icon: <Home size={20} /> },
    { to: "/configure", label: "Configure", icon: <FolderPlus size={20} /> },
    { to: "/tournament", label: "Player Table", icon: <Table size={20} /> },
    { to: "/load", label: "Load Tournament", icon: <PlayCircle size={20} /> },
    { to: "/configure", label: "Configure", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-gray-900 text-white w-60 h-screen fixed top-0 left-0 shadow-xl flex flex-col"
    >
      <div className="p-4 text-2xl font-bold text-green-500 border-b border-gray-700">
    Kickr
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
