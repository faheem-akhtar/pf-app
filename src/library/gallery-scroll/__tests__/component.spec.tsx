/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { galleryScrollMakeInitialState } from '../make-initial-state';
import { mockWindowRemoveEventListener } from 'mocks/window/remove-event-listener.mock';

import { GalleryScrollComponent } from '../component';
import { GalleryScrollComponentPropsInterface } from '../component-props.interface';
import { GalleryScrollItemInterface } from '../item.interface';
import { mockReactUseReducer } from 'mocks/react/use-reducer.mock';

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
    mockReactUseReducer({ ...initialState3Images, pointerPositionStart: 20 });
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
    const { dispatchMock } = mockReactUseReducer({ ...initialState3Images, pointerPositionStart: 20 });

    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} />);

    fireEvent.mouseDown(getByTestId('GalleryScroll'), { clientX: 5 });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 5,
      type: 'start',
    });
  });

  it('should dispatch start on touch start', () => {
    const { dispatchMock } = mockReactUseReducer({ ...initialState3Images, pointerPositionStart: 20 });

    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} />);

    fireEvent.mouseDown(getByTestId('GalleryScroll'));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 0,
      type: 'start',
    });
  });

  it('single image case', () => {
    const { getAllByTestId } = render(<GalleryScrollComponent {...defaultProps} items={[image1]} />);

    expect(getAllByTestId('GalleryScrollPicture').length).toBe(1);
  });

  // TODO-FE[CX-408] Fix the gallery scroll image load test
  xit('loading class should be removed after image is loaded', () => {
    const { getByTestId } = render(<GalleryScrollComponent {...defaultProps} items={[image1]} />);

    fireEvent.load(getByTestId('GalleryScrollPicture'));

    expect(getByTestId('GalleryScrollPicture').className).toMatchInlineSnapshot(`"item"`);
  });
});
