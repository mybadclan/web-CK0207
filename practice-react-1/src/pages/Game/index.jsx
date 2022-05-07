import { useEffect } from "react";
import { Page, ScoreBoard, Players } from "../../components";
import { Row, Col } from "react-bootstrap";
import { useGame } from "../../hooks/useGame";
import styles from "./styles.module.scss";
import { Score } from "../../components/Score";

export function Game({ data = {}, setData = () => {} }) {
  return (
    <Page className={styles.game}>
      <ScoreBoard data={data}>
        <Col className="col-10">
          <Players players={data.teamOne} />
          <Players players={data.teamTwo} />
        </Col>
        <Col className="col-2 m-0 p-0">
          <Score sets={data.gameInfo.sets} score={data.gameInfo.score}></Score>
        </Col>
      </ScoreBoard>

      <Col className="mt-4 d-flex align-items-center justify-content-between">
        <button className="btn btn-primary">Ponto Time 1</button>

        <button className="btn btn-primary">Ponto Time 2</button>

        <button className="btn btn-secondary">Desfazer ponto</button>

        <button className="btn btn-danger">Reiniciar partida</button>
      </Col>
    </Page>
  );
}
