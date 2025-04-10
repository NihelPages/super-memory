import { useState, useEffect, useCallback, useMemo } from 'react';

import { Card } from './Card';
import { StartScreen } from './StartScreen';
import { TurnHistory } from './TurnHistory';

import {
  GAME_STATE,
  NEXT_TURN_DELAY,
  TURN_RESET_DELAY,
  GAME_CARDS_COUNT_INCREMENT,
  TURN_START_DELAY_BY_CARD,
  TURN_HISTORY_STORAGE_KEY,
  CARDS_COUNT_STORAGE_KEY,
  GAME_STATE_MESSAGE
} from './constants';

import { Header } from './Header';

import styles from './GameBoard.module.css';

export const GameBoard = () => {

  //  @todo define types for turnsHistory, gameState, and gameAttempt
  const [turnsHistory, setTurnsHistory] = useState<
    { timeStamp: string; cardsCount: number | null; state: string }[]
  >([]);

  const [cardsCount, setCardsCount] = useState<number | null>(null);

  const [gameSeed, setGameSeed] = useState([]);

  const gameSolution = useMemo(() => [...gameSeed].sort((a, b) => a - b), [
    gameSeed,
  ]);

  const [gameAttempt, setGameAttempt] = useState<number[]>([]);

  //  @todo check gameState type
  // const [gameState, setGameState] = useState<keyof typeof GAME_STATE>(GAME_STATE.INIT);
  const [gameState, setGameState] = useState<(typeof GAME_STATE)[keyof typeof GAME_STATE]>(GAME_STATE.INIT);

  const startGame = useCallback((cardsCount: number) => {
    setCardsCount(cardsCount);
    setGameState(GAME_STATE.LOADING);
  }, []);

  const onResetGame = useCallback(() => {
    setTurnsHistory([]);
    setGameState(GAME_STATE.INIT);
  }, []);

  const onReplayTurn = useCallback(() => setGameState(GAME_STATE.READY), []);

  const onCardClick = useCallback(
    (value: number) => {
      setGameAttempt((state) => {
        if (gameState !== GAME_STATE.PLAYING) {
          return state;
        }

        return [...state, value];
      });
    },
    [gameState],
  );

  //  @todo check if useCallback make sense here
  const saveTurnsHistory = useCallback(() => {
    setTurnsHistory((turnsHistory) => [
      {
        timeStamp: new Date().toISOString(),
        cardsCount,
        state: gameState as keyof typeof GAME_STATE,
      },
      ...turnsHistory,
    ]);
  }, [cardsCount, gameState]);

  useEffect(
    function gameStateLoop() {
      if (gameState === GAME_STATE.INIT) {
        setGameAttempt([]);
        setCardsCount(null);
      } else if (gameState === GAME_STATE.READY) {
        setGameAttempt([]);
        setTimeout(() => {
          setGameState(GAME_STATE.PLAYING);
        }, TURN_START_DELAY_BY_CARD * (cardsCount ?? 0));
      } else if (gameState === GAME_STATE.TURN_LOST) {
         // eslint-disable-next-line
        saveTurnsHistory(setTurnsHistory, cardsCount, gameState);

        setTimeout(() => {
          setGameAttempt([]);
          setGameState(GAME_STATE.PLAYING);
        }, TURN_RESET_DELAY);
      } else if (gameState === GAME_STATE.TURN_WON) {
        // eslint-disable-next-line
        saveTurnsHistory(setTurnsHistory, cardsCount, gameState);

        setTimeout(() => {
          setCardsCount((state) => (state ?? 0) + GAME_CARDS_COUNT_INCREMENT);
          setGameState(GAME_STATE.LOADING);
        }, NEXT_TURN_DELAY);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState],
  );

  useEffect(
    function initiateGame() {
      if (gameState !== GAME_STATE.LOADING) {
        return;
      }

      fetch(`/api/generateGameSeed?cardsCount=${cardsCount}`)
        .then((response) => response.json())
        .then((response) => {
          setGameSeed(response);
          setGameState(GAME_STATE.READY);
        })
        .catch((error) => {
          setGameState(GAME_STATE.LOADING_FAILED);
        });
    },
    [cardsCount, gameState],
  );

  useEffect(
    function gameAttemptHandler() {
      if (gameState !== GAME_STATE.PLAYING) {
        return;
      }

      const isCorrect =
        gameSolution.slice(0, gameAttempt.length).join() === gameAttempt.join();

      if (isCorrect) {
        if (gameAttempt.length < gameSolution.length) {
          // do nothing
        } else {
          setGameState(GAME_STATE.TURN_WON);
        }
      } else {
        setGameState(GAME_STATE.TURN_LOST);
      }
    },
    [gameAttempt, gameSolution, gameState],
  );

  useEffect(function loadTurnHistory() {
    try {
      const turnsHistory = JSON.parse(
        localStorage.getItem(TURN_HISTORY_STORAGE_KEY) || '[]',
      );
      setTurnsHistory(turnsHistory);
    } catch (error) { }
  }, []);

  useEffect(
    function saveTurnHistory() {
      try {
        localStorage.setItem(
          TURN_HISTORY_STORAGE_KEY,
          JSON.stringify(turnsHistory),
        );
      } catch (error) { }
    },
    [turnsHistory],
  );

  useEffect(function loadCardsCount() {
    try {
      const cardsCount = JSON.parse(
        localStorage.getItem(CARDS_COUNT_STORAGE_KEY) || 'null',
      );
      if (cardsCount) {
        setCardsCount(cardsCount);
        setGameState(GAME_STATE.LOADING);
      }
    } catch (error) { }
  }, []);

  useEffect(
    function saveCardsCount() {
      try {
        localStorage.setItem(
          CARDS_COUNT_STORAGE_KEY,
          JSON.stringify(cardsCount),
        );
      } catch (error) { }
    },
    [cardsCount],
  );

  return (
    <div className="pageContainer" data-testid="GameBoard">
      {gameState === GAME_STATE.INIT && <StartScreen onStartGame={startGame} />}

      {gameState !== GAME_STATE.INIT && (
        <Header
          // eslint-disable-next-line
          gameState={gameState}
          onResetGame={onResetGame}
          onReplayTurn={onReplayTurn}
        />
      )}

      {gameState !== GAME_STATE.INIT &&
        gameState !== GAME_STATE.LOADING_FAILED && (
          <div className={styles.card_grid} data-testid="GameBoard/CardsGrid">
            {gameSeed.map((value) => (
              <Card
                gameState={gameState}
                key={value}
                value={value}
                isVisible={
                  gameState === GAME_STATE.READY ||
                  ((gameState === GAME_STATE.PLAYING ||
                    gameState === GAME_STATE.TURN_WON ||
                    gameState === GAME_STATE.TURN_LOST) &&
                    gameAttempt.includes(value))
                }
                onClick={onCardClick}
              />
            ))}
          </div>
        )}

      {/* <TurnHistory turnsHistory={turnsHistory} /> */}
      {/* @todo check this code  */}
      <TurnHistory
        turnsHistory={turnsHistory.map((turn) => ({
          ...turn,
          cardsCount: turn.cardsCount ?? 0, // Default to 0 if null
        }))}
      />
    </div>
  );
};
