import './Tournament.css';
export default function PlayerTable() {
    return (
        <>
            <div className="tournament-container">
                <h2>Participants</h2>
                <table className='player-table'>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Player</th>
                            <th>Games</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Player </td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Player </td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>

                    </tbody>
                </table>


            </div>
        </>
    )
}