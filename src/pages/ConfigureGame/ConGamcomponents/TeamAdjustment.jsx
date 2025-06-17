import { useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import MonsterLogo from './monster.svg';

export default function PlayerInputList() {
  const [error,setError] =useState('');
  const[showTournamentNameInput,setShowTournamentInput] =useState(false);
  const [ tournamentName,setTournamentName]= useState("");

  const hasDuplicateNames = () => {
  const trimmedNames = players.map(name => name.trim()).filter(name => name !== "");
  const nameSet = new Set(trimmedNames);
  return nameSet.size !== trimmedNames.length;
};

const findDuplicateName = () => {
  const seen = {};
  
  for (let name of players) {
    const trimmed = name.trim();
    if (trimmed === "") continue;

    const lower = trimmed.toLowerCase();
    if (seen[lower]) {
      return trimmed;
    } else {
      seen[lower] = true;
    }
  }

  return null;
};
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
  if (!isValidPlayerList()) {
    setError("At least 4 player names are required.");
    return;
  }

  const duplicateName = findDuplicateName();
  if (duplicateName) {
    setError(`The name "${duplicateName}" is used more than once.`);
    return;
  }

  setError("");
  setShowTournamentInput(true);
};
const handleConfirmTournament = ()=>{
  if(tournamentName.trim() === ""){
    setError("Please enter a tournament Name")
    return;
  }
  localStorage.setItem('tournament-name',tournamentName.trim());
  localStorage.setItem('player',JSON.stringify(players.filter(name => name.trim()!== "")));
  localStorage.setItem('matches',JSON.stringify([]));
  localStorage.setItem('playedPlayer',JSON.stringify([]));
  localStorage.setItem('results',JSON.stringify([]));

  navigateTournament('/tournament');
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

>
  Create Tournament
</button>

        </div>  
        <img src={MonsterLogo} alt="ghost" className="ghost-in-team" />
      </header>
      <div>
        <h2 className="center">Enter Player Names</h2>
        <h3 className="center">Minimum 4 Players</h3>
        {error && <p className="error-message ">{error}</p>}

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
      {showTournamentNameInput &&(
        <div className="tournament-name-modal">
          <h3>Enter Tournament Name</h3>
          <input 
          type="text" 
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Tournament Name"
          className="tournament-name-input"
          />
          <div className="modal-buttons">
            <button  className="confirm-button" onClick={handleConfirmTournament}> Start Tournament</button>
            <button  className="cancel-modal-button" onClick={()=> setShowTournamentInput(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
