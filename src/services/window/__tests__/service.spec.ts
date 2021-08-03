/**
 * @jest-environment jsdom
 */

import { WindowService } from '../service';

describe('ElementService', () => {
  it('should call forward call to window.addEventListener', () => {
    window.addEventListener = jest.fn() as never;
    const callbackFn = (): null => null;

    WindowService.addEventListener('mouseup', callbackFn, true);

    expect(window.addEventListener).toBeCalledWith('mouseup', callbackFn, true);
  });

  it('should call forward call to window.removeEventListener', () => {
    window.removeEventListener = jest.fn() as never;
    const callbackFn = (): null => null;

    WindowService.removeEventListener('mouseup', callbackFn);

    expect(window.removeEventListener).toBeCalledWith('mouseup', callbackFn);
  });
});
