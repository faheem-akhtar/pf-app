/* eslint-disable @typescript-eslint/no-var-requires */

import '@testing-library/jest-dom';

import { NextRouter } from 'next/router';

import { LanguageCodeEnum } from 'enums/language/code.enum';

import { recoverReactUseEffect } from './react/mock-use-effect';
import { recoverReactUseReducer } from './react/mock-use-reducer';
import { recoverReactUseRef } from './react/mock-use-ref';
import { recoverReactUseState } from './react/mock-use-state';
import { recoverWindowAddEventListener } from './window/add-event-listener.mock';
import { recoverWindowConsole } from './window/console.mock';
import { recoverWindowFetch } from './window/fetch.mock';
import { recoverWindowMockImportScript } from './window/import-script.mock';
import { recoverWindowRemoveEventListener } from './window/remove-event-listener.mock';
import { setupSwrMock } from 'mocks/react/mock-use-swr';
import { translationsMap } from './misc/add-translation.mock';

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

afterEach(() => {
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

  delete process.env.TRACE;
});
