import { useNavigate } from "react-router-dom";
import Trophy from "../assets/images/trophy-solid.svg";
export default function TournamentHeader() {
    const navigatToScoreBoard = useNavigate();
    const handleEndTournament =() =>{
        navigatToScoreBoard('/score-board');
    }
    return (
        <header className="header">
            <img src={Trophy} alt="trophy" className="trophy"/>
            <button className="tournament-End" onClick={handleEndTournament}>End Tournament</button>
            <h1>Tournament XY</h1> 
        </header>
    )
}