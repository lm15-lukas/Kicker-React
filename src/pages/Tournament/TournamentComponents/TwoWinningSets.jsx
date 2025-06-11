import { useState, useEffect } from "react";
import Button from "./Button";

export default function TwoWinningSets({matchPlayers, index, TwoResultConfirm}) {

    const [showRounds, setShowRounds] = useState(false);

    useEffect(() => {
        const storedForm = localStorage.getItem('form');
        if (storedForm) {
            try {
                const parsedForm = JSON.parse(storedForm);
                const sets = parsedForm.sets;
                if (sets === "2") {
                    setShowRounds(true);
                }
            } catch (err) {
                console.error(" Fehler beim Parsen 'form :", err)
            }
        }
    }, [])

    if (!showRounds) {
        return null;
    }

    return (
        <>
            <div className="match-table-container-2">
                <Button onConfirm={(result) => TwoResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => TwoResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => TwoResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => TwoResultConfirm(result, index, matchPlayers)} />
            </div>
        </>
    )
}