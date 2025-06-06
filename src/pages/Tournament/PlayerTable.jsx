import { useEffect, useState } from 'react';
import { usePlayers } from './TournamentComponents/PlayerContext.js';
import './Tournament.css';
import Button from './TournamentComponents/Button.jsx';
import AddPlayer from './AddPlayer.jsx';

export default function PlayerTable() {
    const [, setFormData] = useState({
        players: "",
        goals: "",
        length: "",
        points: "",
        date: ""
    });

    const { players, addPlayer, removePlayer } = usePlayers();

    const [matches, setMatches] = useState([]);
    const [playedPlayers, setPlayedPlayers] = useState([]);
    const [showMatchResults, setShowMatchResults] = useState({});

    function startNewRound() {
        const unplayed = players.filter(p => !playedPlayers.includes(p));
        const played = players.filter(p => playedPlayers.includes(p));

        let selectedPlayers = [];

        if (unplayed.length >= 2 && played.length >= 2) {
            const newOnes = shuffle(unplayed).slice(0, 2);
            const experienced = shuffle(played).slice(0, 2);
            selectedPlayers = [...newOnes, ...experienced];
        } else {
            selectedPlayers = shuffle(players).slice(0, 4);
        }

        const updatedPlayed = [...new Set([...playedPlayers, ...selectedPlayers])];
        setPlayedPlayers(updatedPlayed);
        setMatches(prevMatches => [...prevMatches, selectedPlayers]);
    }

    function toggleMatchResult(index) {
        setShowMatchResults(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    function shuffle(array) {
        return [...array].sort(() => 0.5 - Math.random());
    }

    useEffect(() => {
        const storedForm = localStorage.getItem('form');
        if (storedForm) {
            setFormData(JSON.parse(storedForm));
        }
    }, []);

    return (
        <div className="layout">
            <div className="match-section">
                <div className="center-button">
                    <button onClick={startNewRound}>
                        {matches.length === 0 ? "Start First Round" : "Start New Round"}
                    </button>
                </div>
                {matches.map((matchPlayers, index) => (
                    <div key={index}>
                        <div className="match-table-players-container">
                            <div className="player-side left-side">
                                <span>{matchPlayers[0]}</span>
                                <span>{matchPlayers[1]}</span>
                            </div>
                            <div className="center-button">
                                <button
                                    className="enter-results-button"
                                    onClick={() => toggleMatchResult(index)}
                                >
                                    {showMatchResults[index]
                                     ? "Close Match Results" : "Enter Match Results"}
                                </button>
                            </div>
                            <div className="player-side right-side">
                                <span>{matchPlayers[2]}</span>
                                <span>{matchPlayers[3]}</span>
                            </div>
                        </div>
                        {showMatchResults[index] && (
                            <div className="match-table-container">
                                <Button />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="tournament-container">
                <h2>Participants</h2>
                <AddPlayer onAdd={addPlayer} />
                <table className='player-table'>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Player</th>
                            <th>Games</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Points</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{player}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>
                                    <button 
                                    className="remove-button" 
                                    onClick={() => removePlayer(index)}
                                    >
                                        ×
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
