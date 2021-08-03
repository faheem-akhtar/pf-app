import { Ref } from 'preact';

import { GalleryScrollTemplateItemInterface } from './template-item.interface';

export interface GalleryScrollTemplatePropsInterface {
  /**
   * Ref to gallery
   */
  containerRef: Ref<HTMLDivElement>;

  /**
   * Touch started
   */
  onTouchStart: (e: TouchEvent) => void;

  /**
   * Pressing down mouse button
   */
  onMouseDown: (e: MouseEvent) => void;

  /**
   * Clicked the gallery
   */
  onClick?: (e: MouseEvent) => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Images
   */
  items: GalleryScrollTemplateItemInterface[];

  /**
   * Gallery has been touched by user
   */
  isTouched: boolean;

  /**
   * Active index
   */
  activeIndex: number;
}
