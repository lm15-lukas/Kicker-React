import { useState } from "react";
import "./ConfigureGame.css";
import Header from "./ConGamcomponents/Header.jsx";

export default function ConfigureGame() {
    
    const [step, setStep] = useState("configure");

    const handleAdvance = () => {
        setStep("setup-teams");
    };

    if (step === "setup-teams") {
        return (
         <div className="header">
            <Header/>
            <div className="configure-game-page">
                <div className="form-container">
                    <h2>Setup Teams</h2>
                    <p>Hier kannst du jetzt deine Teams zusammenstellen!</p>
                </div>
            </div>
            </div>
        );
    }
    
    return (
        <div className="header">
            <Header/>
        <div className="configure-game-page">
            
            <div className="form-container">
                <div className="form-item">
                    <label htmlFor="players" className="form-label">Enter number of players</label>
                    <input id="players" className="form-input" type="number" required/>
                </div>

                <div className="form-item">
                    <label htmlFor="goals" className="form-label">Goals to win</label>
                    <input id="goals" className="form-input" type="number" required />
                </div>

                <div className="form-item">
                    <label htmlFor="length" className="form-label">Match length in minutes</label>
                    <input id="length" className="form-input" type="number" required />
                </div>

                <div className="form-item">
                    <label htmlFor="points" className="form-label">Points per win</label>
                    <input id="points" className="form-input" type="number"  required/>
                </div>

                <div className="form-item">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input id="date" className="form-input" type="date" required />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="cancel-button">Cancel</button>
                    <button className="form-button" onClick={handleAdvance}>Advance</button>
                </div>
            </div>
        </div>
        </div>
    );
}
