import { BackendJsonApiModelType } from 'backend/json-api/model.type';

import { BackendModelPropertyPriceTypeInterface } from './price-type.interface';

export interface BackendModelPropertyPriceInterface extends BackendJsonApiModelType {
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
