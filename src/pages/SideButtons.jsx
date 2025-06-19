import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function SideButtons() {
    const navigate =useNavigate();
    return (
        <>
            <div className="fixed bottom-4 left-4 flex space-x-2 z-50">
                <motion.button
                    onClick={() => navigate(-1)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back
                </motion.button>
                <motion.button
                    onClick={() => navigate("/configure-game-page")}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Homepage
                </motion.button>
            </div>
        </>
    )
}