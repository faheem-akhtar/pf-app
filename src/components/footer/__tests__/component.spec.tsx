import { render } from '@testing-library/react';

import { FooterComponent } from '../component';

describe('FooterComponent', () => {
  it('renders without throwing any errors', () => {
    const { container } = render(<FooterComponent />);

    expect(container).toMatchSnapshot();
  });
});
