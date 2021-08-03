/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types='enzyme-adapter-preact-pure' />

import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-preact-pure';
import React from 'react';

// Configure Enzyme for the appropriate React adapter
configure({ adapter: new Adapter() });

global.React = React;

afterEach(() => {
  // clean up global environment after each test
  require('mocks/mock/use-effect').recoverUseEffect();
  require('mocks/mock/use-reducer').recoverUseReducer();
  require('mocks/mock/window-remove-event-listener').recoverWindowRemoveEventListener();
  require('mocks/mock/window-add-event-listener').recoverWindowAddEventListener();
});
