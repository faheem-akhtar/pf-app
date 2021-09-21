import { BackendModelAmenityInterface } from '../amenity/interface';
import { BackendModelGenericNameLabelInterface } from '../generic/name-label.interface';

export interface BackendModelPropertyTypeInterface {
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
  label?: string;

  /**
   * BackendModelProperty type bedroom
   */
  bedroom?: BackendModelGenericNameLabelInterface[];

  /**
   * BackendModelProperty type amenities
   */
  amenities?: BackendModelAmenityInterface[];

  /**
   * BackendModelProperty type bathroom
   */
  bathroom?: BackendModelGenericNameLabelInterface[];

  /**
   * BackendModelProperty type area
   */
  area?: BackendModelGenericNameLabelInterface[];
}
