import { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export function usePlayers() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("player-names");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("player-names", JSON.stringify(players));
  }, [players]);

  const addPlayer = (name) => {
    if (name.trim() !== "") {
      setPlayers((prev) => [...prev, name.trim()]);
    }
  };

  const removePlayer = (index) => {
    setPlayers((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length > 0 ? updated : [""];
    });
  };

  return (
    <PlayerContext.Provider value={{ players, setPlayers, addPlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
