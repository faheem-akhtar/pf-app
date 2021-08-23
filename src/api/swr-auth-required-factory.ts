/* eslint-disable react-hooks/rules-of-hooks */
import { ApiMakeSwrFactory } from './make-swr-factory';
import { JwtTokenService } from 'services/jwt/token/service';

/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const ApiSwrAuthRequiredFactory = ApiMakeSwrFactory({
  requireAuth: true,
  jwtTokenService: JwtTokenService,
});
