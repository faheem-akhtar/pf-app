import { render } from '@testing-library/react';

import { SeoContentComponent } from '../component';

describe('SeoContentComponent', () => {
  it('should render the component with all the props', () => {
    expect(
      render(
        <SeoContentComponent
          heading='This is h2 heading'
          content='<p>This is an html paragraph</p>'
          image={{
            url: 'https://www.propertyfinder.ae/dist/common/assets/favicon/favicon-32x32.png',
            alt: 'Property Finder logo',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should align the image to left', () => {
    expect(
      render(
        <SeoContentComponent
          content='<p>This is an html paragraph</p>'
          image={{
            url: 'https://www.propertyfinder.ae/dist/common/assets/favicon/favicon-32x32.png',
            alt: 'Property Finder logo',
            align: 'left',
          }}
        />
      ).container
    ).toMatchSnapshot();
  });
});
