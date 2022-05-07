import { Row, Container, Col } from "react-bootstrap";
import { Circles } from "../Circles";

export function Players({ players, sets, score }) {
  return (
    <Container>
      <Row>
        <Col className="col-6">
          {players.playerOne}/{players.playerTwo}
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Circles current={players.currentlyServe}></Circles>
        </Col>
      </Row>
    </Container>
  );
}
