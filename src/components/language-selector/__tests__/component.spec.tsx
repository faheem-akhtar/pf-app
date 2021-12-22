import { render, screen } from '@testing-library/react';
import { NextRouter } from 'next/router';

import { LanguageCodeEnum } from 'enums/language/code.enum';

import { LanguageSelectorComponent } from '../component';

const routerMock = {
  events: { on: jest.fn(), off: jest.fn() },
  locale: LanguageCodeEnum.en,
  pathname: '/search',
  asPath: '/search?c=4',
  push: jest.fn(),
} as unknown as NextRouter;

let router: NextRouter = routerMock;

jest.mock('next/router', () => ({
  useRouter: (): NextRouter => router,
}));

describe('LanguageSelectorComponent', () => {
  afterEach(() => {
    router = routerMock;
  });

  it('should render without throwing any errors', () => {
    expect(render(<LanguageSelectorComponent />).container).toMatchSnapshot();
  });

  it('should have correct value for link', () => {
    render(<LanguageSelectorComponent />);
    const link = screen.getByRole('link', { name: 'language-selector' });

    expect(link).toHaveAttribute('href', '/ar/search?c=4');
    expect(link).toHaveTextContent('menu.language.ar');
  });

  describe('English to Arabic', () => {
    [
      {
        pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        path: '/buy/apartments-for-sale.html',
        targetPath: '/ar/للبيع/شقق-للبيع.html',
      },
      {
        pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        path: '/buy/properties-for-sale.html',
        targetPath: '/ar/للبيع/عقارات-للبيع.html',
      },
    ].forEach(({ pattern, path, targetPath }) => {
      it('should have correct value for the link', () => {
        router.query = { pattern };
        router.asPath = path;
        router.locale = 'en';

        render(<LanguageSelectorComponent />);

        const link = screen.getByRole('link', { name: 'language-selector' });
        expect(link).toHaveAttribute('href', targetPath);
      });
    });
  });

  describe('Arabic to English', () => {
    [
      {
        pattern: '/categorySlug/propertyTypeSlug-saleType.html',
        path: '/للبيع/شقق-للبيع.html',
        targetPath: '/en/buy/apartments-for-sale.html',
      },
    ].forEach(({ pattern, path, targetPath }) => {
      it('should have correct value for the link', () => {
        router.query = { pattern };
        router.asPath = path;
        router.locale = 'ar';

        render(<LanguageSelectorComponent />);

        const link = screen.getByRole('link', { name: 'language-selector' });
        expect(link).toHaveAttribute('href', targetPath);
      });
    });
  });
});
