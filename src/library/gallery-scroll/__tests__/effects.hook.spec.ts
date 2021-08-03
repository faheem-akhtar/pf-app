/**
 * @jest-environment jsdom
 */

import { mockUseEffect } from 'mocks/mock/use-effect';
import { mockWindowAddEventListener } from 'mocks/mock/window-add-event-listener';
import { useGalleryScrollEffects } from '../effects.hook';

let dispatchMock: jest.Mock;
let addEventListenerMock: jest.Mock;

beforeEach(() => {
  mockUseEffect();
  dispatchMock = jest.fn();
  addEventListenerMock = mockWindowAddEventListener();
});

describe('useGalleryScrollEffects', () => {
  it('should add listeners when mouse or touch down', () => {
    useGalleryScrollEffects(true, dispatchMock);
    expect(addEventListenerMock).toHaveBeenCalledTimes(5);
    expect(addEventListenerMock.mock.calls[0][0]).toBe('contextmenu');
    expect(addEventListenerMock.mock.calls[1][0]).toBe('mousemove');
    expect(addEventListenerMock.mock.calls[2][0]).toBe('touchmove');
    expect(addEventListenerMock.mock.calls[3][0]).toBe('mouseup');
    expect(addEventListenerMock.mock.calls[4][0]).toBe('touchend');
  });

  it('should not add listeners when mouse or touch are not down', () => {
    useGalleryScrollEffects(false, dispatchMock);
    expect(addEventListenerMock).toHaveBeenCalledTimes(0);
  });

  it('should disable context menu', () => {
    useGalleryScrollEffects(true, dispatchMock);
    const contextMenuCall = addEventListenerMock.mock.calls[0];
    const [name, callback] = contextMenuCall;
    expect(name).toBe('contextmenu');

    const callbackProps = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    const result = callback(callbackProps);

    expect(result).toBe(false);
    expect(callbackProps.preventDefault).toBeCalledTimes(1);
    expect(callbackProps.stopPropagation).toBeCalledTimes(1);
  });

  it('should dispatch move action on mouse move', () => {
    useGalleryScrollEffects(true, dispatchMock);
    const contextMenuCall = addEventListenerMock.mock.calls[1];
    const [name, callback] = contextMenuCall;
    expect(name).toBe('mousemove');

    callback({ clientX: 3 });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'move', positionX: 3 });
  });

  it('should dispatch move action on touch move', () => {
    useGalleryScrollEffects(true, dispatchMock);
    const contextMenuCall = addEventListenerMock.mock.calls[2];
    const [name, callback] = contextMenuCall;
    expect(name).toBe('touchmove');

    callback({ changedTouches: [{ pageX: 3 }] });

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'move', positionX: 3 });
  });

  it('should dispatch end action on mouse up and stop propagation of event', () => {
    useGalleryScrollEffects(true, dispatchMock);
    const contextMenuCall = addEventListenerMock.mock.calls[3];
    const [name, callback] = contextMenuCall;
    expect(name).toBe('mouseup');

    const callbackProps = {
      stopPropagation: jest.fn(),
    };
    callback(callbackProps);

    expect(callbackProps.stopPropagation).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'end' });
  });

  it('should dispatch end action on touchend and stop propagation of event', () => {
    useGalleryScrollEffects(true, dispatchMock);
    const contextMenuCall = addEventListenerMock.mock.calls[4];
    const [name, callback] = contextMenuCall;
    expect(name).toBe('touchend');

    const callbackProps = {
      stopPropagation: jest.fn(),
    };
    callback(callbackProps);

    expect(callbackProps.stopPropagation).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'end' });
  });
});
