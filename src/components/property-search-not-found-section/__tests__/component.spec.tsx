import { render } from '@testing-library/react';

import { PropertySearchNotFoundSectionComponent } from '../component';

describe('PropertySearchNotFoundSectionComponent', () => {
  it('should render without throwing any errors', () => {
    const { container } = render(<PropertySearchNotFoundSectionComponent />);

    expect(container).toMatchSnapshot();
  });
});
