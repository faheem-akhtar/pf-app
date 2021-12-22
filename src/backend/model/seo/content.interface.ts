import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelSeoContentInterface extends BackendJsonApiModelType {
  /**
   * Landing page uri
   * @example /en/buy/properties-for-sale.html
   */
  uri: string;

  /**
   * Meta page title
   * @example 'Apartments for sale in Dubai Marina | Property Finder UAE'
   */
  title?: string;

  /**
   * Meta page description
   * @example 'Search Flats for sale in Dubai Marina with maps & photos on www.propertyfinder.ae'
   */
  description?: string;

  /**
   * H1 heading
   * @example 'Properties for Sale'
   */
  first_header?: string;

  /**
   * H2 heading
   * @example 'Properties for Sale in Bahrain'
   */
  second_header?: string;

  /**
   * H3 heading
   * @example 'Getting started on buying a property for sale in Bahrain'
   */
  third_header?: string;

  /**
   * Main content
   * @example '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non dignissim diam.</p>'
   */
  primary_content?: string;

  /**
   * Top content
   * @example '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non dignissim diam.</p>'
   */
  secondary_content?: string;

  /**
   * Top image
   * @example 'https://www.propertyfinder.bh/images/pf_portal/cms/8d225ea8a3b2d3aa524ff1e57d5023fabb52d8c8/desktop.webp'
   */
  primary_image_url?: string;

  /**
   * Bottom image
   * @example 'https://www.propertyfinder.bh/images/pf_portal/cms/8d225ea8a3b2d3aa524ff1e57d5023fabb52d8c8/desktop.webp'
   */
  secondary_image_url?: string;

  /**
   * Top image alt
   * @example 'Downtown Bahrain'
   */
  primary_image_alt?: string;

  /**
   * Bottom image alt
   * @example 'Downtown Bahrain'
   */
  secondary_image_alt?: string;

  /**
   * Meta canonical url
   * @example 'https://www.propertyfinder.bh/en/buy/properties-for-sale.html'
   */
  canonical?: string;

  /**
   * Created at
   * @example '2017-02-21T16:38:05Z'
   */
  created_at: string;
}
