import { Input } from "../Input";
import { Checkbox } from "../Checkbox";

import styles from "./styles.module.scss";

export function TeamInput({ team, onChange, onCheckboxChange }) {
  function handleChangePlayerOne(e) {
    onChange("playerOne", e.target.value);
  }

  function handleChangePlayerTwo(e) {
    onChange("playerTwo", e.target.value);
  }

  return (
    <form className={styles.teamInput}>
      <div className={styles.formGroup}>
        <Input
          label="Jogador 1"
          value={team.playerOne}
          onChange={handleChangePlayerOne}
        />

        <Checkbox
          checked={team.currentlyServe === "playerOne"}
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
          checked={team.currentlyServe === "playerTwo"}
          onClick={(value) => onCheckboxChange("playerTwo", value)}
        />
      </div>
    </form>
  );
}
