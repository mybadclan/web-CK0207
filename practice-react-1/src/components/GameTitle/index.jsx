import { Input } from "../Input";
import styles from "./styles.module.scss";

export function GameTitle({ data = {}, setData = () => {} }) {
  const {
    gameInfo: { title },
  } = data;
  const changeHandler = (e) => {
    setData({
      ...data,
      gameInfo: {
        ...data.gameInfo,
        title: e.target.value,
      },
    });
  };
  return (
    <div className={styles.gameTitle}>
      <Input label="Título" value={title} onChange={changeHandler} />
    </div>
  );
}
