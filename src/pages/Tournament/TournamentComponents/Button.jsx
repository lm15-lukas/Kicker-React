import { useState, useEffect } from "react";

export default function Button({ onConfirm }) {
    const [goalsToWin, setGoalsToWin] = useState(8);
    const [topButtonActive, setTopButtonActive] = useState(null);
    const [bottomButtonActive, setBottomButtonActive] = useState(null);

    useEffect(() => {
        const storedForm = localStorage.getItem("form");
        if (storedForm) {
            try {
                const parsedForm = JSON.parse(storedForm);
                const goals = parseInt(parsedForm.goals, 10);
                if (!isNaN(goals) && goals >= 1 && goals <= 8) {
                    setGoalsToWin(goals);
                }
            } catch (error) {
                console.error("Fehler beim Parsen von 'form':", error);
            }
        }
    }, []);

    const topButtons = Array.from({ length: goalsToWin }, (_, i) => i);
    const bottomButtons = [...topButtons].reverse();

    function handleConfirmClick() {
        if (topButtonActive !== null && bottomButtonActive !== null) {
            const TeamA = topButtons[topButtonActive];
            const TeamB = bottomButtons[bottomButtonActive];
            const result = `${TeamA}:${TeamB}`;
            console.log("RESULT CONFIRMED:", result);
            onConfirm(result);
        } else {
            console.log("Beide Ergebnisse auswählen");
        }
    }

    return (
        <div className="button-wrapper">
            <div className="button-row">
                {topButtons.map((num, index) => (
                    <button
                        key={`top-${index}`}
                        onClick={() => setTopButtonActive(prev => (prev === index ? null : index))}
                        className={`toggle-button ${topButtonActive === index ? 'active' : 'inactive'}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <span className="colon">-</span>
            <span className="colon">:</span>
            <span className="colon">-</span>   

            <div className="button-row">
                {bottomButtons.map((num, index) => (
                    <button
                        key={`bottom-${index}`}
                        onClick={() => setBottomButtonActive(prev => (prev === index ? null : index))}
                        className={`toggle-button ${bottomButtonActive === index ? 'active' : 'inactive'}`}
                    >
                        {num}
                    </button>
                ))}
                <button className="setting-button-row" onClick={handleConfirmClick}>Confirm</button>
            </div>
        </div>
    );
}
