import { AdConfigInterface } from 'components/ad/config.interface';
import { BreadcrumbInterface } from 'components/property/list/breadcrumb/interface';

import { PropertySerpObfuscatedType } from './obfuscated/type';

export type PropertySerpSearchResultType = {
  /**
   * Array of property cards
   */
  properties: PropertySerpObfuscatedType[];

  /**
   * Ads config for current search
   */
  adConfig: AdConfigInterface;

  /**
   * Total number of properties available for this search parameters
   */
  total: number;

  /**
   * Total number of pages available (backend may not allow to access page number above certain threshold)
   */
  pages: number;

  /**
   * Page title
   */
  title: string;

  /**
   * Page description
   */
  description: string;

  /**
   * Breadcrumbs
   */
  breadcrumbs: BreadcrumbInterface[];

  /**
   * Schema.org structured data
   */
  schema: string;
};
