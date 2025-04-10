/* eslint-disable no-await-in-loop */

import { fireEvent, render, waitFor, within } from '@testing-library/react';

import { GameBoard } from './GameBoard';

jest.setTimeout(20000);

test('should render and behave correctly', async () => {
  const cardsCount = 4;

  const GAME_SEED = [5, 2, 50, 10];

  const GAME_SOLUTION = [2, 5, 10, 50];

  const fetch = jest.fn();
  globalThis.fetch = fetch;

  const wrapper = render(<GameBoard />);

  /**
   * check for initial screen
   */

  expect(wrapper.queryByTestId('GameBoard/StartScreen')).toBeVisible();

  /**
   * start turn
   */

  fetch.mockResolvedValue({
    json: async () => GAME_SEED,
  });

  fireEvent.click(wrapper.queryByTestId(`GameBoard/StartScreen/${cardsCount}`));

  /**
   * check for turn initiation
   */

  expect(
    wrapper.queryByTestId('GameBoard/StartScreen'),
  ).not.toBeInTheDocument();

  expect(fetch).toHaveBeenLastCalledWith(
    `/api/generateGameSeed?cardsCount=${cardsCount}`,
  );

  const header = within(wrapper.queryByTestId('GameBoard/Header'));

  const cardsGrid = within(wrapper.queryByTestId('GameBoard/CardsGrid'));

  /**
   * check for loading state
   */

  expect(header.queryByText('Loading board...')).toBeVisible();

  /**
   * check for ready state
   */

  await waitFor(() => expect(header.queryByText('Get ready!')).toBeVisible());

  for (const cardsCount of GAME_SEED) {
    expect(cardsGrid.queryByTestId(`Card/${cardsCount}/front`)).toBeVisible();
    expect(
      cardsGrid.queryByTestId(`Card/${cardsCount}/front`),
    ).toHaveTextContent(cardsCount);
    expect(
      cardsGrid.queryByTestId(`Card/${cardsCount}/back`),
    ).not.toBeInTheDocument();
  }

  /**
   * check for playing state
   */

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await waitFor(() =>
    expect(
      header.queryByText('Select cards in ascending order...'),
    ).toBeVisible(),
  );

  /**
   * check cards for hiding on turn start
   */

  for (const cardsCount of GAME_SEED) {
    expect(cardsGrid.queryByTestId(`Card/${cardsCount}/back`)).toBeVisible();
    expect(
      cardsGrid.queryByTestId(`Card/${cardsCount}/front`),
    ).not.toBeInTheDocument();
  }
  /**
   * apply incorrect attempt and check for cards states
   */

  // TODO

  /**
   * apply correct solution and check for cards states
   */

  for (const cardsCount of GAME_SOLUTION) {
    fireEvent.click(wrapper.queryByTestId(`Card/${cardsCount}/back`));

    await waitFor(() => {
      expect(cardsGrid.queryByTestId(`Card/${cardsCount}/front`)).toBeVisible();
      expect(
        cardsGrid.queryByTestId(`Card/${cardsCount}/back`),
      ).not.toBeInTheDocument();
    });
  }

  /**
   * check game won state
   */

  await waitFor(() => expect(header.queryByText('You won!')).toBeVisible());

  for (const cardsCount of GAME_SEED) {
    expect(cardsGrid.queryByTestId(`Card/${cardsCount}/front`)).toBeVisible();
    expect(
      cardsGrid.queryByTestId(`Card/${cardsCount}/back`),
    ).not.toBeInTheDocument();
  }

  /**
   * check for continuation (cards count incremented)
   */

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await waitFor(() => expect(header.queryByText('Get ready!')).toBeVisible());

  expect(fetch).toHaveBeenLastCalledWith(
    `/api/generateGameSeed?cardsCount=${cardsCount + 4}`,
  );
});
