import { useEffect, useState } from "react";

import { Input } from "../Input";

import styles from "./styles.module.scss";

export function TeamInput({ onChange }) {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  function handleChangePlayerOne(e) {
    setPlayerOne(e.target.value);
  }

  function handleChangePlayerTwo(e) {
    setPlayerTwo(e.target.value);
  }

  useEffect(() => {
    if (playerOne !== "" && playerTwo !== "" && onChange) {
      onChange({ playerOne, playerTwo });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOne, playerTwo]);

  return (
    <form className={styles.teamInput}>
      <Input
        label="Jogador 1"
        value={playerOne}
        onChange={handleChangePlayerOne}
      />

      <Input
        label="Jogador 2"
        value={playerTwo}
        onChange={handleChangePlayerTwo}
      />
    </form>
  );
}
