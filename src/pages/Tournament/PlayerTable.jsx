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
    const [playedPlayers, setPlayedPlayers] = useState([]);
    const [currentMatchPlayers, setCurrentMatchPlayers] = useState([]);


    function startNewRound() {
        const unplayed = playerNames.filter(p => !playedPlayers.includes(p));
        const played = playerNames.filter(p => playedPlayers.includes(p));

        let selectedPlayers = [];


        if (unplayed.length >= 2 && played.length >= 2) {
            const newOnes = shuffle(unplayed).slice(0, 2);
            const experienced = shuffle(played).slice(0, 2);
            selectedPlayers = [...newOnes, ...experienced];
        } else {

            selectedPlayers = shuffle(playerNames).slice(0, 4);
        }

        setCurrentMatchPlayers(selectedPlayers);


        const updatedPlayed = [...new Set([...playedPlayers, ...selectedPlayers])];
        setPlayedPlayers(updatedPlayed);
    }


    function shuffle(array) {
        return [...array].sort(() => 0.5 - Math.random());
    }


    useEffect(() => {
        console.log("Loaded form:", localStorage.getItem('form'));
        console.log("Loaded player names:", localStorage.getItem('player-names'));

        const storedForm = localStorage.getItem('form')
        const storedPlayerNames = localStorage.getItem('player-names');

        if (storedForm) {
            setFormData(JSON.parse(storedForm));
        }

        if (storedPlayerNames) {
            const parsedNames = JSON.parse(storedPlayerNames).filter(name => name.trim() !== "");
            setPlayerNames(parsedNames);
        }

    }, []);

    return (
        <>
            <div className="layout">
                <div className="match-section">
                    <div className="match-table-players-container">
                        <div className="player-side left-side">
                            <span>{currentMatchPlayers[0]}</span>
                            <span>{currentMatchPlayers[1]}</span>
                        </div>
                        <div className="center-button">
                            <button onClick={startNewRound}>New Round</button>
                        </div>
                        <div className="player-side right-side">
                            <span>{currentMatchPlayers[2]}</span>
                            <span>{currentMatchPlayers[3]}</span>
                        </div>
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