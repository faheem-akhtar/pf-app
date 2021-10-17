import { GalleryScrollBrowseEnum } from './browse.enum';

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
  pointerPositionStartX: number | null;

  /**
   * Mouse/finger pointer position current
   */
  pointerPositionCurrentX: number | null;

  /**
   * Type of browsing
   */
  browse: GalleryScrollBrowseEnum;
}
