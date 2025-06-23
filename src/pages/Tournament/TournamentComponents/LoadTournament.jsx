import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadTournament.css';
import { motion } from 'framer-motion';

export default function LoadTournaments() {

    const [savedTournaments, setSavedTournaments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('saved-tournaments') || '[]');
        setSavedTournaments(stored);
    }, []);

    const handleLoad = (tournament) => {
        localStorage.setItem('tournament-name', tournament.name);
        localStorage.setItem('matches', JSON.stringify(tournament.matches));
        localStorage.setItem('playedPLayers', JSON.stringify([]));
        localStorage.setItem('players', JSON.stringify(tournament.players));


        if (tournament.formData) {
            localStorage.setItem('form', JSON.stringify(tournament.formData))

        } else {
            localStorage.setItem('form', JSON.stringify({
                goals: "",
                length: "",
                points: "",
                sets: "",
                date: "",
            }));
        }
        localStorage.setItem('results', JSON.stringify(tournament.results || []));

        navigate('/tournament');
    }


    function handleDelete(index) {
        const updated = [...savedTournaments];
        updated.splice(index, 1);
        localStorage.setItem('saved-tournaments', JSON.stringify(updated));
        setSavedTournaments(updated);
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Load Saved Tournaments
                </motion.h2>
                {savedTournaments.length === 0 ? (
                    <motion.p
                        className='text-gray-600 dark:text-gray-300 text-lg'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        No saved tournaments found.
                    </motion.p>
                ) : (
                    <motion.ul
                        className="w-full max-w-2xl space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {savedTournaments.map((t, index) => (
                            <motion.li
                                key={index}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 flex justify-between items-center hover:shadow-2xl transition-all"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                            >
                                <div>
                                    <strong className='font-semibold text-gray-900 dark:text-gray-100'>{t.name}</strong> <br />
                                    <small className='text-gray-500 dark:text-gray-400'>{new Date(t.date).toLocaleString()}</small>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleLoad(t)}
                                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-400 to-gray-100 text-red-700 font-semibold hover:from-red-700 hover:to-greem-700 hover:text-white transition-all duration-300"
                                    >Load</button>
                                    <button onClick={() => handleDelete(index)}
                                        className='px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold hover:from-gray-700 hover:to-black transition-all duration-300'
                                    >Delete</button>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </div>
            
        </>
    );
}
