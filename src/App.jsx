import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigureGame from "./pages/ConfigureGame/ConfigureGame";
import Tournament from "./pages/Tournament/Tournament";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ConfigureGame/>}></Route>
        <Route path="/tournament" element={<Tournament/>}></Route>
      </Routes>
      </Router>
      </>
  );
}

export default App;