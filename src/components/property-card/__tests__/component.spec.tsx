/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { mockReactUseSwr } from 'mocks/react/mock-use-swr';

import { PropertyCardComponent } from '../component';
import { PropertyCardComponentPropsType } from '../component-props.type';
import { propertyStub } from 'stubs/property/stub';
import { touchEventStub } from 'stubs/touch/event.stub';

const makeDefaultProps = (): PropertyCardComponentPropsType => ({
  property: propertyStub(),
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

    mockReactUseSwr({ ok: true, data: ['i1', 'i2', 'i3'] });

    const gallery = getByTestId('GalleryScroll');
    fireEvent.touchStart(gallery, {
      ...touchEventStub(),
      changedTouches: [{ pageX: 5 } as Touch] as unknown as React.TouchList,
    });

    expect(getAllByTestId('GalleryScrollPicture').length).toBe(3);
  });
});
