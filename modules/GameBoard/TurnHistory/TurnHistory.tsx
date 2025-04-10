import { GAME_STATE } from '../constants';

import styles from './TurnHistory.module.css';

interface TurnHistoryProps {
  timeStamp: string;
  cardsCount: number;
  state: string;
}

export function TurnHistory({ turnsHistory }: { turnsHistory: TurnHistoryProps[] }) {
  return (
    <div className={styles.root}>
      {turnsHistory &&
        turnsHistory.map((turn, index) => (
          <pre key={turn.timeStamp}>
            {turnsHistory.length - index}: {turn.cardsCount} cards:{' '}
            {turn.state === GAME_STATE.TURN_WON ? 'won!' : 'lost...'}
          </pre>
        ))}
    </div>
  );
}