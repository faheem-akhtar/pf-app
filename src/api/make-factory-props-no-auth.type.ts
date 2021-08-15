import { ApiMakeFactoryPropsBaseType } from './make-factory-props-base.type';

export type ApiMakeFactoryPropsNoAuthType = ApiMakeFactoryPropsBaseType & {
  /**
   * True if this endpoint requires user to be logged in
   */
  requireAuth: false;
};
