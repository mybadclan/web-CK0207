import styles from "./styles.module.scss";
export function Players({ players }) {
  return (
    <div>
      <p>
        {players.playerOne}/{players.playerTwo}
      </p>
    </div>
  );
}
