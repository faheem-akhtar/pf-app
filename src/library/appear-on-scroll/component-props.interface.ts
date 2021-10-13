export interface AppearOnScrollComponentPropsInterface {
  /**
   * children component
   */
  children: JSX.Element;
  /**
   * Custom classname
   */
  className?: string;
  /**
   * Show content on only scroll on top
   */
  showOnlyOnScrollUp?: boolean;
  /**
   * Handler for when the component (not the wrapper) starts exiting the viewport
   */
  onExiting?: () => void;
  /**
   * Handler for when the component (not the wrapper) is fully out of the viewport
   */
  onHidden?: () => void;
  /**
   * Handler for when the component (not the wrapper) starts entering the viewport
   */
  onEntering?: () => void;
  /**
   * Handler for when the component (not the wrapper) is fully in the viewport
   */
  onVisible?: () => void;
}
