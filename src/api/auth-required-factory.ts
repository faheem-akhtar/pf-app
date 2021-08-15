import { ApiFactoryInterface } from './factory.interface';
import { ApiMakeFactory } from './make-factory';
import { JwtTokenService } from 'services/jwt/token/service';

/**
 * Use this to construct a general purpose fetcher that can be used in any environment
 */
export const ApiAuthRequiredFactory: ApiFactoryInterface = ApiMakeFactory({
  getOrigin: () => origin,
  requireAuth: true,
  jwtTokenService: JwtTokenService,
});
