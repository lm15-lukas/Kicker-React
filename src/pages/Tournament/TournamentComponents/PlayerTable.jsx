import { useEffect, useState } from 'react';
import { usePlayers } from '../context/PlayerContext.js';
import './Tournament.css';
import AddPlayer from './AddPlayer.jsx';
import { WinningLogic } from '../logic/WinningLogic.jsx';
import WinningSets from './WinningSets.jsx';
import FormatResults from './FormatResults.jsx';
import Trashbin from '../assets/images/trash-solid.svg';
import { useNavigate } from 'react-router-dom';

export default function PlayerTable() {
    const [, setFormData] = useState({
        goals: "",
        length: "",
        points: "",
        date: "",
        sets: "",
    });
const handleSaveTournamentNavigate= useNavigate();
    const [matches, setMatches] = useState(() => {
        const saved = localStorage.getItem('matches');
        return saved ? JSON.parse(saved) : [];
    });
    const [playedPlayers, setPlayedPlayers] = useState(() => {
        const saved = localStorage.getItem('playedPLayers');
        return saved ? JSON.parse(saved) : [];
    });
    const [showMatchResults, setShowMatchResults] = useState({});
    const [matchToDelete, setMatchToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const storedWinningForm = JSON.parse(localStorage.getItem('form') || "{}");
    const goalsToWin = parseInt(storedWinningForm.goals, 10) || 4;

    const tournamentName = localStorage.getItem('tournament-name') || 'Unnamed Tournament';
    const stats = WinningLogic(matches, goalsToWin);

    const { players, removePlayer } = usePlayers();

    useEffect(() => {
        localStorage.setItem('matches', JSON.stringify(matches));
    }, [matches]);

    useEffect(() => {
        localStorage.setItem('playedPLayers', JSON.stringify(playedPlayers));
    }, [playedPlayers]);

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

    function shuffle(array) {
        return [...array].sort(() => 0.5 - Math.random());
    }

    function toggleMatchResult(index) {
        setShowMatchResults(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    function confirmDeleteMatch(index) {
        setMatchToDelete(index);
        setShowDeleteModal(true);
    }

    function removeMatch() {
        if (matchToDelete !== null) {
            setMatches(prevMatches => prevMatches.filter((_, i) => i !== matchToDelete));
            setMatchToDelete(null);
            setShowDeleteModal(false);
        }
    }

    function handleResultConfirm(result, index, matchPlayers) {
        const newMatch = {
            players: matchPlayers,
            result: result
        };

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

    function saveTournament() {
        const newTournament = {
            name: tournamentName,
            date: new Date().toISOString(),
            players,
            matches,
            stats
        };

        const saved = JSON.parse(localStorage.getItem('saved-tournaments') || '[]');
        saved.push(newTournament);
        localStorage.setItem('saved-tournaments', JSON.stringify(saved));

        
        localStorage.removeItem('matches');
        localStorage.removeItem('playedPLayers');
        localStorage.removeItem('form');
        localStorage.removeItem('tournament-name');

       
        
        
        handleSaveTournamentNavigate('/configure-game-page')
    }

    return (
        <div className="layout">
            <div className="match-section">
                {matches.map((match, index) => (
                    <div key={index}>
                        <div className="match-table-players-container">
                            <div className='teams'>
                                <button className='remove-match-button' onClick={() => confirmDeleteMatch(index)}>
                                    <img src={Trashbin} alt="trash" />
                                </button>
                                <span className='team-border'>Team A</span>
                                <div className="player-side">
                                    <span>{match.players[0]}</span>
                                    <span>{match.players[1]}</span>
                                </div>
                            </div>

                            <div className="center-button">
                                <FormatResults resultArray={match.result} />
                                <button
                                    className="enter-results-button"
                                    onClick={() => toggleMatchResult(index)}
                                >
                                    {showMatchResults[index] ? "Close Match Results" : "Enter Match Results"}
                                </button>
                            </div>

                            <div className='teams'>
                                <span className='team-border'>Team B</span>
                                <div className='teams'>
                                    <div className="player-side">
                                        <span>{match.players[2]}</span>
                                        <span>{match.players[3]}</span>
                                    </div>
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
                <h2>{tournamentName}</h2>
                <h3>Participants</h3>
                <AddPlayer />
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
                <div className="center-button">
                    <button className="save-tournament-button" onClick={() => setShowSaveModal(true)}>
                        Save Tournament
                    </button>
                </div>
            </div>

            {showDeleteModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <p>Are you sure you want to delete this match?</p>
                        <div className='modal-buttons'>
                            <button className='cancel-button' onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className='confirm-button' onClick={removeMatch}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Save Tournament "{tournamentName}"?</h3>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={saveTournament}>Yes, Save</button>
                            <button className="cancel-button" onClick={() => setShowSaveModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
