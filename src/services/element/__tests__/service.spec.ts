import { recoverElementGetBoundingClientRect } from 'mocks/element/mock-get-bounding-client-rect';

import { ElementService } from '../service';

describe('ElementService', () => {
  it('should call elements get client rect', () => {
    recoverElementGetBoundingClientRect();
    const element = { getBoundingClientRect: jest.fn() } as unknown as Element;
    ElementService.getBoundingClientRect(element);

    expect(element.getBoundingClientRect).toBeCalled();
  });
});
