export function WinningLogic(matches,goalsToWin){
    const stats={}

    matches.forEach(match => {
        const {players,result} = match;
        if(!result) return;

        const [scoreA,scoreB] = result.split(":").map(Number);
        const TeamA= [players[0], players[1]];
        const TeamB = [players[2],players[3]];

        let winningTeam,losingTeam;
        if(scoreA >= goalsToWin && scoreA > scoreB){
            winningTeam=TeamA;
            losingTeam = TeamB;
        }else if(scoreB >= goalsToWin && scoreB > scoreA){
            winningTeam= TeamB;
            losingTeam = TeamA;
        }else 
        return;

        TeamA.concat(TeamB).forEach(player =>{
            if(!stats[player]){
                stats[player]={
                    games: 0,
                    wins:0,
                    losses:0,
                    points:0,
                    goalDiff:0
                };
            }
            stats[player].games +=1;
        });
        winningTeam.forEach(player => {
            stats[player].wins +=1;
            stats[player].points+= 3;
        });
        losingTeam.forEach(player=>{
            stats[player].losses += 1;
        });
        TeamA.forEach(player =>{
            stats[player].goalDiff += scoreA - scoreB;
        });
        TeamB.forEach(player =>{
            stats[player].goalDiff += scoreB - scoreA;
        });
    });
    return stats;
}