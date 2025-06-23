import { useEffect, useState } from "react";
import Button from "./Button";

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
                if (sets >= 1 && sets <= 3) {
                    setSetsCount(sets);

                    
                    const maxSets = sets * 2 - 1;
                    setResults(Array(maxSets).fill(null));
                }
                if (goals >= 1 && goals <= 8) setGoalsToWin(goals);
            } catch (error) {
                console.error("Fehler beim Parsen von 'form': ", error);
            }
        }
    }, []);

    if (setsCount === 0) return null;

    
    function getSetWinner(result) {
        if (!result) return null;
        const [a, b] = result.split(":").map(Number);
        if (a > b) return "A";
        if (b > a) return "B";
        return null;
    }

    
    function countWins(results) {
        let winsA = 0;
        let winsB = 0;
        for (const r of results) {
            const winner = getSetWinner(r);
            if (winner === "A") winsA++;
            if (winner === "B") winsB++;
        }
        return { winsA, winsB };
    }

function getVisibleSetsCount(results, maxSets, setsToWin) {
    const { winsA, winsB } = countWins(results);

    
    if (winsA >= setsToWin || winsB >= setsToWin) {
        const lastPlayedIndex = results.findIndex(r => r === null);
        return lastPlayedIndex === -1 ? maxSets : lastPlayedIndex;
    }

    
    let minRows = setsToWin;
    if (setsToWin === 3) minRows = 3;

    
    if (winsA === winsB) {
        return Math.min(Math.max(winsA + winsB + 1, minRows), maxSets);
    }

    
    return Math.min(Math.max(winsA + winsB + 1, minRows), maxSets);
}



    const maxSets = setsCount * 2 - 1;
    const setsToWin = setsCount;

   
    const visibleSetsCount = getVisibleSetsCount(results, maxSets, setsToWin);

    function handleResultChange(setIndex, teamAScore, teamBScore) {
        const newResults = [...results];
        newResults[setIndex] = `${teamAScore}:${teamBScore}`;
        setResults(newResults);
        setError("");
    }

    function handleConfirmAll() {
        
        if (results.slice(0, visibleSetsCount).some(result => result === null)) {
            setError("Please enter all Results!");
            return;
        }
        onResultConfirm(results.slice(0, visibleSetsCount), index, matchPlayers);
    }

    return (
        <div className={`match-table-container-${setsCount}`}>
            {results.slice(0, visibleSetsCount).map((_, setIndex) => (
                <ResultSelector
                    key={setIndex}
                    goalsToWin={goalsToWin}
                    onResultSelected={(teamAScore, teamBScore) =>
                        handleResultChange(setIndex, teamAScore, teamBScore)
                    }
                />
            ))}

            <button className="setting-button-row" onClick={handleConfirmAll}>Confirm all</button>

            {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
        </div>
    );
}

function ResultSelector({ goalsToWin, onResultSelected }) {
    const [scores, setScores] = useState([null, null]);

    const topButtons = Array.from({ length: goalsToWin + 1 }, (_, i) => i);
    const bottomButtons = [...topButtons].reverse();

    function updateScores(team, score) {
        let newScores = [...scores];
        newScores[team] = score;

        const otherTeam = team === 0 ? 1 : 0;
        if (score < goalsToWin) {
            newScores[otherTeam] = goalsToWin;
        }

        setScores(newScores);
    }

    useEffect(() => {
        if (scores[0] !== null && scores[1] !== null) {
            onResultSelected(scores[0], scores[1]);
        }
    }, [scores]);

    return (
        <div className="button-wrapper">
            <div className="button-row">
                {topButtons.map((num) => (
                    <button
                        key={`top-${num}`}
                        onClick={() => updateScores(0, num)}
                        className={`toggle-button ${scores[0] === num ? "active" : "inactive"}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <span className="colon">:</span>

            <div className="button-row">
                {bottomButtons.map((num) => (
                    <button
                        key={`bottom-${num}`}
                        onClick={() => updateScores(1, num)}
                        className={`toggle-button ${scores[1] === num ? "active" : "inactive"}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
}





