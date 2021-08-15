import { JwtTokenStore } from 'services/jwt/token/store';

export type ApiMakeSwrFactoryPropsType =
  | {
      requireAuth: true;
      jwtTokenService: JwtTokenStore;
    }
  | {
      requireAuth: false;
    };
