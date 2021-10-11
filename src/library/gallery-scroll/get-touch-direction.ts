import { GalleryScrollDirectionEnum } from './direction.enum';

/**
 * Calculates direction of touch move
 */
export const galleryScrollGetTouchDirection = (
  initialTouch: { positionX: number; positionY: number },
  firstTouchMove: { positionX: number; positionY: number }
): GalleryScrollDirectionEnum => {
  const xDiff = Math.abs(initialTouch.positionX - firstTouchMove.positionX);
  const yDiff = Math.abs(initialTouch.positionY - firstTouchMove.positionY);

  return xDiff > yDiff ? GalleryScrollDirectionEnum.HORIZONTAL : GalleryScrollDirectionEnum.VERTICAL;
};
