import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";

export function Score({ sets = [], score = {}, setData = () => {}}) {
  return (
    <div>
      <Row>
        {sets.map(
          set => {
            return(
              <Col className={styles.sets}>
                {set.teamOne}
                {set.teamTwo}
              </Col>
            )
          }
        )
        }
        <Col className={styles.score}>
          {score.teamOne}
          {score.teamTwo}
        </Col>
      </Row>
    </div>
  );
}
