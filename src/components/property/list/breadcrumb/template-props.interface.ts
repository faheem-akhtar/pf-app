import { PropertyListBreadcrumbPropsBaseInterface } from './props-base.interface';

export interface PropertyListBreadcrumbTemplatePropsInterface extends PropertyListBreadcrumbPropsBaseInterface {
  /**
   * Function called when breadcrumb is clicked
   */
  onClick: () => void;
}
