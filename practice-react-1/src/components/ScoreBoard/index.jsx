import styles from "./styles.module.scss";
export function ScoreBoard({ data = {}, setData = () => {}, children }) {
  return (
    <div className={styles.scoreBoard}>
      <div className={styles.title}>
        <p>{data.gameInfo.title}</p>
      </div>

      {children}
    </div>
  );
}
