import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyImageInterface extends JsonApiModel {
  /**
   * BackendModelProperty image ID
   */
  id: string;

  /**
   * BackendModelProperty file name (called path)
   */
  path: string;

  /**
   * BackendModelProperty image number
   */
  number: number;

  /**
   * BackendModelProperty image version
   */
  version: string;

  /**
   * Is the image the property's default image ?
   */
  is_default: boolean;

  /**
   * Links
   */
  links: {
    /**
     * Default image size
     */
    default: string;

    /**
     * Small size image URL
     */
    small: string;

    /**
     * Medium size image URL
     */
    medium: string;

    /**
     * CTS size image URL
     */
    cts: string;

    /**
     * Thumbnail size image URL
     */
    thumb: string;

    /**
     * Big image on PLP
     */
    new_big: string;

    /**
     * Small image on PLP
     */
    new_small: string;

    /**
     * Full screen image for PLP modal
     */
    full_screen: string;
  };
}
