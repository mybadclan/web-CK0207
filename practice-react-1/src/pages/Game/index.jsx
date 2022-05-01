import { useEffect } from 'react';
import { Page } from '../../components';
import { useGame } from '../../hooks/useGame';

import styles from './styles.module.scss';

export function Game() {
  const game = useGame();

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <Page className={styles.game}>
      hello
    </Page>
  )
}