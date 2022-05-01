import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Card } from "../Card";
import { TeamInput } from "../TeamInput";

import styles from "./styles.module.scss";

const isEmpty = (obj) => Object.keys(obj).length === 0;

export function Team() {
  const [teamOne, setTeamOne] = useState({});
  const [teamTwo, setTeamTwo] = useState({});

  const navigate = useNavigate();

  function handleChangeTeamOne(team) {
    setTeamOne(team);
  }

  function handleChangeTeamTwo(team) {
    setTeamTwo(team);
  }

  function handleCreateTeams() {
    const game = { teamOne, teamTwo };
    const gameJson = JSON.stringify(game);


    const searchParams = createSearchParams({
      game: gameJson,
    })

    navigate({
      pathname: "game",
      search: `?${searchParams}`,
    });
  }

  const buttonDisabled = isEmpty(teamOne) || isEmpty(teamTwo);

  return (
    <div className={styles.team}>
      <div className={styles.teams}>
        <Card className={styles.teamCards}>
          <h2>Time 1</h2>

          <TeamInput onChange={handleChangeTeamOne} />
        </Card>
        <p className={styles.vs}>VS</p>
        <Card className={styles.teamCards}>
          <h2>Time 2</h2>

          <TeamInput onChange={handleChangeTeamTwo} />
        </Card>
      </div>

      <button disabled={buttonDisabled} onClick={handleCreateTeams}>
        Criar partida
      </button>
    </div>
  );
}
