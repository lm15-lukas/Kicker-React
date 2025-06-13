import { useEffect, useState } from 'react';
import { usePlayers } from '../context/PlayerContext.js';
import './Tournament.css';
import AddPlayer from './AddPlayer.jsx';
import { WinningLogic } from '../logic/WinningLogic.jsx';
import WinningSets from './WinningSets.jsx';

export default function PlayerTable() {
    const [, setFormData] = useState({
        goals: "",
        length: "",
        points: "",
        date: "",
        sets: "",
    });

    const [matches, setMatches] = useState([]);
    const [playedPlayers, setPlayedPlayers] = useState([]);
    const [showMatchResults, setShowMatchResults] = useState({});

    const storedWinningForm = JSON.parse(localStorage.getItem('form') || "{}");
    const goalsToWin = parseInt(storedWinningForm.goals, 10) || 4;

    const stats = WinningLogic(matches, goalsToWin);

    const { players, addPlayer, removePlayer } = usePlayers();

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

        const newMatch = {
            players: selectedPlayers,
            result: null
        };

        setMatches(prevMatches => [...prevMatches, newMatch]);
    }

    function toggleMatchResult(index) {
        setShowMatchResults(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    function handleResultConfirm(result, index, matchPlayers) {
        const newMatch = {
            players: matchPlayers,
            result: result
        };
        console.log("New Match gespeichert:", newMatch);

        setMatches(prevMatches => {
            const updatedMatches = [...prevMatches];
            updatedMatches[index] = newMatch;
            return updatedMatches;
        });

        setShowMatchResults(prev => ({
            ...prev,
            [index]: false
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
    useEffect(() => {
        console.log("Matches", matches);
        console.log("Stats", stats);
    }, [matches])

    return (
        <div className="layout">
            <div className="match-section">

                {matches.map((match, index) => (
                    <div key={index}>
                        <div className="match-table-players-container">
                            <div className='teams'>
                                <span className='team-border'>Team A</span>
                                <div className="player-side">
                                    <span>{match.players[0]}</span>
                                    <span>{match.players[1]}</span>
                                </div>
                            </div>
                            <div className="center-button">
                                <button
                                    className="enter-results-button"
                                    onClick={() => toggleMatchResult(index)}
                                >
                                    {showMatchResults[index] ? "Close Match Results" : "Enter Match Results"}
                                </button>
                            </div>
                            <div className='teams'>
                                <span className='team-border'>Team B</span>
                                <div className="player-side">
                                    <span>{match.players[2]}</span>
                                    <span>{match.players[3]}</span>
                                </div>
                            </div>
                        </div>

                        {showMatchResults[index] && (
                            <div className="match-table-wrapper">
                                <WinningSets
                                    matchPlayers={match.players}
                                    index={index}
                                    onResultConfirm={handleResultConfirm}
                                />
                            </div>
                        )}
                        
                    </div>
                ))}
                <div className="center-button">
                    <button onClick={startNewRound}>
                        {matches.length === 0 ? "Start First Round" : "Start New Round"}
                    </button>
                </div>
            </div>

            <div className="tournament-container">
                <h2>Participants</h2>
                <AddPlayer onAdd={addPlayer} />
                <table className='player-table' id='costomers'>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Player</th>
                            <th>Games</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Points</th>
                            <th>Goal Diff</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players
                            .map((player) => ({
                                player,
                                ...stats[player] || {
                                    games: 0,
                                    wins: 0,
                                    losses: 0,
                                    points: 0,
                                    goalDiff: 0,
                                }
                            }))
                            .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff)
                            .map((p, index) => (
                                <tr key={p.player}>
                                    <td>{index + 1}</td>
                                    <td>{p.player}</td>
                                    <td>{p.games}</td>
                                    <td>{p.wins}</td>
                                    <td>{p.losses}</td>
                                    <td>{p.points}</td>
                                    <td>{p.goalDiff}</td>
                                    <td>
                                        <button
                                            className="remove-button"
                                            onClick={() => removePlayer(players.indexOf(p.player))}
                                        >
                                            x
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
