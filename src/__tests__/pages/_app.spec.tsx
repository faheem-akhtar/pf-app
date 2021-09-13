/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';
import React from 'react';

import MyApp from 'pages/_app';
import { LocaleService } from 'services/locale/service';

jest.mock('next-i18next', () => ({
  appWithTranslation: (Component: React.FunctionComponent): React.FunctionComponent =>
    function withTranslation(props): JSX.Element {
      return <Component {...props} />;
    },
}));

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
const makeDefaultProps = () =>
  ({
    Component: function DummyComponent(): JSX.Element {
      return <p>some text</p>;
    },
    pageProps: {},
    router: {},
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } as any);

describe('MyApp', () => {
  let setLocaleSpy: jest.SpyInstance;

  beforeEach(() => {
    setLocaleSpy = jest.spyOn(LocaleService, 'setLocale');
  });

  it('should set the locale', async () => {
    const defaultProps = makeDefaultProps();

    render(<MyApp {...defaultProps} />);

    await waitFor(() => {
      expect(setLocaleSpy).toHaveBeenCalled();
    });
  });

  describe('dir setup', () => {
    let dirSpy: jest.SpyInstance;

    beforeEach(() => {
      dirSpy = jest.spyOn(document.documentElement, 'dir', 'set');
    });

    it('should set the dir attribute with ltr', async () => {
      const defaultProps = makeDefaultProps();

      render(<MyApp {...defaultProps} />);

      await waitFor(() => {
        expect(dirSpy).toHaveBeenCalledWith('ltr');
      });
    });
  });
});
