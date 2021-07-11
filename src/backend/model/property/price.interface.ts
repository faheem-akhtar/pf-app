import { BackendModelPropertyPriceTypeInterface } from './price-type.interface';
import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyPriceInterface extends JsonApiModel {
  /**
   * BackendModelProperty price ID
   */
  id: string;

  /**
   * BackendModelProperty price
   */
  price: number;

  // tslint:disable:variable-name

  /**
   * BackendModelProperty price type
   */
  price_type: BackendModelPropertyPriceTypeInterface;

  /**
   * Meta
   */
  meta: {
    /**
     * Price text label
     */
    price_text: string;
  };
}
