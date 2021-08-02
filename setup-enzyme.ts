/// <reference types='enzyme-adapter-preact-pure' />

import React from 'react'
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-preact-pure';

// Configure Enzyme for the appropriate React adapter
configure({ adapter: new Adapter() });
global.React = React