import { TealiumServiceInterface } from 'services/tealium/service.interface';

export const tealiumServiceStub = (): TealiumServiceInterface => ({
  view: jest.fn(),
  link: jest.fn(),
  onAppDownloadClicked: jest.fn(),
  onPageViewRendered: jest.fn(),
  onConversionEventCalled: jest.fn(),
});
