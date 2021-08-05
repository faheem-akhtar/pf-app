/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types='enzyme-adapter-preact-pure' />

import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-preact-pure';
import React from 'react';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { setupSwrMock } from 'mocks/mock/use-swr';

// Configure Enzyme for the appropriate React adapter
configure({ adapter: new Adapter() });

global.React = React;

setupSwrMock();

jest.mock('next-i18next', () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string): string => key,
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
