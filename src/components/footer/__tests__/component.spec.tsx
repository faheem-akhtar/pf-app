import { render } from '@testing-library/react';

import { FooterComponent } from '../component';

describe('FooterComponent', () => {
  it('renders without throwing any errors', () => {
    const { container } = render(<FooterComponent />);

    expect(container).toMatchSnapshot();
  });

  it('should not appear copyright', () => {
    const { queryByText } = render(<FooterComponent />);

    expect(queryByText('copyright')).not.toBeInTheDocument();
  });
});
