import logoImg from './gamepad-solid.svg';
import "../ConfigureGame.css";
export default function Header(){
    return (
        <header className='header'>
            <img className='img' src={logoImg} alt="controller"/>
            <h1 className='h1'>Configure your Game</h1>
        </header>
    )
}