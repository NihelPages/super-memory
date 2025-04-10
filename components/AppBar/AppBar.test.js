import { render } from '@testing-library/react';

import { AppBar } from './AppBar';

test('should render correctly', () => {
  const wrapper = render(
    <AppBar>
      <h3>Title</h3>
    </AppBar>,
  );

  expect(wrapper.queryByTestId('AppBar')).toBeVisible();
  expect(wrapper.queryByText('Title')).toBeVisible();
});
