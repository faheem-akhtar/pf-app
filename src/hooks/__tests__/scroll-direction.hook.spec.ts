import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseRef } from 'mocks/react/use-ref.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';
import { mockWindowAddEventListener } from 'mocks/window/add-event-listener.mock';
import { mockWindowRemoveEventListener } from 'mocks/window/remove-event-listener.mock';

import { useScrollDirection } from '../scroll-direction.hook';

describe('useScrollDirection', () => {
  let addEventListenerMock: jest.Mock;
  let removeEventListenerMock: jest.Mock;
  const defaultProps = {};

  beforeEach(() => {
    mockReactUseEffect({ callImmediately: true });
    mockReactUseRef();
    mockReactUseState();
    addEventListenerMock = mockWindowAddEventListener();
    removeEventListenerMock = mockWindowRemoveEventListener();
  });

  it('should add listener to the scroll event', () => {
    useScrollDirection(defaultProps);

    expect(addEventListenerMock).toHaveBeenCalledTimes(1);
    expect(addEventListenerMock.mock.calls[0][0]).toBe('scroll');
  });

  it('should set initial direction to Down', () => {
    const direction = useScrollDirection(defaultProps);

    expect(direction).toBe('down');
  });

  // TODO-FE[CX-790] Add a proper scroll direction test while mimicing scroll event.

  it('should remove scroll event listener on unmount ', () => {
    const { unmountAll } = mockReactUseEffect({ callImmediately: true });

    useScrollDirection(defaultProps);

    unmountAll();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(1);
    expect(removeEventListenerMock.mock.calls[0][0]).toBe('scroll');
  });
});
