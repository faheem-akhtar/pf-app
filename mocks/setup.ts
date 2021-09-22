/* eslint-disable @typescript-eslint/no-var-requires */

import '@testing-library/jest-dom';
import { NextRouter } from 'next/router';

import { mockReactUseSwrRecover, setupSwrMock } from 'mocks/react/use-swr.mock';

import { configStatsDataEncryptionKey } from 'config/stats-data-encryption-key';
import { LanguageCodeEnum } from 'enums/language/code.enum';

import { translationsMap } from './misc/add-translation.mock';
import { recoverReactUseEffect } from './react/use-effect.mock';
import { recoverReactUseReducer } from './react/use-reducer.mock';
import { recoverReactUseRef } from './react/use-ref.mock';
import { recoverReactUseState } from './react/use-state.mock';
import { recoverWindowAddEventListener } from './window/add-event-listener.mock';
import { mockWindowConsole, recoverWindowConsole } from './window/console.mock';
import { recoverWindowFetch } from './window/fetch.mock';
import { recoverWindowMockImportScript } from './window/import-script.mock';
import { recoverWindowRemoveEventListener } from './window/remove-event-listener.mock';

if (!global.window) {
  (global as unknown as { window: Window }).window = global as unknown as Window;
}
setupSwrMock();

jest.mock('next-i18next', () => ({
  useTranslation: (): {
    t: (key: string) => string;
    i18n: {
      exists: (key: string) => boolean;
    };
  } => ({
    t: (key: string): string => translationsMap[key] || key,
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
  pathname: 'https://propertyfinder.ae/en/search',
  asPath: 'https://propertyfinder.ae/en/search?c=4',
  push: jest.fn(),
} as unknown as NextRouter;

jest.mock('next/router', () => ({
  useRouter: (): NextRouter => router,
}));

global.origin = 'default-origin';
(global as unknown as { snowplow: Function }).snowplow = jest.fn();

// we need to mock the window console before pf-frontend-common aquire a reference to it (because after that it is not possible to mock it and we will have all the spam from analytics)
mockWindowConsole();

// We do not want the test to fail because we updated the encryption key, so all the tests will see this key instead of the real one
jest.spyOn(configStatsDataEncryptionKey, 'get').mockReturnValue('test-encryption-key');

// We do not want anything random in the tests
jest.spyOn(Math, 'random').mockReturnValue(0.2);

beforeEach(() => {
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
  mockReactUseSwrRecover();

  delete process.env.TRACE;
});
