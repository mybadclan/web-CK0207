function tiebrake(gamesTeamOne, gamesTeamTwo, pointsTeamOne, pointsTeamTwo) {
    if (gamesTeamOne == 6 & gamesTeamTwo == 6) {
        if (pointsTeamOne >= 7 & pointsTeamTwo == pointsTeamOne - 2) {
            return 'Equipe 1'
        } else if (pointsTeamTwo >= 7 & pointsTeamOne == pointsTeamTwo - 2) {
            return 'Equipe 2'
        }
    }
}

function supertiebrake(setsTeamOne, setsTeamTwo, gamesTeamOne, gamesTeamTwo, pointsTeamOne, pointsTeamTwo) {
    if (setsTeamOne ==  1 & setsTeamTwo == 1) {
        if (gamesTeamOne == 6 & gamesTeamTwo == 6) {
            if (pointsTeamOne >= 10 & pointsTeamTwo == pointsTeamOne - 2) {
                return 'Equipe 1'
            } else if (pointsTeamTwo >= 10 & pointsTeamOne == pointsTeamTwo - 2) {
                return 'Equipe 2'
            }
        }
    }
}

