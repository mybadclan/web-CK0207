import { Col, Row } from "react-bootstrap";
import {
  Page,
  Team,
  GameTitle,
  SetsType,
  TiebreakType,
} from "../../components";

import styles from "./styles.module.scss";

export function Register({ data = {}, setData = () => {}, setInitialGameState = () => {} }) {
  return (
    <Page className={styles.register}>
      <h3>Instruções: </h3>

      <p align="center">O time 1 sempre será o time que vai começar o jogo sacando. O jogador selecionado na checkbox começará o jogo sacando. Após o fim do primeiro game, o jogador selecionado na checkbox do time 2 terá o saque. Após isso, o sistema rotacionará o saque dos jogadores.</p>
      <GameTitle data={data} setData={setData} />
      <Row className={[styles.maxWidth, "mb-4"].join(" ")}>
        <Col className="col-3">
          <SetsType data={data} setData={setData} />
        </Col>
        <Col className="col-6">
          <TiebreakType data={data} setData={setData} />
        </Col>
      </Row>

      <Team data={data} setData={setData} setInitialGameState={setInitialGameState} />
    </Page>
  );
}
