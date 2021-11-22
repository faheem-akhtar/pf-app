/* eslint-disable @typescript-eslint/no-var-requires */

import '@testing-library/jest-dom';
import { StatsEmitter } from '@propertyfinder/pf-frontend-common/dist/module/stats/emitter';
import { NextRouter } from 'next/router';

import { mockReactUseSwrRecover, setupSwrMock } from 'mocks/react/use-swr.mock';

import { configStatsDataEncryptionKey } from 'config/stats-data-encryption-key';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { TFunctionType } from 'types/t-function/type';

import { translationsMap } from './misc/add-translation.mock';
import { recoverReactUseContext } from './react/use-context.mock';
import { recoverReactUseEffect } from './react/use-effect.mock';
import { recoverReactUseReducer } from './react/use-reducer.mock';
import { recoverReactUseRef } from './react/use-ref.mock';
import { recoverReactUseState } from './react/use-state.mock';
import { recoverWindowAddEventListener } from './window/add-event-listener.mock';
import { recoverWindowConsole } from './window/console.mock';
import { recoverWindowFetch } from './window/fetch.mock';
import { recoverWindowMockImportScript } from './window/import-script.mock';
import { recoverWindowRemoveEventListener } from './window/remove-event-listener.mock';

jest.mock('@propertyfinder/pf-frontend-common/dist/module/stats/emitter');

jest.mock('services/stats/service', () => {
  const statsServiceMock = new (StatsEmitter as jest.Mock)();
  return {
    StatsService: (): StatsEmitter => statsServiceMock,
  };
});

if (!global.window) {
  (global as unknown as { window: Window }).window = global as unknown as Window;
}
setupSwrMock();

jest.mock('next-i18next', () => ({
  useTranslation: (): {
    t: TFunctionType;
    i18n: {
      exists: (key: string) => boolean;
    };
  } => ({
    t: (key, options): string => {
      return typeof options !== 'string' && typeof options?.count !== 'undefined'
        ? (translationsMap[`${key}${options.count > 1 ? '_plural' : ''}`] || translationsMap[key] || key).replace(
            '{{count}}',
            options.count.toString()
          )
        : translationsMap[key] || key;
    },
    i18n: {
      exists: (key: string): boolean => !!translationsMap[key],
    },
  }),
}));

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: (): Promise<{ _nextI18Next: null }> => Promise.resolve({ _nextI18Next: null }),
}));

const router = {
  events: { on: jest.fn(), off: jest.fn() },
  locale: LanguageCodeEnum.en,
  pathname: '/search',
  asPath: '/search?c=4',
  push: jest.fn(),
} as unknown as NextRouter;

jest.mock('next/router', () => ({
  useRouter: (): NextRouter => router,
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: JSX.Element }): JSX.Element =>
      children
);

global.origin = 'default-origin';
(global as unknown as { snowplow: Function }).snowplow = jest.fn();
global.window.dataLayer = [];

// We do not want the test to fail because we updated the encryption key, so all the tests will see this key instead of the real one
jest.spyOn(configStatsDataEncryptionKey, 'get').mockReturnValue('test-encryption-key');

// We do not want anything random in the tests
jest.spyOn(Math, 'random').mockReturnValue(0.2);

beforeEach(() => {
  document.documentElement.scroll = jest.fn();

  // clean up global environment after each test
  recoverReactUseEffect();
  recoverReactUseReducer();
  recoverReactUseState();
  recoverWindowRemoveEventListener();
  recoverWindowAddEventListener();
  recoverWindowConsole();
  recoverWindowFetch();
  recoverReactUseRef();
  recoverWindowMockImportScript();
  recoverReactUseContext();
  mockReactUseSwrRecover();

  delete process.env.TRACE;
});
