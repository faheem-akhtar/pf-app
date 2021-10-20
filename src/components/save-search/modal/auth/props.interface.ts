export interface SaveSearchModalAuthPropsInterface {
  /**
   * Call on success login or register
   */
  onSuccess: () => void;

  /**
   * Call if operation is cancelled
   */
  onCancel: () => void;
}
