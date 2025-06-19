import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadHeader from "./ConGamcomponents/Header.jsx";
import SelectGameMode from "./ConGamcomponents/SelectGameMode.jsx";
import './ConfigureGame.css';
import { motion } from "framer-motion";
import SideButtons from "../SideButtons.jsx";

const getInitialErrors = (data) => {
  const errs = {};
  if (!data.goals) errs.goals = "Please enter goals to win";
  if (!data.length || data.length === "null") errs.length = "Please enter a match length";
  if (!data.points) errs.points = "Please enter points per win";
  if (!data.date) errs.date = "Please select a date";
  if (!data.sets) errs.sets = "Please select sets";
  return errs;
};

function getFormValues() {
  const storedValues = localStorage.getItem("form");
  if (!storedValues)
    return {
      players: "",
      goals: "",
      length: "",
      points: "",
      sets: "",
      date: "",
    };
  return JSON.parse(storedValues);
}

export default function ConfigureGame() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(getFormValues);
  const [errors, setErrors] = useState(getInitialErrors(formData));
  const [step, setStep] = useState("configure");

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formData));
  }, [formData]);

  const handleReset = () => {
    const resetData = {
      players: "",
      goals: "",
      length: "",
      points: "",
      sets: "",
      date: "",
    };
    setFormData(resetData);
    setErrors(getInitialErrors(resetData));
    localStorage.removeItem("form");
    localStorage.removeItem("player-names");
  };

  const handleFormDataChange = (event) => {
    const { id, value } = event.target;
    const updatedData = { ...formData, [id]: value };
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
      navigate("/select-game-mode");
    }
  };

  if (step === "setup-teams") {
    return (
      <>
        <HeadHeader />
        <SelectGameMode />
        <NavigationButtons />
      </>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <HeadHeader />
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md mx-auto space-y-6">
        {/* Players */}
        <div className="form-item">
          <label htmlFor="players" className="form-label">Number of Players</label>
          <select
            id="players"
            className="form-input"
            value={formData.players}
            onChange={handleFormDataChange}
          >
            <option value="null">-- Please select --</option>
            {[4, 6, 8, 10, 12].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.players && <p className="text-red-500">{errors.players}</p>}
        </div>

        {/* Goals */}
        <div className="form-item">
          <label htmlFor="goals" className="form-label">Goals to win</label>
          <select
            id="goals"
            className="form-input"
            value={formData.goals}
            onChange={handleFormDataChange}
          >
            <option value="null">-- Please select --</option>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {errors.goals && <p className="text-red-500">{errors.goals}</p>}
        </div>

        {/* Sets */}
        <div className="form-item">
          <label htmlFor="sets" className="form-label">Sets to Win</label>
          <select
            id="sets"
            className="form-input"
            value={formData.sets}
            onChange={handleFormDataChange}
          >
            <option value="null">-- Please select --</option>
            {[1, 2, 3].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.sets && <p className="text-red-500">{errors.sets}</p>}
        </div>

        {/* Match Length */}
        <div className="form-item">
          <label htmlFor="length" className="form-label">Match length in minutes</label>
          <select
            id="length"
            className="form-input"
            value={formData.length}
            onChange={handleFormDataChange}
          >
            <option value="null">-- Please select --</option>
            <option value="2">No time tracking</option>
            {[5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.length && <p className="text-red-500">{errors.length}</p>}
        </div>

        {/* Points */}
        <div className="form-item">
          <label htmlFor="points" className="form-label">Points per win</label>
          <select
            id="points"
            className="form-input"
            value={formData.points}
            onChange={handleFormDataChange}
          >
            <option value="null">-- Please select --</option>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {errors.points && <p className="text-red-500">{errors.points}</p>}
        </div>

        {/* Date */}
        <div className="form-item">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            type="date"
            className="form-input bg-gray-700 text-white p-2 rounded-lg h-10 appearance-none relative [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            value={formData.date}
            onChange={handleFormDataChange}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <motion.button
            onClick={handleReset}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-all"
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
          <motion.button
            onClick={handleAdvance}
            disabled={Object.keys(errors).length > 0}
            className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-all disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            Advance
          </motion.button>
        </div>
      </div>
      <SideButtons/>
    </div>
  );
}
