import { render } from '@testing-library/react';

import { SeoComponent } from '../component';

describe('SeoComponent', () => {
  it('should render the component with primary content', () => {
    expect(
      render(
        <SeoComponent
          content={{
            primaryContent: '<p>This is param for primary content</p>',
            createdAt: '2021-01-01',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should render the component with primary content with image', () => {
    expect(
      render(
        <SeoComponent
          content={{
            primaryContent: '<p>This is param for primary content</p>',
            primaryImageUrl: 'https://www.propertyfinder.ae/dist/common/assets/favicon/favicon-32x32.png',
            createdAt: '2021-01-01',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should render the component with secondary content', () => {
    expect(
      render(
        <SeoComponent
          content={{
            secondaryContent: '<p>This is param for secondary content</p>',
            createdAt: '2021-01-01',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should render the component with secondary content with image', () => {
    expect(
      render(
        <SeoComponent
          content={{
            secondaryContent: '<p>This is param for secondary content</p>',
            secondaryImageUrl: 'https://www.propertyfinder.ae/dist/common/assets/favicon/favicon-32x32.png',
            createdAt: '2021-01-01',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });
});
