import Head from 'next/head';

import { AppBar } from '@/components/AppBar';
import { GameBoard } from '@/modules/GameBoard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Memory Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Memory game" />
      </Head>
      <div className="container">
        <AppBar>
          <h1>Memory Game</h1>
        </AppBar>
        <div className="main">
          <GameBoard />
        </div>
      </div>
    </>
  );
}
