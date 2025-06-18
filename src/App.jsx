import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./pages/Tournament/context/PlayerContext.js";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from"./pages/Tournament/TournamentComponents/Tournament.jsx"
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";
import LoadTournaments from "./pages/Tournament/TournamentComponents/LoadTournament.jsx";

function App() {
  return (
    <>
    <PlayerProvider>
    <Router>
      <Routes>
        <Route path="/configure-game-page" element={<ConfigureGame/>}></Route>
        <Route path="/team-adjustment" element={<TeamAdjustment/>}></Route>
        <Route path="/select-game-mode" element={<SelectGameMode/>}></Route>
        <Route path="/tournament" element={<Tournament/>}></Route>
        <Route path="/load" element={<LoadTournaments/>}></Route>
      </Routes>
      </Router>
      </PlayerProvider>
      </>
  );
}

export default App;