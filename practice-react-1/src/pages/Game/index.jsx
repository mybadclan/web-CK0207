import { useEffect } from "react";
import { Page, ScoreBoard, Players } from "../../components";
import { useGame } from "../../hooks/useGame";

import styles from "./styles.module.scss";

export function Game({ data = {}, setData = () => {} }) {
  return (
    <Page className={styles.game}>
      <ScoreBoard data={data}>
        <Players players={data.teamOne} />
        <Players players={data.teamTwo} />
      </ScoreBoard>
    </Page>
  );
}
