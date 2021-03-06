import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";

import { POINTS } from "../../constants/points";
import { SUPERTIEBRAKE_MODE } from "../../constants/game-modes";

export function Score({ mode, isOver, sets = [], score = {}, setData = () => {} }) {
  const pointOne = mode === 'REGULAR' ? POINTS[score.teamOne] : score.teamOne;
  const pointTwo = mode === 'REGULAR' ? POINTS[score.teamTwo] : score.teamTwo;

  return (
    <>
      <Row className="m-0 p-0">
        {sets.map((set, idx) => {
          if (!isOver && mode === SUPERTIEBRAKE_MODE && idx == 2) {
            // skip last element, since there is only one game in a supertiebraker
            return;
          }

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

        { !isOver ? (
          <Col className={styles.score}>
            <Row className="d-flex align-items-center justify-content-end">
              <p className={styles.paragraph}>{pointOne}</p>
            </Row>
            <Row className="d-flex align-items-center justify-content-end">
              <p className={styles.paragraph}>{pointTwo}</p>
            </Row>
          </Col>
        ) : (<></>)
        }
      </Row>
    </>
  );
}
