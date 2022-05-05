import { Input } from "../Input";
import styles from "./styles.module.scss";

export function SetsType({ data = {}, setData = () => {} }) {
  const {
    gameInfo: { bestOfThreeSets },
  } = data;

  const changeHandler = (e) => {
    setData({
      ...data,
      gameInfo: {
        ...data.gameInfo,
        bestOfThreeSets: e.target.id === "three-sets" ? true : false,
      },
    });
  };
  return (
    <div className={styles.maxWidth}>
      <p>Quantidade de Sets</p>
      <div>
        <input
          id="three-sets"
          name="three-sets"
          type="checkbox"
          checked={bestOfThreeSets}
          onClick={changeHandler}
        />{" "}
        <label htmlFor="three-sets">3 sets</label>
      </div>

      <div>
        <input
          name="single-set"
          id="single-set"
          type="checkbox"
          checked={!bestOfThreeSets}
          onClick={changeHandler}
        />{" "}
        <label htmlFor="single-set">1 set</label>
      </div>
    </div>
  );
}
