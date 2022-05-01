import { Page, Team, GameTitle } from "../../components";

import styles from "./styles.module.scss";

export function Register({ data = {}, setData = () => {} }) {
  return (
    <Page className={styles.register}>
      <GameTitle data={data} setData={setData} />
      <Team data={data} setData={setData} />
    </Page>
  );
}
