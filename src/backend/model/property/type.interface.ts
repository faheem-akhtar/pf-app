import { BackendModelAmenityInterface } from '../amenity/interface';
import { GenericNameLabelInterface } from '../generic/name-label.interface';
import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyTypeInterface extends JsonApiModel {
  /**
   * BackendModelProperty type ID
   */
  id: string;

  /**
   * BackendModelProperty type name
   */
  name: string;

  /**
   * BackendModelProperty type label
   */
  label: string;

  /**
   * BackendModelProperty type bedroom
   */
  bedroom: GenericNameLabelInterface[];

  /**
   * BackendModelProperty type amenities
   */
  amenities: BackendModelAmenityInterface[];

  /**
   * BackendModelProperty type bathroom
   */
  bathroom: GenericNameLabelInterface[];

  /**
   * BackendModelProperty type area
   */
  area: GenericNameLabelInterface[];
}
