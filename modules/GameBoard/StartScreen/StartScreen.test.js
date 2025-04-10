import { fireEvent, render } from '@testing-library/react';

import { StartScreen } from './StartScreen';

const CARDS_COUNT_VALUES = [4, 8, 12];

test('should render correctly', () => {
  const onStartGame = jest.fn();

  const wrapper = render(<StartScreen onStartGame={onStartGame} />);

  expect(
    wrapper.queryByText('Choose the number of cards to play'),
  ).toBeVisible();

  CARDS_COUNT_VALUES.forEach((cardsCount) => {
    const element = wrapper.queryByTestId(
      `GameBoard/StartScreen/${cardsCount}`,
    );

    expect(element).toBeVisible();
    expect(element).toHaveTextContent(cardsCount);
  });
});

test('should behave correctly', () => {
  const handleLevelSelected = jest.fn();

  const wrapper = render(<StartScreen onStartGame={handleLevelSelected} />);

  CARDS_COUNT_VALUES.forEach((cardsCount) => {
    const element = wrapper.queryByTestId(
      `GameBoard/StartScreen/${cardsCount}`,
    );

    fireEvent.click(element);
    expect(handleLevelSelected).toHaveBeenLastCalledWith(cardsCount);
  });
});
