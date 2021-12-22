import { render } from '@testing-library/react';

import { seoLinksStub } from 'stubs/seo/links.stub';

import { SeoLinksComponent } from '../component';

describe('SeoLinksComponent', () => {
  it('should not render anything when both links are empty', () => {
    const { container } = render(<SeoLinksComponent />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders without throwing any errors', () => {
    const { container } = render(<SeoLinksComponent {...seoLinksStub()} />);

    expect(container).toMatchSnapshot();
  });
});
