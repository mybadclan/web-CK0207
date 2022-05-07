import styles from "./styles.module.scss";
import { Row } from "react-bootstrap";
import { Timer } from "../Timer";

export function ScoreBoard({ data = {}, setData = () => {}, children }) {
  return (
    <div className={styles.scoreBoard}>
      <header className={styles.scoreBoardHeader}>
        <p className={styles.title}>{data.gameInfo.title}</p>
        <Timer className={styles.timer} stopped={data.gameInfo.isOver} />
      </header>
      <Row className="m-0">{children}</Row>
    </div>
  );
}
