import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ConfigureGame.css";
import Header from "./ConGamcomponents/Header.jsx";
import SelectGameMode from "./ConGamcomponents/SelectGameMode.jsx";


export default function ConfigureGame() {

    const handleReset = () => {
        setFormData({
            players: "",
            goals: "",
            length: "",
            points: "",
            date: "",
        });
        setErrors({})
    }

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        players: "",
        goals: "",
        length: "",
        points: "",
        date: ""
    });
    const [step, setStep] = useState("configure");

    const navigateSelectGameMode = useNavigate();

    const handleFormDataChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    };

    const handleAdvance = () => {
        const newErrors = {};

        if (!formData.players) newErrors.players = "PLease select a value";
        if (!formData.goals) newErrors.goals = "Please select a value for Goals";
        if (!formData.length || formData.length === "no Value") newErrors.length = "Select a Match length";
        if (!formData.points) newErrors.points = "Please select points per Match";
        if (!formData.date) newErrors.date = "Select a date For the Tournament";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setStep("setup-teams");
            navigateSelectGameMode('/select-game-mode')
        }


    };
    if (step === "setup-teams") {
        return (
            <>
                <Header />
                <SelectGameMode/>
            </>
        );
    }

    return (
        <div className="header">
            <Header />
           
            <div className="configure-game-page">

                <div className="form-container">

                    <div className="form-item">
                        <label htmlFor="players" className="form-label">
                            Enter number of players
                        </label>
                        <select
                            id="players" className="form-input" type="number" required
                            value={formData.players}
                            onChange={handleFormDataChange}
                        >
                            <option value="">-- Please Select --</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12">12</option>

                        </select>
                        {errors.players && <h3 className="error-text">{errors.players}</h3>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="goals" className="form-label">Goals to win</label>
                        <select id="goals" className="form-input" type="number" required
                            value={formData.goals}
                            onChange={handleFormDataChange}
                        >
                            <option value="null">-- Please enter --</option>
                            <option value="7">7</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {errors.goals && <h3 className="error-text">{errors.goals}</h3>}
                    </div>
                    <div className="form-item">

                        <label htmlFor="length" className="form-label">Match length in minutes</label>

                        <select id="length" className="form-input" type="number" required
                            value={formData.length}
                            onChange={handleFormDataChange}
                        >
                            <option value="null">--Please Select--</option>
                            <option value="2">No time Tracking</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {errors.length && <h3 className="error-text">{errors.length}</h3>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="points" className="form-label">Points per win</label>
                        <select
                            id="points" className="form-input" type="number" required value={formData.points} onChange={handleFormDataChange}>
                            <option value="null">--Please enter--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {errors.points && <h3 className="error-text">{errors.points}</h3>}

                    </div>
                    <div className="form-item">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input id="date" className="form-input" type="date" required value={formData.date} onChange={handleFormDataChange} />
                        {errors.date && <h3 className="error-text">{errors.date}</h3>}
                    </div>
                    <div>
                        <button className="cancel-button" onClick={handleReset}>Reset</button>
                        <button className="form-button" onClick={handleAdvance}>Advance</button>
                    </div>
                </div>
            </div>
        </div>
    );
}