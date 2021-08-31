import { AdNameType } from './name.type';
import { AdUnitSizeInterface } from './unit-size.interface';

export interface AdUnitInterface {
  /**
   * Id
   */
  id: string;

  /**
   * Name
   */
  name: AdNameType;

  /**
   * Position
   */
  position: number;

  /**
   * Ad size
   */
  size: AdUnitSizeInterface[];
}
