import { Page, Team } from '../../components';

import styles from './styles.module.scss';

export function Register() {
  return (
    <Page className={styles.register}>
      <Team />
    </Page>
  );
}
