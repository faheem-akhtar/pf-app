import { GalleryScrollDirectionEnum } from '../direction.enum';
import { galleryScrollGetTouchDirection } from '../get-touch-direction';

describe('galleryScrollGetTouchDirection', () => {
  it('should return the vertical', () => {
    const initialTouch = { positionX: 7, positionY: 9 };
    const firstTouchMove = { positionX: 6, positionY: 7 };

    expect(galleryScrollGetTouchDirection(initialTouch, firstTouchMove)).toBe(GalleryScrollDirectionEnum.VERTICAL);
  });

  it('should return the horizontal', () => {
    const initialTouch = { positionX: 7, positionY: 9 };
    const firstTouchMove = { positionX: 4, positionY: 7 };

    expect(galleryScrollGetTouchDirection(initialTouch, firstTouchMove)).toBe(GalleryScrollDirectionEnum.HORIZONTAL);
  });
});
