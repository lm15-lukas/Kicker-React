import './TournamentManager.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TournamentManager() {
  const [tournaments, setTournaments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tournaments") || "{}");
    setTournaments(stored);
  }, []);

  function deleteTournament(name) {
    const updated = { ...tournaments };
    delete updated[name];
    localStorage.setItem("tournaments", JSON.stringify(updated));
    setTournaments(updated);
  }

  function loadTournament(name) {
    localStorage.setItem("activeTournament", JSON.stringify(tournaments[name]));
    navigate("/tournament"); 
  }

  return (
    <div className="tournament-manager">
      <h2>Saved Tournaments</h2>
      {Object.keys(tournaments).length === 0 && <p>No tournaments saved yet.</p>}
      
      <ul className="tournament-list">
        {Object.entries(tournaments).map(([name, tournament]) => (
          <li key={name} className="tournament-item">
            <div className="tournament-info">
              <strong>{name}</strong> 
              <small>{tournament.players.length} players, {tournament.matches.length} matches</small>
            </div>
            <div className="tournament-actions">
              <button className="load-button" onClick={() => loadTournament(name)}>Load</button>
              <button className="delete-button" onClick={() => deleteTournament(name)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
