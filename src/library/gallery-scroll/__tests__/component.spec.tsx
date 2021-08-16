/**
 * @jest-environment jsdom
 */

import { mount, shallow } from 'enzyme';
import { RefObject } from 'react';

import { galleryScrollMakeInitialState } from '../make-initial-state';
import { mockUseEffect } from 'mocks/mock/use-effect';
import { mockUseReducer } from 'mocks/mock/use-reducer';
import { mockWindowRemoveEventListener } from 'mocks/mock/window-remove-event-listener';

import { GalleryScrollComponent } from '../component';
import { GalleryScrollComponentPropsInterface } from '../component-props.interface';
import { GalleryScrollItemInterface } from '../item.interface';
import { GalleryScrollTemplate } from '../template';
import { MouseEventMock } from 'mocks/mouse-event/mock';
import { TouchEventMock } from 'mocks/touch-event/mock';

const image1: GalleryScrollItemInterface = { sourceUrl: '1' };
const image2: GalleryScrollItemInterface = { sourceUrl: '2' };
const image3: GalleryScrollItemInterface = { sourceUrl: '3' };
const initialState3Images = galleryScrollMakeInitialState([image1, image2, image3], false);

describe('AppearOnScrollComponent', () => {
  let defaultProps: GalleryScrollComponentPropsInterface;
  let removeEventListenerMock: jest.Mock;
  let unmountAll: () => void;

  beforeEach(() => {
    unmountAll = mockUseEffect().unmountAll;

    removeEventListenerMock = mockWindowRemoveEventListener();

    defaultProps = {
      className: 'custom-class-name',
      items: [{ sourceUrl: '1' }, { sourceUrl: '2' }, { sourceUrl: '3' }, { sourceUrl: '4' }],
      isRtl: false,
      onTouch: jest.fn,
    };
  });

  it('should disconnect observer on unmount', async () => {
    mockUseReducer({ ...initialState3Images, pointerPositionStart: 20 });
    mount(<GalleryScrollComponent {...defaultProps} />);

    unmountAll();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(5);
    expect(removeEventListenerMock.mock.calls[0][0]).toBe('contextmenu');
    expect(removeEventListenerMock.mock.calls[1][0]).toBe('mousemove');
    expect(removeEventListenerMock.mock.calls[2][0]).toBe('touchmove');
    expect(removeEventListenerMock.mock.calls[3][0]).toBe('mouseup');
    expect(removeEventListenerMock.mock.calls[4][0]).toBe('touchend');
  });

  it('should forward className and refProperties to template', () => {
    const wrapper = shallow(<GalleryScrollComponent {...defaultProps} />);

    const { containerRef, className } = wrapper.find(GalleryScrollTemplate).props();
    expect((containerRef as RefObject<HTMLDivElement>).current).toBeDefined();
    expect(className).toEqual(defaultProps.className);
  });

  it('should dispatch start on mouse down', () => {
    const { dispatchMock } = mockUseReducer({ ...initialState3Images, pointerPositionStart: 20 });

    const wrapper = mount(<GalleryScrollComponent {...defaultProps} />);
    const { onMouseDown } = wrapper.find(GalleryScrollTemplate).props();
    const mouseEventMock = MouseEventMock<HTMLDivElement>();

    onMouseDown({ ...mouseEventMock, clientX: 5 });

    expect(mouseEventMock.preventDefault).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 5,
      type: 'start',
    });
  });

  it('should not dispatch start on mouse down in non-browser env', () => {
    const { dispatchMock } = mockUseReducer({ ...initialState3Images, pointerPositionStart: 20 });

    const wrapper = shallow(<GalleryScrollComponent {...defaultProps} />);
    const { onMouseDown } = wrapper.find(GalleryScrollTemplate).props();
    const mouseEventMock = MouseEventMock<HTMLDivElement>();

    onMouseDown(mouseEventMock);

    expect(mouseEventMock.preventDefault).toHaveBeenCalledTimes(1);
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch start on touch start', () => {
    const { dispatchMock } = mockUseReducer({ ...initialState3Images, pointerPositionStart: 20 });

    const wrapper = mount(<GalleryScrollComponent {...defaultProps} />);
    const { onTouchStart } = wrapper.find(GalleryScrollTemplate).props();

    const touchEventMock = TouchEventMock<HTMLDivElement>();
    onTouchStart({
      ...touchEventMock,
      changedTouches: [{ pageX: 5 } as Touch] as unknown as React.TouchList,
    });

    expect(touchEventMock.preventDefault).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      galleryLeft: 0,
      galleryRight: 0,
      positionX: 5,
      type: 'start',
    });
  });

  it('single image case', () => {
    const wrapper = mount(<GalleryScrollComponent {...defaultProps} items={[image1]} />);
    const { items } = wrapper.find(GalleryScrollTemplate).props();

    expect(items).toStrictEqual([{ ...image1, style: {} }]);
  });

  it('when gallery is touched, it should render all images', () => {
    mockUseReducer({ ...initialState3Images, isTouched: true });
    const wrapper = shallow(<GalleryScrollComponent {...defaultProps} />);
    const template = wrapper.find(GalleryScrollTemplate);

    expect(template.html()).toMatchSnapshot();
  });
});
