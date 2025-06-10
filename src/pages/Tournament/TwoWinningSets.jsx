import { useState,useEffect } from "react";
import Button from "./TournamentComponents/Button";

export default function TwoWinningSets(){

    const[showRounds,setShowRounds] = useState(false);

    useEffect(()=>{
        const storedForm= localStorage.getItem('form');
        if (storedForm){
            try{
            const parsedForm = JSON.parse(storedForm);
            const sets = parsedForm.sets;
            if(sets === "2"){
                setShowRounds(true);
            }
        }catch (err){
            console.error(" Fehler beim Parsen 'form :",err)
        }
        }
    },[])

    if(!showRounds){
        return null;
    }

    return(
        <>
        <div className="match-table-container-2">
        <Button/>
        <Button/>
        <Button/>
        <Button/>
        </div>
        </>
    )
}