import { fireEvent, render } from '@testing-library/react';

import { Button } from './Button';

test('should render correctly', () => {
  const handleClick = jest.fn();

  const wrapper = render(<Button onClick={handleClick}>Click Me</Button>);

  const button = wrapper.queryByText('Click Me');

  expect(button).toBeVisible();
});

test('should behave correctly', () => {
  const handleClick = jest.fn();

  const wrapper = render(<Button onClick={handleClick}>Click Me</Button>);

  const button = wrapper.queryByText('Click Me');

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
