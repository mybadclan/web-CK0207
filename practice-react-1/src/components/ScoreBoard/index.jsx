import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";
import { Score } from "../Score";

export function ScoreBoard({ data = {}, setData = () => {}, children }) {
  return (
    <div className={styles.scoreBoard}>
      <p className={styles.title}>{data.gameInfo.title}</p>
      <Row>
        <Col>
          {children}
        </Col>
        <Col>
          <Score sets={data.gameInfo.sets} score={data.gameInfo. score}></Score>
        </Col>
      </Row>
    </div>
  );
}
