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

  const removePlayer = (name) => {
    setPlayers((prev) =>prev.filter((player) =>player!== name))

  };

  return (
    <PlayerContext.Provider value={{ players, setPlayers, addPlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
