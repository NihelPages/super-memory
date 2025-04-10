export const GAME_STATE = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  LOADING_FAILED: 'LOADING_FAILED',
  READY: 'READY',
  PLAYING: 'PLAYING',
  TURN_WON: 'TURN_WON',
  TURN_LOST: 'TURN_LOST',
};

export const GAME_STATE_MESSAGE = {
  LOADING: 'Loading board...',
  LOADING_FAILED: 'Loading board failed!',
  READY: 'Get ready!',
  PLAYING: 'Select cards in ascending order...',
  TURN_WON: 'You won!',
  TURN_LOST: 'Try again!',
};

export const GAME_CARDS_COUNT_INCREMENT = 4;

export const GAME_OPTIONS = [
  {
    cardsCount: 4,
    color: 'var(--color-red)',
    activeColor: 'var(--color-red-light)',
  },
  {
    cardsCount: 8,
    color: 'var(--color-yellow)',
    activeColor: 'var(--color-yellow-light)',
  },
  {
    cardsCount: 12,
    color: 'var(--color-blue)',
    activeColor: 'var(--color-blue-light)',
  },
];

export const TURN_START_DELAY_BY_CARD = 500;

export const NEXT_TURN_DELAY = 1000;

export const TURN_RESET_DELAY = 800;

/**
 * as numbers are unique, MAX_RANDOM_NUMBER_VALUE is also the max cardCount
 * possible for the game
 */
export const MAX_RANDOM_NUMBER_VALUE = 100;

export const TURN_HISTORY_STORAGE_KEY = 'GameBoard.turnHistory';

export const CARDS_COUNT_STORAGE_KEY = 'GameBoard.cardsCount';
