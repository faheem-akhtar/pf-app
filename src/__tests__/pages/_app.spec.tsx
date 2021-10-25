import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { userModelStub } from 'stubs/user/model.stub';

import MyApp from 'pages/_app';
import * as AuthServiceModule from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { AuthSubscriberType } from 'services/auth/subscriber.type';
import { LocaleService } from 'services/locale/service';
import * as contexterServiceModule from 'services/stats/contexter.service';

const serviceMock = {
  setAuthenticationUser: jest.fn(),
  setAuthenticationProvider: jest.fn(),
};

jest.mock('services/stats/contexter.service', () => ({
  StatsContexterService: (): typeof serviceMock => serviceMock,
}));

jest.mock('services/auth/service', () => ({
  AuthService: {
    getUser: (): ReturnType<typeof AuthServiceModule.AuthService['getUser']> => userModelStub(),
    subscribe: (subscriber: AuthSubscriberType): ReturnType<typeof AuthServiceModule.AuthService['subscribe']> => {
      subscriber(userModelStub(), { eventType: AuthSubscribeEventTypeEnum.subscribe, providerType: 'Email' });
      return jest.fn();
    },
  },
}));

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

  it('should set auth context', async () => {
    const defaultProps = makeDefaultProps();

    render(<MyApp {...defaultProps} />);

    await waitFor(() => {
      expect(contexterServiceModule.StatsContexterService().setAuthenticationUser).toHaveBeenCalledWith({
        email: 'test@propertyfinder.ae',
        firstName: 'FirstName',
        id: 1,
        lastName: 'LastName',
      });
    });
    expect(contexterServiceModule.StatsContexterService().setAuthenticationProvider).toHaveBeenCalledWith('Email');
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
