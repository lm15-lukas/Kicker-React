import logoImg from './gamepad-solid.svg';
import { motion } from 'framer-motion';

export default function HeadHeader() {
  return (
    <header className='bg-gray-900 text-white p-4 flex items-center justify-center shadow-lg'>
      <motion.img
        src={logoImg}
        alt="controller"
        className='w-10 h-10 mr-4'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h1
        className='text-2xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Kickr
      </motion.h1>
    </header>
  );
}