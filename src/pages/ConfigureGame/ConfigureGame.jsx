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
            
           <>
            <Header/>
            <main className="color">
                <div className="team-form-container">
                    <div className="team-option green">
                        <div className="title">Team Names</div>
                    </div>
                    <div className="team-option orange">
                        <div className="title">Alone</div>
                    </div>
                    <div className="team-option teal">
                        <div className="title">Double</div>
                    </div>
                    <div className="team-option blue">
                        <div className="title">Draw your partner</div>
                    </div>
                        <button className="team-button">Create Tournament</button>
                    
                </div>
                </main>
                </>
        );
    }

    return (
        <div className="header">
            <Header />
            <div className="configure-game-page">

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="players" className="form-label">Enter number of players</label>
                        <input id="players" className="form-input" type="number" required />
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
                        <input id="points" className="form-input" type="number" required />
                    </div>

                    <div className="form-item">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input id="date" className="form-input" type="date" required />
                    </div>

                    <div>
                        <button className="cancel-button">Cancel</button>
                        <button className="form-button" onClick={handleAdvance}>Advance</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
