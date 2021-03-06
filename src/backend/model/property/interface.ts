import { BackendModelAgentInterface } from '../agent/interface';
import { BackendModelBrokerInterface } from '../broker/interface';
import { BackendModelLocationInterface } from '../location/interface';
import { BackendModelPropertyCategoryInterface } from './category.interface';
import { BackendModelPropertyCategoryIdentifierEnum } from './category-identifier.enum';
import { BackendModelPropertyImageInterface } from './image.interface';
import { BackendModelPropertyLiveEventMetadateInterface } from './live-event/metadate.interface';
import { BackendModelPropertyPriceInterface } from './price.interface';
import { BackendModelPropertyTypeInterface } from './type.interface';

export interface BackendModelPropertyInterface {
  /**
   * BackendModelProperty ID
   */
  id: string;

  /**
   * BackendModelProperty name
   */
  name: string;

  /**
   * Is the property premium
   */
  premium: boolean;

  /**
   * Is the property featured
   */
  featured: boolean;

  /**
   * Is the property offline
   */
  is_expired: boolean;

  /**
   * Is the property exclusive
   */
  exclusive: boolean;

  /**
   * Is the property verified
   */
  verified: boolean;

  /**
   * Path to the property image
   */
  image?: string;

  /**
   * BackendModelProperty's area with dimensions
   */
  area: string;

  /**
   * Links
   */
  links: {
    /**
     * Link to the property
     */
    self: string;

    /**
     * Alternative link to property (in alternate language)
     */
    self_alternate: string;

    /**
     * Broker thumbnail image
     */
    image_broker: string;

    /**
     * BackendModelProperty image
     */
    image_property: string;

    /**
     * BackendModelProperty image small (for serp pages)
     * TODO-FE[CX-373] remove image_property_small usage
     */
    image_property_small: string;

    /**
     * BackendModelProperty image medium
     */
    image_property_medium: string;

    /**
     * BackendModelProperty image on home page
     */
    image_property_homepage: string;
  };

  /**
   * @inheritDoc
   */
  meta: {
    /**
     * Subtitle
     */
    subtitle: string;

    /**
     * Price
     */
    price: number;

    /**
     * Price text
     */
    price_text: string;

    /**
     * Contact options
     */
    contact_options: {
      /**
       *  All contact options available for property
       */
      app: {
        /**
         * Contact phone
         */
        phone: {
          type: string;
          value: string;
          link: string;
          is_did: boolean;
        };

        /**
         * Contact call back
         */
        call?: {
          type: string;
          value: string;
          link: string;
        };

        /**
         * Contact email
         */
        email?: {
          type: string;
          value: string;
          link: string;
        };

        /**
         * Contact whatsapp
         */
        whatsapp?: {
          type: string;
          value: string;
          link: string;
        };

        /**
         * Contact sms
         */
        sms?: {
          type: string;
          value: string;
          link: string;
        };
      };
    };

    /**
     * Images count
     */
    images_count: number;

    /**
     * Video tour metadata
     */
    video_metadata?: {
      /**
       * Video url
       */
      url: string;

      /**
       * Preview of video
       */
      thumbnail: string;

      /**
       * Video id (is part of video link)
       */
      id: string;
    };

    /**
     * Live event metadata
     */
    live_event_metadata: BackendModelPropertyLiveEventMetadateInterface | null;

    /**
     * When listing was listed
     */
    listed_at_message: string;
  };

  /**
   * Location coordinates
   */
  coordinates?: {
    /**
     * Longitude
     */
    lon: number;

    /**
     * Latitude
     */
    lat: number;
  };
  /**
   * BackendModelProperty category ID
   *
   * WARNING: two ways of doing the same thing...
   * What's the point of propertyCategory relationship then ?
   */
  category_id: string;

  /**
   * BackendModelProperty type ID
   *
   * WARNING: two ways of doing the same thing...
   * What's the point of propertyType relationship then ?
   */
  type_id: string;

  /**
   * BackendModelProperty's location
   */
  location_tree_path: string;

  /**
   * Price
   */
  default_price: number;

  /**
   * Bedroom name
   */
  bedroom_name: string;

  /**
   * Number of bedrooms
   */
  bedroom_value: number;

  /**
   * Bathroom name
   */
  bathroom_name: string;

  /**
   * Number of bathrooms
   */
  bathroom_value: number;

  /**
   * Listing level
   */
  listing_level: string;

  /**
   * Listing level label
   */
  listing_level_label: string;

  /**
   * Price period label
   */
  price_period_label: string;

  /**
   * Offering type
   */
  offering_type: string;

  /**
   * Offering type ID
   */
  offering_type_id: string;

  /**
   * Insertion date
   */
  date_insert: string;

  /**
   * Size
   */
  size: number;

  /**
   * BackendModelProperty's size unit
   */
  size_unit: string;

  /**
   * Quality score
   */
  quality_score: number;

  /**
   * Furnished
   */
  furnished: string;

  /**
   * Price on application
   */
  price_on_application: number | false;

  /**
   * Whether is smart ad
   */
  smart_ad: boolean;

  /**
   * Whether is cts
   */
  cts: boolean;

  /**
   * Area specialist property
   */
  areaSpecialistBackendModelProperty?: boolean;

  /**
   * Reference number
   */
  reference: string;

  /**
   * Rera license
   */
  rera: string;

  /**
   * View360 link
   */
  view_360: string;

  /**
   * Price period identifier (regardless of the country)
   */
  price_period_identifier: string;

  /**
   * Category identifier (regardless of the country)
   */
  category_identifier: BackendModelPropertyCategoryIdentifierEnum;

  /**
   * BackendModelProperty type identifier (regardless of the country)
   */
  type_identifier: string;

  /**
   * The completion status of the property
   */
  completion_status: string | null;

  /**
   * The utilities price type (inclusive/exclusive)
   */
  utilities_price_type: string;

  /**
   * Broker model
   */
  broker?: BackendModelBrokerInterface;

  /**
   * Agent model
   */
  agent?: BackendModelAgentInterface;

  /**
   * Location models
   */
  location_tree?: BackendModelLocationInterface[];

  /**
   * BackendModelProperty images models
   */
  property_images?: BackendModelPropertyImageInterface[];

  /**
   * BackendModelProperty prices
   */
  property_prices?: BackendModelPropertyPriceInterface[];

  /**
   * The category of property (residential for sale, commercial for rent, etc...)
   */
  property_category?: BackendModelPropertyCategoryInterface;

  /**
   * The type of property (office, villa, warehouse, etc...)
   */
  property_type: BackendModelPropertyTypeInterface;

  /**
   * Ranking score primary
   */
  rsp: number;

  /**
   * Ranking score secondary
   */
  rss: number;

  /**
   * Community
   */
  community?: BackendModelLocationInterface;

  /**
   * Location
   */
  location?: BackendModelLocationInterface;

  /**
   * Url of the property
   */
  share_url: string;

  /**
   * Area specialist property
   */
  areaSpecialistProperty?: boolean;

  /**
   * New projects
   */
  new_projects?: boolean;
}
