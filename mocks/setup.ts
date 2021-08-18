/* eslint-disable @typescript-eslint/no-var-requires */

// import '@testing-library/jest-dom'
import React from 'react';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { setupSwrMock } from 'mocks/mock/use-swr';

global.React = React;

setupSwrMock();

jest.mock('next-i18next', () => ({
  useTranslation: (): {
    t: (key: string) => string;
    i18n: {
      exists: (key: string) => true;
    };
  } => ({
    t: (key: string): string => key,
    i18n: {
      exists: (): true => true,
    },
  }),
}));

jest.mock('next/router', () => ({
  useRouter: (): { locale: string } => ({
    locale: LanguageCodeEnum.en,
  }),
}));

afterEach(() => {
  // clean up global environment after each test
  require('mocks/mock/use-effect').recoverUseEffect();
  require('mocks/mock/use-reducer').recoverUseReducer();
  require('mocks/mock/window-remove-event-listener').recoverWindowRemoveEventListener();
  require('mocks/mock/window-add-event-listener').recoverWindowAddEventListener();
});
