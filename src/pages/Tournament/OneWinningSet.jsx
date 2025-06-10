import { useState,useEffect } from "react";
import Button from "./TournamentComponents/Button";

export default function OneWinningSet(){
    const [showRounds,setShowRounds] = useState(false);

    useEffect(()=>{
        const storedForm= localStorage.getItem('form');
        if(storedForm){
            try {
                const parsedForm = JSON.parse(storedForm);
                const sets = parsedForm.sets;
                if(sets === "1"){
                    setShowRounds(true);
                }
            } catch (error) {
                console.error("Parse Fehler 'form:",error);
            }
        }
    },[])
    if(!showRounds){
        return null;
    }
    return( 
        <>
        <div className="match-table-container">
        <Button/>
        </div>
        </>
    )
}