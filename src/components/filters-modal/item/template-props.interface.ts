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
   * Children
   */
  children: React.ReactNode;
}
