import Trophy from "../assets/images/trophy-solid.svg";
export default function TournamentHeader() {
    return (
        <header className="header">
            <img src={Trophy} alt="trophy" className="trophy"/>
            <h1>Tournament XY</h1> 
        </header>
    )
}