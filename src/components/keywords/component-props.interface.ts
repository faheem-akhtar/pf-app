import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

export interface KeywordsComponentPropsInterface {
  /**
   * On change
   */
  onChange: (value: string) => void;
  /**
   * Value
   */
  value: string;
  /**
   * Current selected category
   */
  category: FiltersCategoryIdEnum;
  /**
   * If true, the chips will be rendered on the bottom of the input, otherwise inside the input
   */
  chipsOnTheBottom?: true;
  /**
   * additional css classes for component
   */
  className?: string;
  /**
   * additional css classes for chips
   */
  chipClassName?: string;
  /**
   * keywords-category mapping
   */
  keywordsMapping: Record<FiltersCategoryIdEnum, string[]>;
}
