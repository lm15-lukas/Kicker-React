import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./pages/Tournament/TournamentComponents/PlayerContext.js";

import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from "./pages/Tournament/Tournament";
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";

function App() {
  return (
    <>
    <PlayerProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ConfigureGame/>}></Route>
        <Route path="/team-adjustment" element={<TeamAdjustment/>}></Route>
        <Route path="/select-game-mode" element={<SelectGameMode/>}></Route>
        <Route path="/tournament" element={<Tournament/>}></Route>
      </Routes>
      </Router>
      </PlayerProvider>
      </>
  );
}

export default App;