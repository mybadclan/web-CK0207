import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";

export function Score({ sets = [], score = {}, setData = () => {} }) {
  return (
    <>
      <Row className="m-0 p-0">
        {sets.map((set) => {
          return (
            <Col className={styles.sets}>
              <Row className="d-flex align-items-center justify-content-end">
                <p className={styles.paragraph}>{set.teamOne}</p>
              </Row>
              <Row className="d-flex align-items-center justify-content-end">
                <p className={styles.paragraph}>{set.teamTwo} </p>
              </Row>
            </Col>
          );
        })}
        <Col className={styles.score}>
          <Row className="d-flex align-items-center justify-content-end">
            <p className={styles.paragraph}>{score.teamOne}</p>
          </Row>
          <Row className="d-flex align-items-center justify-content-end">
            <p className={styles.paragraph}>{score.teamTwo}</p>
          </Row>
        </Col>
      </Row>
    </>
  );
}
