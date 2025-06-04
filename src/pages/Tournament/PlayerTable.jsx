import { useEffect, useState } from 'react';
import './Tournament.css';
import Button from './TournamentComponents/Button.jsx';

export default function PlayerTable() {
    const [formData, setFormData] = useState({
        players: "",
        goals: "",
        length: "",
        points: "",
        date: ""
    })

    const [playerNames, setPlayerNames] = useState([]);

    useEffect(() => {
        console.log("Loaded form:", localStorage.getItem('form'));
        console.log("Loaded player names:", localStorage.getItem('player-names'));
        
        const storedForm = localStorage.getItem('form')
        const storedPlayerNames = localStorage.getItem('player-names');

        if (storedForm) {
            setFormData(JSON.parse(storedForm));
        }
        if (storedPlayerNames) {
            setFormData(JSON.parse(storedPlayerNames));
        }
        if (storedPlayerNames) {
            const parsedNames = JSON.parse(storedPlayerNames).filter(name => name.trim() !== "");
            setPlayerNames(parsedNames);
        }

    }, []);


    const numberOfPlayers = parseInt(formData.players) || 0;
    const players = Array.from({ length: numberOfPlayers }, (_, i) => `Player ${i + 1}`);

    return (
        <>
            <div className="layout">
                <div className="match-section">
                    <div className="match-table-players-container">
                        {players.slice(0, 2).map((p, i) => (
                            <span key={i} className="match-table-player-container-span">{p}</span>
                        ))}
                    </div>
                    <div className="match-table-container">

                        <Button></Button>
                    </div>
                </div>

                <div className="tournament-container">
                    <h2>Participants</h2>
                    <table className='player-table'>
                        <thead>
                            <tr>

                                <th>Place</th>
                                <th>Player</th>
                                <th>Games</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerNames.map((player, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{player}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            ))}
                        </tbody>
                </table>


            </div>
        </div >
        </>
    )
}