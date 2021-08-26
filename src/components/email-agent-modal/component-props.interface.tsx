export interface EmailAgentModalComponentPropsInterface {
  /**
   * A ref to access an element
   */
  openRef: React.MutableRefObject<() => void>;

  /**
   * Property
   */
  propertyName: string;

  /**
   * Property
   */
  referenceId: string;
}
