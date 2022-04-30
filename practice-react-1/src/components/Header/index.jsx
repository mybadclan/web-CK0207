import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>
          <Link to="/">Beach Tennis</Link>
        </h1>

        <nav>
          <ul>
            <li>
              <Link to="/game">Jogo</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
