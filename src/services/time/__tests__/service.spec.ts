/**
 * @jest-environment jsdom
 */

import { recoverSetTimeout } from 'mocks/mock/set-timeout';
import { TimeService } from '../service';

describe('TimeService', () => {
  it('should call window setTimeout', () => {
    recoverSetTimeout();

    window.setTimeout = jest.fn() as never;

    const callback = (): null => null;
    const delay = 1;
    TimeService.setTimeout(callback, delay);

    expect(window.setTimeout).toHaveBeenCalledWith(callback, delay);
  });
});
