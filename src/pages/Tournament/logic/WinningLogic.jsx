export function WinningLogic(matches, goalsToWin = 4) {
    const stats = {};

    const storedForm  =localStorage.getItem('form');
    let pointsPerWin = 3;
    if(storedForm){
        try {
            const parsedForm= JSON.parse(storedForm);
            const parsedPoints = parseInt(parsedForm.points,10);
            if(!isNaN(parsedPoints)){
                pointsPerWin = parsedPoints
            }
        } catch (error) {
            console.error("Fehler beim Parsen 'form':",error)
        }
    }

    matches.forEach(match => {
        if (!match.result) return;

        const [goalsA, goalsB] = match.result.split(":").map(Number);
        if (isNaN(goalsA) || isNaN(goalsB)) return;

        const teamA = [match.players[0], match.players[1]];
        const teamB = [match.players[2], match.players[3]];

        teamA.forEach(player => {
            if (!stats[player]) stats[player] = { games: 0, wins: 0, losses: 0, points: 0, goalDiff: 0 };
            stats[player].games++;
            stats[player].goalDiff += goalsA - goalsB;
            if (goalsA > goalsB) {
                stats[player].wins++;
                stats[player].points += pointsPerWin;
            } else {
                stats[player].losses++;
            }
        });

        teamB.forEach(player => {
            if (!stats[player]) stats[player] = { games: 0, wins: 0, losses: 0, points: 0, goalDiff: 0 };
            stats[player].games++;
            stats[player].goalDiff += goalsB - goalsA;
            if (goalsB > goalsA) {
                stats[player].wins++;
                stats[player].points += pointsPerWin;
            } else {
                stats[player].losses++;
            }
        });
    });

    return stats;
}
