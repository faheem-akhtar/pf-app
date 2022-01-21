/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react';

import { HeadComponent } from '../component';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }): React.ReactElement => {
      return <>{children}</>;
    },
  };
});

describe('HeadComponent', () => {
  it('should have common tags', async () => {
    const { container } = render(<HeadComponent title='Title' />);

    expect(container).toMatchSnapshot();
  });

  it('should have description and urls', () => {
    const pageUrl = 'example.com';
    const description = 'Description';

    render(<HeadComponent title='Title' description={description} pageUrl={pageUrl} />);

    expect(document.querySelector("meta[property='og:description']")?.attributes.getNamedItem('content')?.value).toBe(
      description
    );
    expect(document.querySelector("meta[name='description']")?.attributes.getNamedItem('content')?.value).toBe(
      description
    );
    expect(document.querySelector("meta[property='og:url']")?.attributes.getNamedItem('content')?.value).toBe(pageUrl);
    expect(document.querySelector("link[rel='alternate']")?.attributes.getNamedItem('href')?.value).toBe(pageUrl);
    expect(document.querySelector("link[rel='canonical']")?.attributes.getNamedItem('href')?.value).toBe(pageUrl);
  });

  it('should have prev and next urls', () => {
    const prevPageUrl = 'prevpageurl.com';
    const nextPageUrl = 'nextpageurl.com';

    render(<HeadComponent title='Title' pagePreviousUrl={prevPageUrl} pageNextUrl={nextPageUrl} />);

    expect(document.querySelector("link[rel='prev']")?.attributes.getNamedItem('href')?.value).toBe(prevPageUrl);
    expect(document.querySelector("link[rel='next']")?.attributes.getNamedItem('href')?.value).toBe(nextPageUrl);
  });

  it('should have alternate url', () => {
    const alternateUrl = 'alternateurl.com';

    render(<HeadComponent title='Title' alternateUrl={alternateUrl} />);

    expect(document.querySelector("link[rel='alternate']")?.attributes.getNamedItem('href')?.value).toBe(alternateUrl);
    expect(document.querySelector("link[rel='alternate']")?.attributes.getNamedItem('hrefLang')?.value).toBe('ar');
  });
});
