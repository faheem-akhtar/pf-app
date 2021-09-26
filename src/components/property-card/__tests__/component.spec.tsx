/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { propertyStub } from 'stubs/property/stub';
import { touchEventStub } from 'stubs/touch/event.stub';

import { PropertyCardComponent } from '../component';
import { PropertyCardComponentPropsType } from '../component-props.type';

const makeDefaultProps = (): PropertyCardComponentPropsType => ({
  property: propertyStub(),
  loading: false,
  onSaveButtonClick: jest.fn(),
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

    mockReactUseSwr('en-property-search/images-GET-{"propertyId":"198023","imageType":"small"}', {
      ok: true,
      data: ['i1', 'i2', 'i3'],
    });

    const gallery = getByTestId('GalleryScroll');
    fireEvent.touchStart(gallery, {
      ...touchEventStub(),
      changedTouches: [{ pageX: 5 } as Touch] as unknown as React.TouchList,
    });

    expect(getAllByTestId('GalleryScrollPicture').length).toBe(3);
  });
});
