import { TFunctionType } from 'helpers/t-function/type';

import { PropertyListHeaderComponentPropsInterface } from '../../header/component-props.interface';

export interface PropertyListBreadcrumbListComponentPropsInterface
  extends Pick<PropertyListHeaderComponentPropsInterface, 'breadcrumbs'> {
  /**
   * Click on quick link action
   */
  onClickShowMore: () => void;

  /**
   * Is list expanded
   */
  expanded: boolean;

  /**
   * Translate function
   */
  t: TFunctionType;
}
