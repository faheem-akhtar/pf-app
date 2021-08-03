import { GalleryScrollBrowseEnum } from '../browse.enum';
import { galleryScrollGetSlidingStyles } from '../get-sliding-styles';
import { GalleryScrollItemInterface } from '../item.interface';
import { galleryScrollMakeInitialState } from '../make-initial-state';

const image1: GalleryScrollItemInterface = { sourceUrl: '1' };
const image2: GalleryScrollItemInterface = { sourceUrl: '2' };
const image3: GalleryScrollItemInterface = { sourceUrl: '3' };
const image4: GalleryScrollItemInterface = { sourceUrl: '3' };
const images = [image1, image2, image3, image4];
const initialState4Images = galleryScrollMakeInitialState(images, false);

describe('galleryScrollGetSlidingStyles', () => {
  it('should give instant transition when not sliding', () => {
    const result = galleryScrollGetSlidingStyles({ ...initialState4Images }, 0, images.length);

    expect(result).toStrictEqual({
      transform: 'translateX(0%)',
      transitionDuration: '0ms',
    });
  });

  it('should keep not sliding items out of the screen', () => {
    const result = galleryScrollGetSlidingStyles({ ...initialState4Images }, 2, images.length);

    expect(result).toStrictEqual({
      transform: 'translateX(100%)',
    });
  });

  it('should return instant transform while dragging', () => {
    const result = galleryScrollGetSlidingStyles(
      { ...initialState4Images, isDragging: true, pointerPositionCurrent: 5, pointerPositionStart: 50 },
      0,
      images.length
    );

    expect(result).toStrictEqual({
      transform: 'translateX(calc(0% + -45px))',
      transitionDuration: '0ms',
    });
  });

  it('should return sliding animation after user interaction to next item', () => {
    const result = galleryScrollGetSlidingStyles(
      { ...initialState4Images, browse: GalleryScrollBrowseEnum.next },
      0,
      images.length
    );

    expect(result).toStrictEqual({
      transform: 'translateX(0%)',
      transitionDuration: '300ms',
    });
  });

  it('should return instant animation after user interaction to prev item', () => {
    const result = galleryScrollGetSlidingStyles(
      { ...initialState4Images, browse: GalleryScrollBrowseEnum.previous },
      1,
      images.length
    );

    expect(result).toStrictEqual({
      transform: 'translateX(100%)',
      transitionDuration: '300ms',
    });
  });
});
