import { TealiumUtagInterface } from 'services/tealium/utag.interface';

export const tealiumServiceStub = (): TealiumUtagInterface => ({
  view: jest.fn(),
  link: jest.fn(),
});
