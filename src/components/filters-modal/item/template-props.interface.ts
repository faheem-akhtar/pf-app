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
   * Selected value
   */
  value?: string;

  /**
   * Children
   */
  children: React.ReactNode;
}
