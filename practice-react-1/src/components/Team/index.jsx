import { useNavigate } from "react-router-dom";
import { Card } from "../Card";
import { TeamInput } from "../TeamInput";

import styles from "./styles.module.scss";

export function Team({ data = {}, setData = () => {}, setInitialGameState = () => {}}) {
  const navigate = useNavigate();

  const handleChangeTeam = (team, player, value) => {
    const copyOfData = { ...data };
    copyOfData[team][player] = value;
    setData(copyOfData);
  };

  const handleCheckbox = (team, player, value) => {
    const copyOfData = { ...data };
    if (value === false) {
      if (team == "teamOne") {
        copyOfData[team].currentlyServe = "";
      } else {
        copyOfData[team].lastServe = "";
      }

    } else {
      if (team == "teamOne") {
        copyOfData[team].currentlyServe = player;
      } else {
        copyOfData[team].lastServe = player == "playerOne" ? "playerTwo" : "playerOne";
      }
    }

    setData(copyOfData);
  };

  function handleCreateTeams() {
    setInitialGameState(data)

    navigate({
      pathname: "game",
    });
  }

  const buttonDisabled =
    data.gameInfo.title.trim() === "" ||
    data.teamOne.playerOne.trim() === "" ||
    data.teamOne.playerTwo.trim() === "" ||
    data.teamTwo.playerOne.trim() === "" ||
    data.teamTwo.playerTwo.trim() === "" ||
    data.teamOne.currentlyServe === "" ||
    data.teamTwo.lastServe === "";

  return (
    <div className={styles.team}>
      <div className={styles.teams}>
        <Card className={styles.teamCards}>
          <h2>Time 1</h2>

          <TeamInput
            teamName="teamOne"
            team={data.teamOne}
            onChange={(player, value) =>
              handleChangeTeam("teamOne", player, value)
            }
            onCheckboxChange={(player, value) =>
              handleCheckbox("teamOne", player, value)
            }
          />
        </Card>
        <p className={styles.vs}>VS</p>
        <Card className={styles.teamCards}>
          <h2>Time 2</h2>

          <TeamInput
            teamName="teamTwo"
            team={data.teamTwo}
            onChange={(player, value) =>
              handleChangeTeam("teamTwo", player, value)
            }
            onCheckboxChange={(player, value) =>
              handleCheckbox("teamTwo", player, value)
            }
          />
        </Card>
      </div>

      <button disabled={buttonDisabled} onClick={handleCreateTeams}>
        Criar partida
      </button>
    </div>
  );
}
