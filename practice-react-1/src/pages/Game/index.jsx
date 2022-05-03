import { useEffect } from "react";
import { Page, ScoreBoard, Players } from "../../components";
import { useGame } from "../../hooks/useGame";
import styles from "./styles.module.scss";
import { Score } from "../../components/Score";


export function Game({ data = {}, setData = () => {} }) {
  debugger
  return (
    <Page className={styles.game}>
      <ScoreBoard data={data}>   
        <Players players={data.teamOne} sets={data.sets} score={data.score}/>
        <Players players={data.teamTwo} sets={data.gameInfo.sets} score={data.gameInfo. score}/>
      </ScoreBoard>
    </Page>
  );
}
