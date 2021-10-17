import { GalleryScrollDirectionEnum } from '../direction.enum';
import { galleryScrollGetTouchDirection } from '../get-touch-direction';

describe('galleryScrollGetTouchDirection', () => {
  it('should return the vertical', () => {
    expect(
      galleryScrollGetTouchDirection({
        pointerPositionSecondX: 7,
        pointerPositionSecondY: 9,
        pointerPositionStartX: 6,
        pointerPositionStartY: 7,
      })
    ).toBe(GalleryScrollDirectionEnum.VERTICAL);
  });

  it('should return the horizontal', () => {
    expect(
      galleryScrollGetTouchDirection({
        pointerPositionSecondX: 7,
        pointerPositionSecondY: 9,
        pointerPositionStartX: 4,
        pointerPositionStartY: 7,
      })
    ).toBe(GalleryScrollDirectionEnum.HORIZONTAL);
  });
});
