/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { FooterComponent } from '../component';

describe('FooterComponent Qatar', () => {
  it('should appear copyright', () => {
    const { getByText } = render(<FooterComponent />);

    expect(getByText('copyright')).toBeInTheDocument();
  });
});
