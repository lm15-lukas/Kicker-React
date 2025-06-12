export function WinningLogic(matches, goalsToWin) {
    const stats = {};

    matches.forEach(match => {
        if (!Array.isArray(match.result)) return;

        const [playerA1, playerA2, playerB1, playerB2] = match.players;

        [playerA1, playerA2, playerB1, playerB2].forEach(p => {
            if (!stats[p]) stats[p] = { games: 0, wins: 0, losses: 0, points: 0, goalDiff: 0 };
        });

        let winsA = 0;
        let winsB = 0;
        let goalDiffA = 0;
        let goalDiffB = 0

        match.result.forEach(([goalsA, goalsB]) => {
            
            goalsA = Number(goalsA);
            goalsB = Number(goalsB);

            if (isNaN(goalsA) || isNaN(goalsB)) return; 

            goalDiffA += goalsA - goalsB;
            goalDiffB += goalsB -goalsA


            if (goalsA > goalsB) winsA++;
            else if (goalsA < goalsB) winsB++;
        });

        const isTeamAWinner = winsA > winsB;

        [playerA1, playerA2].forEach(p => {
            stats[p].games++;
            if (isTeamAWinner) {
                stats[p].wins++;
                stats[p].points += 3;
            } else {
                stats[p].losses++;
            }
            stats[p].goalDiff += goalDiffA;
            stats[p].goalDiff += goalDiffB
        });

        [playerB1, playerB2].forEach(p => {
            stats[p].games++;
            if (!isTeamAWinner) {
                stats[p].wins++;
                stats[p].points += 3;
            } else {
                stats[p].losses++;
            }
            stats[p].goalDiff -= goalDiffA;
            stats[p].goalDiff -= goalDiffB
        });
    });

    return stats;
}
