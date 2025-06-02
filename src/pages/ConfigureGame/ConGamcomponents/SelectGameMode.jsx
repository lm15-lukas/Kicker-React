import { useState } from 'react';
import TeamAdjustment from './TeamAdjustment.jsx'
import monster from './monster.svg';
import play from './play-solid.svg';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import "../ConfigureGame.css";


export default function () {
    const TeamAdjustMentnavigate= useNavigate('');
    const [teams,setTeams]=useState('');
    
    const handleTeamAdjustment=() => {
        setTeams("team-building");
        TeamAdjustMentnavigate('/team-adjustment');
    }
    if(teams === "team-building"){
        return(
            <>
            <TeamAdjustment/>
            </>
        )
    }
    
    return (
        <>
        <Header/>
            <h1 className="a">Select a Game Mode</h1>
            <div className="team-form-container">
                <div className="team-option" onClick={handleTeamAdjustment}>
                    <img src={monster} alt="ghost" className="monster-logo" />
                    <img src={play} alt="playbutton" className="play-logo" />
                    <h4>Monster DYP</h4>
                </div>
            </div>
        </>
    )
}