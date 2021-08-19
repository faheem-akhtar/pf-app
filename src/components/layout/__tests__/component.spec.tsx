/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { LayoutComponent } from '../component';

describe('LayoutComponent', () => {
  it('renders without throwing any errors', () => {
    const { container } = render(<LayoutComponent pageTitle='page title'>children</LayoutComponent>);

    expect(container).toMatchInlineSnapshot(`
<div>
  children
</div>
`);
  });
});
