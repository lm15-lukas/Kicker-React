import { useEffect, useState } from "react";

export default function WinningSets({ matchPlayers, index, onResultConfirm }) {
    const [setsCount, setSetsCount] = useState(0);
    const [goalsToWin, setGoalsToWin] = useState(8);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedForm = localStorage.getItem("form");
        if (storedForm) {
            try {
                const parsedForm = JSON.parse(storedForm);
                const sets = parseInt(parsedForm.sets, 10);
                const goals = parseInt(parsedForm.goals, 10);
                if (sets >= 1 && sets <= 3) setSetsCount(sets);
                if (goals >= 1 && goals <= 8) setGoalsToWin(goals);
                setResults(Array(sets).fill(null)); 
            } catch (error) {
                console.error("Fehler beim Parsen von 'form': ", error);
            }
        }
    }, []);

    if (setsCount === 0) return null;

    const topButtons = Array.from({ length: goalsToWin }, (_, i) => i);
    const bottomButtons = [...topButtons].reverse();

    function handleResultChange(setIndex, teamAScore, teamBScore) {
        const newResults = [...results];
        newResults[setIndex] = `${teamAScore}:${teamBScore}`;
        setResults(newResults);
        setError("");
    }

    function handleConfirmAll() {
        if (results.some(result => result === null)) {
            setError("Please enter all Results!");
            return;
        }
        onResultConfirm(results, index, matchPlayers);
    }

    return (
        <div className={`match-table-container-${setsCount}`}>
            {results.map((_, setIndex) => (
                <ResultSelector
                    key={setIndex}
                    goalsToWin={goalsToWin}
                    onResultSelected={(teamAScore, teamBScore) =>
                        handleResultChange(setIndex, teamAScore, teamBScore)
                    }
                />
            ))}

            <button className="setting-button-row" onClick={handleConfirmAll}>Alle bestätigen</button>

            {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
        </div>
    );
}

function ResultSelector({ goalsToWin, onResultSelected }) {
    const [teamAScore, setTeamAScore] = useState(null);
    const [teamBScore, setTeamBScore] = useState(null);

    const topButtons = Array.from({ length: goalsToWin }, (_, i) => i);
    const bottomButtons = [...topButtons].reverse();

    useEffect(() => {
        if (teamAScore !== null && teamBScore !== null) {
            onResultSelected(topButtons[teamAScore], bottomButtons[teamBScore]);
        }
    }, [teamAScore, teamBScore]);

    return (
        <div className="button-wrapper">
            <div className="button-row">
                {topButtons.map((num, index) => (
                    <button
                        key={`top-${index}`}
                        onClick={() => setTeamAScore(prev => (prev === index ? null : index))}
                        className={`toggle-button ${teamAScore === index ? "active" : "inactive"}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <span className="colon">:</span>

            <div className="button-row">
                {bottomButtons.map((num, index) => (
                    <button
                        key={`bottom-${index}`}
                        onClick={() => setTeamBScore(prev => (prev === index ? null : index))}
                        className={`toggle-button ${teamBScore === index ? "active" : "inactive"}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
}
