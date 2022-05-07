import styles from "./styles.module.scss";

export function TiebreakType({ data = {}, setData = () => {} }) {
  const {
    gameInfo: { bestOfThreeSets, lastSetIsSupertiebrake },
  } = data;

  const changeHandler = (e) => {
    setData({
      ...data,
      gameInfo: {
        ...data.gameInfo,
        lastSetIsSupertiebrake: e.target.id === "super-tiebreak" ? true : false,
      },
    });
  };
  return (
    bestOfThreeSets && (
      <div className={styles.maxWidth}>
        <p>Tipe de tiebreak</p>
        <div>
          <input
            id="tiebreak"
            name="tiebreak"
            type="checkbox"
            checked={!lastSetIsSupertiebrake}
            onClick={changeHandler}
          />{" "}
          <label htmlFor="tiebreak">Tiebreak simples</label>
        </div>

        <div>
          <input
            name="super-tiebreak"
            id="super-tiebreak"
            type="checkbox"
            checked={lastSetIsSupertiebrake}
            onClick={changeHandler}
          />{" "}
          <label htmlFor="super-tiebreak">Super tiebreak</label>
        </div>
      </div>
    )
  );
}
