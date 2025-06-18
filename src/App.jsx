import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./pages/Tournament/context/PlayerContext.jsx";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from"./pages/Tournament/TournamentComponents/Tournament.jsx"
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";
import LandingPage from "./pages/CreateGame/LandingPage.jsx";
import HeroSection from "./pages/CreateGame/HeroSection.jsx";
import ScoreBoard from "./pages/ScoreBoard/ScoreBoard.jsx";
import LoadTournaments from "./pages/Tournament/TournamentComponents/LoadTournament.jsx";

function App() {
  return (
    <>
    <PlayerProvider>
    <Router>
      <Routes>
        <Route path="/configure-game-page" element={
          <>
            <LandingPage />
            <HeroSection />
          </>
        } />
        <Route path="/configure" element={<ConfigureGame />} />
        <Route path="/team-adjustment" element={<TeamAdjustment />} />
        <Route path="/select-game-mode" element={<SelectGameMode />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/load" element={<LoadTournaments/>}></Route>
      </Routes>
    </Router>
      </PlayerProvider>
      </>
  );
}

export default App;