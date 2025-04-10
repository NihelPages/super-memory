import cx from 'classnames';

import { Button } from '@/components/Button';
import styles from './Header.module.css';
import { GAME_STATE, GAME_STATE_MESSAGE } from '../constants';

interface HeaderProps {
  gameState: keyof typeof GAME_STATE;
  onResetGame: () => void;
  onReplayTurn: () => void;
}

export function Header({ gameState, onResetGame, onReplayTurn }: HeaderProps) {
  return (
    <div data-testid="GameBoard/Header">
      <div className={styles.board_actions}>
        <Button color="secondary" onClick={onReplayTurn}>
          replay turn
        </Button>
        <Button color="primary" onClick={onResetGame}>
          restart game
        </Button>
      </div>

      <div>
        <h2
          className={cx({
            [styles.message_error]: gameState === GAME_STATE.TURN_LOST,
            [styles.message_success]: gameState === GAME_STATE.TURN_WON,
            [styles.message_info]:
              gameState !== GAME_STATE.TURN_LOST &&
              gameState !== GAME_STATE.TURN_WON,
          })}
        >
          {GAME_STATE_MESSAGE[gameState]}
        </h2>
      </div>
    </div>
  );
}

