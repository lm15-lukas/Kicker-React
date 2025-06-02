import { useState } from "react";
import MonsterLogo from './monster.svg';

export default function PlayerInputList() {
  const [players, setPlayers] = useState([""]);

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (players[index].trim() !== "") {
        setPlayers([...players, ""]);
      }
    }
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers.length > 0 ? updatedPlayers : [""]);
  };

  return (
    <>
      <header className="team-header">
        <h1>Monster DYP</h1>
        <img src={MonsterLogo} alt="ghost" className="ghost-in-team" />
      </header>
      <div className="center">
        <h2 className="cemter">Enter Player Names</h2>
        <ul className="ul-t">
          {players.map((name, index) => (
            <li key={index}>
              <input
                type="text"
                value={name}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={`Player ${index + 1}`}
                className="player-input"
              />
              <button
                type="button"
                onClick={() => handleRemovePlayer(index)}
                title="Remove"
                className="remove-btn"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
