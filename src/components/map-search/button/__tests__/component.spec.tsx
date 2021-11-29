import { render } from '@testing-library/react';

import { MapSearchButtonComponent } from '../component';

describe('MapSearchButtonComponent', () => {
  it('should render without throwing any errors', () => {
    const { container } = render(<MapSearchButtonComponent />);

    expect(container).toMatchSnapshot();
  });
});
