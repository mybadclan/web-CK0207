import { Col, Row } from "react-bootstrap";
import {
  Page,
  Team,
  GameTitle,
  SetsType,
  TiebreakType,
} from "../../components";

import styles from "./styles.module.scss";

export function Register({ data = {}, setData = () => {} }) {
  return (
    <Page className={styles.register}>
      <GameTitle data={data} setData={setData} />
      <Row className={[styles.maxWidth, "mb-4"].join(" ")}>
        <Col className="col-3">
          <SetsType data={data} setData={setData} />
        </Col>
        <Col className="col-6">
          <TiebreakType data={data} setData={setData} />
        </Col>
      </Row>

      <Team data={data} setData={setData} />
    </Page>
  );
}
