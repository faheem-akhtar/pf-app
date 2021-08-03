import { JSXInternal } from 'preact/src/jsx';

export interface GalleryScrollTemplateItemInterface {
  /**
   * Image source url
   */
  sourceUrl: string;
  /**
   * Image style attributes
   */
  style: JSXInternal.CSSProperties | null;
}
