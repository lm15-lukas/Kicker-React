export function WinningLogic(matches, goalsToWin = 4) {
    const stats = {};

    const storedForm = localStorage.getItem('form');
    let pointsPerWin = 3;

    if (storedForm) {
        try {
            const parsedForm = JSON.parse(storedForm);
            const parsedPoints = parseInt(parsedForm.points, 10);
            if (!isNaN(parsedPoints)) {
                pointsPerWin = parsedPoints;
            }
        } catch (error) {
            console.error("Fehler beim Parsen 'form':", error);
        }
    }

    matches.forEach(match => {
        if (!Array.isArray(match.result)) return;

        let winsA = 0;
        let winsB = 0;
        let goalDiffA = 0;
        let goalDiffB = 0;

        match.result.forEach(setResult => {
            if (typeof setResult !== 'string' || !setResult.includes(':')) return;
            const [goalsA, goalsB] = setResult.split(":").map(Number);
            if (isNaN(goalsA) || isNaN(goalsB)) return;

            if (goalsA > goalsB) winsA++;
            if (goalsB > goalsA) winsB++;

            goalDiffA += goalsA - goalsB;
            goalDiffB += goalsB - goalsA;
        });

        if (winsA === 0 && winsB === 0) return; // Keine gültigen Sets

        const teamA = [match.players[0], match.players[1]];
        const teamB = [match.players[2], match.players[3]];

        teamA.forEach(player => {
            if (!stats[player]) stats[player] = { games: 0, wins: 0, losses: 0, points: 0, goalDiff: 0 };
            stats[player].games++;
            stats[player].goalDiff += goalDiffA;
            if (winsA > winsB) {
                stats[player].wins++;
                stats[player].points += pointsPerWin;
            } else {
                stats[player].losses++;
            }
        });

        teamB.forEach(player => {
            if (!stats[player]) stats[player] = { games: 0, wins: 0, losses: 0, points: 0, goalDiff: 0 };
            stats[player].games++;
            stats[player].goalDiff += goalDiffB;
            if (winsB > winsA) {
                stats[player].wins++;
                stats[player].points += pointsPerWin;
            } else {
                stats[player].losses++;
            }
        });
    });

    return stats;
}
