/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { mockReactUseReducer } from 'mocks/react/use-reducer.mock';
import { mockWindowRemoveEventListener } from 'mocks/window/remove-event-listener.mock';
import { touchEventStub } from 'stubs/touch/event.stub';

import { GalleryScrollComponent } from '../component';
import { GalleryScrollComponentPropsInterface } from '../component-props.interface';
import { GalleryScrollItemInterface } from '../item.interface';
import { galleryScrollMakeInitialState } from '../make-initial-state';

const image1: GalleryScrollItemInterface = { sourceUrl: '1' };
const image2: GalleryScrollItemInterface = { sourceUrl: '2' };
const image3: GalleryScrollItemInterface = { sourceUrl: '3' };
const initialState3Images = galleryScrollMakeInitialState([image1, image2, image3], false);

describe('AppearOnScrollComponent', () => {
  let defaultProps: GalleryScrollComponentPropsInterface;
  let removeEventListenerMock: jest.Mock;

  beforeEach(() => {
    removeEventListenerMock = mockWindowRemoveEventListener();

    defaultProps = {
      className: 'custom-class-name',
      items: [{ sourceUrl: '1' }, { sourceUrl: '2' }, { sourceUrl: '3' }, { sourceUrl: '4' }],
      isRtl: false,
      onTouch: jest.fn,
    };
  });

  it('should disconnect observer on unmount', async () => {
    mockReactUseReducer({ ...initialState3Images, pointerPositionStartX: 20 });
    const { unmount } = render(<GalleryScrollComponent {...defaultProps} />);

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(5);
    expect(removeEventListenerMock.mock.calls[0][0]).toBe('contextmenu');
    expect(removeEventListenerMock.mock.calls[1][0]).toBe('mousemove');
    expect(removeEventListenerMock.mock.calls[2][0]).toBe('touchmove');
    expect(removeEventListenerMock.mock.calls[3][0]).toBe('mouseup');
    expect(removeEventListenerMock.mock.calls[4][0]).toBe('touchend');
  });

  it('should dispatch start on mouse down', () => {
    const { dispatchMock } = mockReactUseReducer({ ...initialState3Images, pointerPositionStartX: 20 });

    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} />);

    fireEvent.mouseDown(getByTestId('gallery-scroll'), { clientX: 5, clientY: 8 });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 5,
      positionY: 8,
      type: 'start',
    });
  });

  it('should dispatch start on touch start', () => {
    const { dispatchMock } = mockReactUseReducer({ ...initialState3Images, pointerPositionStartX: 20 });

    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} />);

    fireEvent.touchStart(getByTestId('gallery-scroll'), {
      ...touchEventStub(),
      changedTouches: [{ pageX: 5, pageY: 6 } as Touch] as unknown as React.TouchList,
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 5,
      positionY: 6,
      type: 'start',
    });
  });

  it('single image case', () => {
    const { getAllByTestId } = render(<GalleryScrollComponent {...defaultProps} items={[image1]} />);

    expect(getAllByTestId('gallery-scroll-picture').length).toBe(1);
  });

  // TODO-FE[CX-408] Fix the gallery scroll image load test
  xit('loading class should be removed after image is loaded', () => {
    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} items={[image1]} />);

    fireEvent.load(getByTestId('gallery-scroll-picture'));

    expect(getByTestId('gallery-scroll-picture').className).toMatchInlineSnapshot(`"item"`);
  });
});
