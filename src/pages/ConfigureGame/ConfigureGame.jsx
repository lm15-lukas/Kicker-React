import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HeadHeader from "./ConGamcomponents/Header.jsx";
import SelectGameMode from "./ConGamcomponents/SelectGameMode.jsx";
import { motion } from "framer-motion";

const getInitialErrors = (data) => {
  const errs = {};
  if (!data.players) errs.players = "Please enter a number of players";
  if (!data.goals) errs.goals = "Please enter goals to win";
  if (!data.length || data.length === "null") errs.length = "Please enter a Match length";
  if (!data.points) errs.points = "Please enter points per win";
  if (!data.date) errs.date = "Please select a date";
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
      date: "",
    };
  return JSON.parse(storedValues);
}

const NavigationButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 left-4 flex space-x-2 z-50">
      <motion.button
        onClick={() => navigate(-1)}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Zurück
      </motion.button>
      <motion.button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Startseite
      </motion.button>
    </div>
  );
};

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
      date: "",
    };
    setFormData(resetData);
    setErrors(getInitialErrors(resetData));
    localStorage.removeItem("form");
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
        {["players", "goals", "length", "points", "date"].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-lg font-medium mb-2 capitalize">
              {field === "date" ? "Date" : `Enter ${field.replace("-", " ")}`}
            </label>
            {field === "date" ? (
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleFormDataChange}
                className="bg-gray-700 text-white p-2 rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            ) : (
              <select
                id={field}
                value={formData[field]}
                onChange={handleFormDataChange}
                className="bg-gray-700 text-white p-2 rounded-lg h-10 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="null">-- Please select --</option>
                {field === "players" && [4, 6, 8, 10, 12].map((n) => <option key={n} value={n}>{n}</option>)}
                {field === "goals" && [...Array(10).keys()].map((i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                {field === "length" && [2, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n === 2 ? "No time tracking" : n}</option>)}
                {field === "points" && [...Array(10).keys()].map((i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
            )}
            {errors[field] ? (
              <p className="text-red-500 mt-2 min-h-[1.5rem]">{errors[field]}</p>
            ) : (
              <div className="min-h-[1.5rem]" />
            )}
          </div>
        ))}

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
      <NavigationButtons />
    </div>
  );
}