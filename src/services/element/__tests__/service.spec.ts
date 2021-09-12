import { recoverElementGetBoundingClientRect } from 'mocks/element/get-bounding-client-rect.mock';

import { ElementService } from '../service';

describe('ElementService', () => {
  it('should call elements get client rect', () => {
    recoverElementGetBoundingClientRect();
    const element = { getBoundingClientRect: jest.fn() } as unknown as Element;
    ElementService.getBoundingClientRect(element);

    expect(element.getBoundingClientRect).toBeCalled();
  });
});
