/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { LoaderTemplate } from '../template';

describe('LoaderTemplate', () => {
  it('renders without throwing any errors', () => {
    const { container } = render(<LoaderTemplate />);

    expect(container).toMatchSnapshot();
  });
});
