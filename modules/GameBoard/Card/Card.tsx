import { useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';

import cx from 'classnames';

import styles from './Card.module.css';

import { GAME_STATE } from '../constants';

interface CardProps {
  gameState: string;
  value: number;
  isVisible: boolean;
  onClick: (value: number) => void;
}

export const Card: React.FC<CardProps> = ({ gameState, value, isVisible, onClick }) => {
  const { transform, opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `perspective(600px) rotateX(${isVisible ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = useCallback(() => {
    if (!isVisible) {
      onClick(value);
    }
  }, [isVisible, value, onClick]);

  return (
    <div
      aria-hidden="true"
      onClick={handleClick}
      className={styles.root}
      data-testid={`Card/${value}/${isVisible ? 'front' : 'back'}`}
    >
       <animated.div
        className={cx(
          styles.animated_container,
          gameState === GAME_STATE.TURN_WON ? styles.success : styles.back,
        )}
        style={{
          opacity: opacity.interpolate((o) => 1 - o),
          transform,
        }}
      />
      <animated.div
        className={cx(
          styles.animated_container,
          gameState === GAME_STATE.TURN_LOST
            ? styles.front_error
            : styles.front,
          gameState === GAME_STATE.TURN_WON ? styles.success : styles.front,
        )}
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        {value}
      </animated.div>
    </div>
  );
};
