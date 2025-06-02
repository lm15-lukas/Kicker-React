import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import "./ConfigureGame.css";
import Header from "./ConGamcomponents/Header.jsx";
import SelectGameMode from "./ConGamcomponents/SelectGameMode.jsx";


const getInitialErrors = (data) => {
    const errs = {};
    if (!data.players) errs.players = "Please enter a number of players";
    if (!data.goals) errs.goals = "Please enter goals to win";
    if (!data.length || data.length === "null") errs.length = "Please enter a Match length";
    if (!data.points) errs.points = "Please enter points per win";
    if (!data.date) errs.date = "Please select a date";
    return errs;
};

export default function ConfigureGame() {
    const navigateSelectGameMode = useNavigate();

    const [formData, setFormData] = useState({
        players: "",
        goals: "",
        length: "",
        points: "",
        date: ""
    });
    
    useEffect(() => {
        const data = window.localStorage.getItem('my-form-data');
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem('my-form-data', JSON.stringify(formData));
    }, [formData]);
    
    

    const [errors, setErrors] = useState(getInitialErrors(formData));
    const [step, setStep] = useState("configure");

    const handleReset = () => {
        const resetData = {
            players: "",
            goals: "",
            length: "",
            points: "",
            date: ""
        };
        setErrors(getInitialErrors(resetData));
        localStorage.removeItem('my-form-data');
    };

    const handleFormDataChange = (event) => {
        const { id, value } = event.target;

        const updatedData = {
            ...formData,
            [id]: value
        };
        setFormData(updatedData);

        const updatedErrors = { ...errors };
        if (value === "" || value === "null") {
            updatedErrors[id] = "This field is required";
        } else {
            delete updatedErrors[id];
        }

        setErrors(updatedErrors);
    };

    const handleAdvance = () => {
        const newErrors = getInitialErrors(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setStep("setup-teams");
            navigateSelectGameMode('/select-game-mode');
        }
    };

    if (step === "setup-teams") {
        return (
            <>
                <Header />
                <SelectGameMode />
            </>
        );
    }

    return (
        <div className="header">
            <Header />
            <div className="configure-game-page">
                <div className="form-container">
                    {}
                    <div className="form-item">
                        <label htmlFor="players" className="form-label">
                            Enter number of players
                        </label>
                        <select
                            id="players"
                            className="form-input"
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

                    {}
                    <div className="form-item">
                        <label htmlFor="goals" className="form-label">Goals to win</label>
                        <select
                            id="goals"
                            className="form-input"
                            value={formData.goals}
                            onChange={handleFormDataChange}
                        >
                            <option value="null">-- Please enter --</option>
                            {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        {errors.goals && <h3 className="error-text">{errors.goals}</h3>}
                    </div>

                    {}
                    <div className="form-item">
                        <label htmlFor="length" className="form-label">Match length in minutes</label>
                        <select
                            id="length"
                            className="form-input"
                            value={formData.length}
                            onChange={handleFormDataChange}
                        >
                            <option value="null">--Please Select--</option>
                            <option value="2">No time Tracking</option>
                            {[5, 6, 7, 8, 9, 10].map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                        {errors.length && <h3 className="error-text">{errors.length}</h3>}
                    </div>

                    {}
                    <div className="form-item">
                        <label htmlFor="points" className="form-label">Points per win</label>
                        <select
                            id="points"
                            className="form-input"
                            value={formData.points}
                            onChange={handleFormDataChange}
                        >
                            <option value="null">--Please enter--</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                        {errors.points && <h3 className="error-text">{errors.points}</h3>}
                    </div>

                    {}
                    <div className="form-item">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            id="date"
                            className="form-input"
                            type="date"
                            value={formData.date}
                            onChange={handleFormDataChange}
                        />
                        {errors.date && <h3 className="error-text">{errors.date}</h3>}
                    </div>

                    {}
                    <div>
                        <button className="cancel-button" onClick={handleReset}>Reset</button>
                        <button
                            className="form-button"
                            onClick={handleAdvance}
                            disabled={Object.keys(errors).length > 0}
                        >
                            Advance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
