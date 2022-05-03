import styles from "./styles.module.scss";
import { Row, Col, Container } from "react-bootstrap";

export function Score({ sets = [], score = {}, setData = () => {}}) {
  return (
    <Container>
      <Row>
        {sets.map(
          set => {
            return(
              <Col className={styles.sets}>
                <Row>{set.teamOne}</Row>
                <Row>{set.teamTwo}  </Row>
              </Col>
            )
          }
        )
        }
        <Col className={styles.score}>
          <Row>{score.teamOne}</Row>
          <Row>{score.teamTwo}</Row>
        </Col>
      </Row>
    </Container>
  );
}
