import styles from "./styles.module.scss";
import { Row, Col } from "react-bootstrap";
import { Score } from "../Score";

export function ScoreBoard({ data = {}, setData = () => {}, children }) {
  return (
    <div className={styles.scoreBoard}>
      <p className={styles.title}>{data.gameInfo.title}</p>
      <Row className='m-0'>{children}</Row>
    </div>
  );
}
