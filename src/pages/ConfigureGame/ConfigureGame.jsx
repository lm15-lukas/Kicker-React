import "./ConfigureGame.css";
import AdVanceButton from "./components/Advancebutton";


export default function ConfigureGame() {
    return (
        <div className="configure-game-page">
            <div className="form-container">
                <div className="form-item">
                    <label htmlFor="players" className="form-label">Enter number of players</label>
                    <input id="players" className="form-input" type="number" />
                </div>

                <div className="form-item">
                    <label htmlFor="goals" className="form-label">Goals to win</label>
                    <input id="goals" className="form-input" type="number" />
                </div>

                <div className="form-item">
                    <label htmlFor="length" className="form-label">Match length in minutes</label>
                    <input id="length" className="form-input" type="number" />
                </div>

                <div className="form-item">
                    <label htmlFor="points" className="form-label">Points per win</label>
                    <input id="points" className="form-input" type="number" />
                </div>

                <div className="form-item">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input id="date" className="form-input" type="date" required />
                </div>

                <button className="cancel-button">Cancel</button>
                <button className="form-button" onClick={AdVanceButton}>Advance</button>
                
            </div>
        </div>
    );
}
