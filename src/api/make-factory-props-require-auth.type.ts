import { ApiMakeFactoryPropsBaseType } from './make-factory-props-base.type';
import { JwtTokenStore } from 'services/jwt/token/store';

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
