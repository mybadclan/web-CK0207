import styles from "./styles.module.scss";
import {Row, Container, Col} from 'react-bootstrap';
import { Circles } from "../Circles";
export function Players({ players }) {
  return (
    <Container>
      <Row>
        <Col className="col-6">{players.playerOne}/{players.playerTwo}</Col>
        <Col>
        <Circles current={players.currentlyServe}></Circles>
        </Col>
      </Row>
    </Container>
  );
}
