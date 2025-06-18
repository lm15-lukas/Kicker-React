import { useState } from 'react';
import logoimg from '../assets/images/plus-solid.svg';

export default function AddPlayer({onAdd}) {
    const[showInput,setShowInput] =useState(false);
    const[newPlayerName,setNewPlayerName] = useState("");

    function handleAddPlayer(){
        setShowInput(true);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(newPlayerName.trim() !== ""){
        onAdd(newPlayerName.trim());
        setNewPlayerName("");
        setShowInput(false);
        }
    }
    return (
        <>
            <div className='plus-area'>
                <h2 className='add'>Add</h2>
                <img 
                src={logoimg} 
                alt='plus' 
                className='plus-sign'
                onClick={handleAddPlayer}
                ></img>
                {showInput &&(
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                        value={newPlayerName}
                        onChange={e => setNewPlayerName(e.target.value)}
                        placeholder='Player Name'
                        />
                    </form>
                )}
            </div>
        </>
    )


}