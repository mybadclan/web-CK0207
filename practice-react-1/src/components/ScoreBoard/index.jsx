import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";

export function ScoreBoard({ data = {}, setData = () => {}, children }) {
  return (
    <div className={styles.scoreBoard}>
      <p className={styles.title}>{data.gameInfo.title}</p>
      <Row>
        <Col>
          {children}
        </Col>
        <Col>
          40
        </Col>
      </Row>
    </div>
  );
}
