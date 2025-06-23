import logoImg from './gamepad-solid.svg';
import { motion } from 'framer-motion';

export default function HeadHeader() {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-center shadow-lg relative z-10">
      <motion.div
        className="relative group"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logoImg}
          alt="controller"
          className="w-10 h-10 mr-4 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition duration-300"
        />
      </motion.div>

      <motion.h1
      
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Kickr
      </motion.h1>
    </header>
  );
}
