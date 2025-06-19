import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./pages/Tournament/context/PlayerContext.jsx";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from"./pages/Tournament/TournamentComponents/Tournament.jsx"
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";
import LandingPage from "./pages/CreateGame/LandingPage.jsx";
import HeroSection from "./pages/CreateGame/HeroSection.jsx";
import ScoreBoard from "./pages/ScoreBoard/components/ScoreBoard.jsx"
import LoadTournaments from "./pages/Tournament/TournamentComponents/LoadTournament.jsx";
import Sidebar from "./pages/Sidebar.jsx";

function App() {
  return (
    <>
    <PlayerProvider>
    <Router>
      <div style={{display:"flex"}}>
        <Sidebar />
        <main style={{flexGrow: 1}}>
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
      </main>
      </div>
    </Router>
      </PlayerProvider>
      </>
  );
}

export default App;