import { useEffect, useState } from "react"
import Button from "./Button"
export default function ThreeWinnningSets({ matchPlayers, index, ThreeResultConfirm }) {

    const [showRounds, setShowRounds] = useState(false);

    useEffect(() => {
        const storedForm = localStorage.getItem('form');
        if (storedForm) {
            try {
                const parsedForm = JSON.parse(storedForm)
                const sets = parsedForm.sets;

                if (sets === "3") {
                    setShowRounds(true);
                }
            } catch (error) {
                console.error("Fehler beim Parsen von 'form': ", error)
            }
        }
    }, [])

    if (!showRounds) {
        return null;
    }
    return (
        <>
            <div className="match-table-container-3">
                <Button onConfirm={(result) => ThreeResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => ThreeResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => ThreeResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => ThreeResultConfirm(result, index, matchPlayers)} />
                <Button onConfirm={(result) => ThreeResultConfirm(result, index, matchPlayers)} />
            </div>
        </>
    )
}