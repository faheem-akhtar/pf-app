import { GalleryScrollBrowseEnum } from './browse.enum';
import { GalleryScrollDirectionEnum } from './direction.enum';

export interface GalleryScrollSlidingStylesPropsInterface {
  /**
   * Is dragging
   */
  isDragging: boolean;

  /**
   * Current item index
   */
  activeIndex: number;

  /**
   * Sliding items positions
   */
  itemsPositionsX: Record<string, number>;

  /**
   * Mouse/finger pointer position start
   */
  pointerPositionStart: number | null;

  /**
   * Mouse/finger pointer position current
   */
  pointerPositionCurrent: number | null;

  /**
   * Type of browsing
   */
  browse: GalleryScrollBrowseEnum;

  /**
   * Initial touch registered
   */
  initialTouch?: {
    positionX: number;
    positionY: number;
  };

  /**
   * Type of touching direction
   */
  touchDirection?: GalleryScrollDirectionEnum;
}
