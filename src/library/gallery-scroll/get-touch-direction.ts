import { GalleryScrollDirectionEnum } from './direction.enum';
import { GalleryScrollGetTouchDirectionPropsInterface } from './get-touch-direction-props.interface';

/**
 * Calculates direction of touch move
 */
export const galleryScrollGetTouchDirection = (
  props: GalleryScrollGetTouchDirectionPropsInterface
): GalleryScrollDirectionEnum => {
  const xDiff = Math.abs(props.pointerPositionSecondX - props.pointerPositionStartX);
  const yDiff = Math.abs(props.pointerPositionSecondY - props.pointerPositionStartY);

  return xDiff > yDiff ? GalleryScrollDirectionEnum.HORIZONTAL : GalleryScrollDirectionEnum.VERTICAL;
};
