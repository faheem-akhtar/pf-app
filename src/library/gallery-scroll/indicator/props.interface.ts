import { PropertyCardTemplatePropsType } from 'components/property-card/template-props.type';

export interface GalleryScrollIndicatorPropsInterface extends Pick<PropertyCardTemplatePropsType, 'cardType'> {
  /**
   * Dot width
   */
  itemWidth: number;

  /**
   * Number of items in collection
   */
  itemsCount: number;

  /**
   * Current active index
   */
  activeIndex: number;

  /**
   * Right to left alignment (true for Arabic)
   */
  isRtl: boolean;
}
