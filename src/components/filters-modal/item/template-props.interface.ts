export interface FiltersModalItemTemplatePropsInterface {
  /**
   * Label
   */
  label?: string;

  /**
   * Heading icon
   */
  icon?: JSX.Element;

  /**
   * Whether the list item is new
   */
  isNew?: boolean;

  /**
   * Whether the list item has border
   */
  hasBorder?: boolean;

  /**
   * Children
   */
  children: React.ReactNode;

  /**
   * Additional container css class
   */
  containerClassName?: string;
}
