import { Input } from "../Input";
import { Checkbox } from "../Checkbox";

import styles from "./styles.module.scss";

export function TeamInput({ teamName, team, onChange, onCheckboxChange }) {
  function handleChangePlayerOne(e) {
    onChange("playerOne", e.target.value);
  }

  function handleChangePlayerTwo(e) {
    onChange("playerTwo", e.target.value);
  }
  
  const isTeamOne = teamName === "teamOne";
  const checkPlayerOne = isTeamOne ? team.currentlyServe == "playerOne" : team.lastServe == "playerTwo"
  const checkPlayerTwo = isTeamOne ? team.currentlyServe == "playerTwo" : team.lastServe == "playerOne"
  

  return (
    <form className={styles.teamInput}>
      <div className={styles.formGroup}>
        <Input
          label="Jogador 1"
          value={team.playerOne}
          onChange={handleChangePlayerOne}
        />

        <Checkbox
          checked={checkPlayerOne}
          onClick={(value) => onCheckboxChange("playerOne", value)}
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          label="Jogador 2"
          value={team.playerTwo}
          onChange={handleChangePlayerTwo}
        />
        <Checkbox
          checked={checkPlayerTwo}
          onClick={(value) => onCheckboxChange("playerTwo", value)}
        />
      </div>
    </form>
  );
}
