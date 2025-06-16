import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from "./pages/Tournament/Tournament";
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";
import LandingPage from "./pages/CreateGame/LandingPage.jsx";
import HeroSection from "./pages/CreateGame/HeroSection.jsx";
import ScoreBoard from "./pages/ScoreBoard/ScoreBoard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
      </Routes>
    </Router>
  );
}

export default App;