import { BreadcrumbInterface } from '../breadcrumb/interface';

export interface PropertyListHeaderComponentPropsInterface {
  /**
   * Title
   */
  pageTitle: string;

  /**
   * Quick link breadcrumbs
   */
  breadcrumbs: BreadcrumbInterface[];
}
