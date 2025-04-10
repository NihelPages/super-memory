import { NextApiRequest, NextApiResponse } from 'next';


type GameSeed = number[];

export interface GenerateGameSeedRequest extends NextApiRequest {
  query: {
    cardsCount: string;
  };
}

export interface GenerateGameSeedResponse extends NextApiResponse {
  json: (data: GameSeed) => void;
}