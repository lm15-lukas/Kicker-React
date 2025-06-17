import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadTournament.css';

export default function LoadTournaments() {
    
    const [savedTournaments, setSavedTournaments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('saved-tournaments') || '[]');
        setSavedTournaments(stored);
    }, []);

const handleLoad=(tournament) => {
    localStorage.setItem('tournament-name', tournament.name);
    localStorage.setItem('matches', JSON.stringify(tournament.matches));
    localStorage.setItem('playedPLayers', JSON.stringify([]));
    localStorage.setItem('players', JSON.stringify(tournament.players));
    
    
    if(tournament.formData){
        localStorage.setItem('form',JSON.stringify(tournament.formData))

    }else{
        localStorage.setItem('form',JSON.stringify({
            goals:"",
            length:"",
            points:"",
            sets:"",
            date:"",
        }));
    }
    localStorage.setItem('results',JSON.stringify(tournament.results ||[]));
    
    navigate('/tournament');
}


    function handleDelete(index) {
        const updated = [...savedTournaments];
        updated.splice(index, 1);
        localStorage.setItem('saved-tournaments', JSON.stringify(updated));
        setSavedTournaments(updated);
    }

    return (
        <div className="load-tournament-container">
            <h2>Load Saved Tournaments</h2>
            {savedTournaments.length === 0 ? (
                <p>No saved tournaments found.</p>
            ) : (
                <ul className="tournament-list">
                    {savedTournaments.map((t, index) => (
                        <li key={index} className="tournament-item">
                            <div>
                                <strong>{t.name}</strong> <br />
                                <small>{new Date(t.date).toLocaleString()}</small>
                            </div>
                            <div className="load-buttons">
                                <button className="load-button" onClick={() => handleLoad(t)}>Load</button>
                                <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
