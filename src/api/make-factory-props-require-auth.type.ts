import { JwtTokenStore } from 'services/jwt/token/store';

import { ApiMakeFactoryPropsBaseType } from './make-factory-props-base.type';

export type ApiMakeFactoryPropsRequireAuthType = ApiMakeFactoryPropsBaseType & {
  /**
   * JWT Token service
   */
  jwtTokenService: JwtTokenStore;
  /**
   * True if this endpoint requires user to be logged in
   */
  requireAuth: true;
};
