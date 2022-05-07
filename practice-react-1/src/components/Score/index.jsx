import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";

import { POINTS } from "../../constants/points";

export function Score({ mode, sets = [], score = {}, setData = () => {} }) {
  const pointOne = mode === 'REGULAR' ? POINTS[score.teamOne] : score.teamOne;
  const pointTwo = mode === 'REGULAR' ? POINTS[score.teamTwo] : score.teamTwo;

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
            <p className={styles.paragraph}>{pointOne}</p>
          </Row>
          <Row className="d-flex align-items-center justify-content-end">
            <p className={styles.paragraph}>{pointTwo}</p>
          </Row>
        </Col>
      </Row>
    </>
  );
}
