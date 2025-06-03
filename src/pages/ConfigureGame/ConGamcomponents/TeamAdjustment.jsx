import { useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import MonsterLogo from './monster.svg';

export default function PlayerInputList() {
    const navigateTournament = useNavigate();

  const [players, setPlayers] = useState(() => {
  const saved = localStorage.getItem("player-names");
  return saved ? JSON.parse(saved) : [""];
});

const inputRefs = useRef([])

useEffect(() =>{
  const lastIndex = players.length -1;
  if(inputRefs.current[lastIndex]){
    inputRefs.current[lastIndex].focus();
  }
},[players.length])

useEffect(()=>{
  localStorage.setItem('player-names', JSON.stringify(players))
},[players])


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
    const updatedPlayers = players.filter((_,i) => i !== index);
    setPlayers(updatedPlayers.length > 0 ? updatedPlayers : [""]);
  };
const handleCreateTournament = () => {
    navigateTournament('/tournament')
}
const isValidPlayerList = () => {
    const nonEmptyPlayers = players.filter(name => name.trim() !== "");
    return nonEmptyPlayers.length >= 4;
  };
  return (
    <>
      <header className="team-header">
        <h1>Monster DYP </h1>
        <div className="button-container">
        <button
  className="create-tournament"
  onClick={handleCreateTournament}
  disabled={!isValidPlayerList()}
>
  Create Tournament
</button>

        </div>  
        <img src={MonsterLogo} alt="ghost" className="ghost-in-team" />
      </header>
      <div>
        <h2 className="center">Enter Player Names</h2>
        <h3 className="center">Minimum 4 Players</h3>
        <ul className="ul-t">
          {players.map((name, index) => (
            <li key={index}>
              <input
                type="text"
                value={name}
                ref={el => inputRefs.current[index] = el}
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
