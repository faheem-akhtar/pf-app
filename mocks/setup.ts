/* eslint-disable @typescript-eslint/no-var-requires */

import { NextRouter } from 'next/router';

import { LanguageCodeEnum } from 'enums/language/code.enum';

import { recoverUseEffect } from './mock/use-effect';
import { recoverUseReducer } from './mock/use-reducer';
import { recoverUseState } from './mock/use-state';
import { recoverWindowAddEventListener } from './mock/window-add-event-listener';
import { recoverWindowRemoveEventListener } from './mock/window-remove-event-listener';
import { setupSwrMock } from 'mocks/mock/use-swr';
import { translationsMap } from './add-translation';
import { recoverConsole } from './mock/console';
import { recoverFetch } from './mock/fetch';

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
  recoverUseEffect();
  recoverUseReducer();
  recoverUseState();
  recoverWindowRemoveEventListener();
  recoverWindowAddEventListener();
  recoverConsole();
  recoverFetch();
  delete process.env.TRACE;
});
