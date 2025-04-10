import { GenerateGameSeedRequest, GenerateGameSeedResponse } from './types';

import { MAX_RANDOM_NUMBER_VALUE } from '@/modules/GameBoard/constants';

const SEED_SOURCE = Array.from(
  { length: MAX_RANDOM_NUMBER_VALUE },
  (x, i) => i + 1,
);

/**
 * Generate unique ramdnom number array
 *
 * @param {number} cardsCount - array length
 *
 * @returns {array} - unique random number array
 */
export function generateGameSeed(cardsCount: number): number[] {
  //  @todo check why check number
  if (Number.isNaN(cardsCount) || cardsCount < 4) {
    cardsCount = 4;
  }

  if (cardsCount > MAX_RANDOM_NUMBER_VALUE) {
    cardsCount = MAX_RANDOM_NUMBER_VALUE;
  }

  const gameSeedSource = SEED_SOURCE.slice();

  const gameSeed = [];

  for (let i = 0; i < cardsCount; i += 1) {
    const seedIndex = Math.floor(Math.random() * gameSeedSource.length);

    const [seedValue] = gameSeedSource.splice(seedIndex, 1);

    gameSeed.push(seedValue);
  }

  return gameSeed;
}

export default (
  req: GenerateGameSeedRequest,
  res: GenerateGameSeedResponse
): void => {
  const cardsCount = Number(req.query.cardsCount);

  const gameSeed = generateGameSeed(cardsCount);

  res.status(200).json(gameSeed);
};
