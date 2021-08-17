export interface PropertyCardMenuModalTemplatePropsBaseInterface {
  /**
   * Label of close button at the bottom of the container
   */
  closeButtonLabel: string;

  /**
   * Children component
   */
  children: React.ReactNode;

  /**
   * Click handler for when user clicks on overlay
   */
  onOverlayClick?: () => void;

  /**
   * Click handler for when user clicks on close button
   */
  onCloseButtonClick?: () => void;
}
