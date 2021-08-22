/* eslint-disable @typescript-eslint/no-var-requires */

import { NextRouter } from 'next/router';
import React from 'react';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { setupSwrMock } from 'mocks/mock/use-swr';
import { translationsMap } from './add-translation';

global.React = React;

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
  require('mocks/mock/use-effect').recoverUseEffect();
  require('mocks/mock/use-reducer').recoverUseReducer();
  require('mocks/mock/window-remove-event-listener').recoverWindowRemoveEventListener();
  require('mocks/mock/window-add-event-listener').recoverWindowAddEventListener();
});
