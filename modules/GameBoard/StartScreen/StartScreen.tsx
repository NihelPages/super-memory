import styles from './StartScreen.module.css';
import { GAME_OPTIONS } from '../constants';

interface StartScreenProps {
  onStartGame: (cardsCount: number) => void;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div className={styles.root} data-testid="GameBoard/StartScreen">
      <h3>Choose the number of cards to play</h3>
      <div className={styles.options_container}>
        {GAME_OPTIONS.map((option) => (
          <button
            key={option.cardsCount}
            type="button"
            className={styles.option}
            style={
              {
                '--option-color': option.color,
                '--option-active-color': option.activeColor,
              } as React.CSSProperties
            }
            onClick={() => onStartGame(option.cardsCount)}
            data-testid={`GameBoard/StartScreen/${option.cardsCount}`}
          >
            {option.cardsCount}
          </button>
        ))}
      </div>
    </div>
  );
}
