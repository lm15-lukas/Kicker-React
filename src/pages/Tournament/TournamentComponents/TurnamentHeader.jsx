import { useNavigate } from "react-router-dom";
import Trophy from "../assets/images/trophy-solid.svg";
export default function TournamentHeader() {
    const tournamentName= localStorage.getItem('tournament-name')
    const navigatToScoreBoard = useNavigate();
    const handleEndTournament =() =>{
        navigatToScoreBoard('/score-board');
    }
    return (
        <header className="header">
            <div>
            <img src={Trophy} alt="trophy" className="trophy"/>
            <button className="tournament-End" onClick={handleEndTournament}>End Tournament</button>
            <h1>Tournament: "{tournamentName}"</h1> 
            </div>
        </header>
    )
}