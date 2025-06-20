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
            <div className='plus-area flex items-center gap-2 cursor-pointer'>
                <h2 className='add text-lg font-medium'>Add</h2>
                <img 
                src={logoimg}
                alt='plus' 
                className='plus-sign w-5 h-5'
                onClick={handleAddPlayer}
                ></img>
                {showInput &&(
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                        value={newPlayerName}
                        onChange={e => setNewPlayerName(e.target.value)}
                        placeholder='Player Name'
                        className='text-black'
                        />
                    </form>
                )}
            </div>
        </>
    )


}