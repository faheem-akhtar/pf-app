/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { mockUseSwr } from 'mocks/mock/use-swr';

import { PropertyCardComponent } from '../component';
import { PropertyCardComponentPropsType } from '../component-props.type';
import { PropertyMock } from 'mocks/property/mock';
import { TouchEventMock } from 'mocks/touch-event/mock';

const makeDefaultProps = (): PropertyCardComponentPropsType => ({
  property: PropertyMock,
  loading: false,
});

/**
 * TODO-FE[CX-407] Add missing tests
 */

describe('PropertyCardComponent', () => {
  /**
   * Gallery
   */
  it('before gallery touched, render single image', () => {
    const defaultProps = makeDefaultProps();
    const { getAllByTestId } = render(<PropertyCardComponent {...defaultProps} />);

    expect(getAllByTestId('GalleryScrollPicture').length).toBe(1);
  });

  it('should load images when gallery is touched', () => {
    const defaultProps = makeDefaultProps();
    const { getByTestId, getAllByTestId } = render(<PropertyCardComponent {...defaultProps} />);

    mockUseSwr({ ok: true, data: ['i1', 'i2', 'i3'] });

    const gallery = getByTestId('GalleryScroll');
    fireEvent.touchStart(gallery, {
      ...TouchEventMock,
      changedTouches: [{ pageX: 5 } as Touch] as unknown as React.TouchList,
    });

    expect(getAllByTestId('GalleryScrollPicture').length).toBe(3);
  });
});
