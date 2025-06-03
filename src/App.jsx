import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from "./pages/Tournament/Tournament";
import TeamAdjustment from "./pages/ConfigureGame/ConGamcomponents/TeamAdjustment.jsx";
import SelectGameMode from "./pages/ConfigureGame/ConGamcomponents/SelectGameMode.jsx";
import LandingPage from "./pages/CreateGame/LandingPage.jsx";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
    <LandingPage />
      <HeroSection />
    <Router>
      <Routes>
        <Route path="/" element={<ConfigureGame/>}></Route>
        <Route path="/team-adjustment" element={<TeamAdjustment/>}></Route>
        <Route path="/select-game-mode" element={<SelectGameMode/>}></Route>
        <Route path="/tournament" element={<Tournament/>}></Route>
      </Routes>
      </Router>
      </>
  );
}

export default App;