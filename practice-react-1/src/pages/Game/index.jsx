import { useEffect } from "react";
import { Page, ScoreBoard, Players } from "../../components";
import { useGame } from "../../hooks/useGame";
import {Row, Container, Col} from 'react-bootstrap';

import styles from "./styles.module.scss";
import { Score } from "../../components/Score";

export function Game({ data = {}, setData = () => {} }) {
  return (
    <Page className={styles.game}>
      <ScoreBoard data={data}>
        <Row>
          <Col>
            <Players players={data.teamOne} />
            <Players players={data.teamTwo} />
          </Col>
          <Col>
            <Score sets={data.sets} score={data.score}></Score>
          </Col>
        </Row>
      </ScoreBoard>
    </Page>
  );
}
