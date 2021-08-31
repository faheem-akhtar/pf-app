import { AdUnitInterface } from './unit.interface';

export interface AdComponentPropsInterface {
  /**
   * Add unit id
   */
  adUnit: AdUnitInterface;

  /**
   * Class name
   */
  className?: string;

  /**
   * Empty css class name
   */
  emptyClassName?: string;

  /**
   * Visible css class name
   */
  visibleClassName?: string;
}
