/* eslint-disable react-hooks/rules-of-hooks */
import { ApiMakeSwrFactory } from './make-swr-factory';

/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const ApiSwrFactory = ApiMakeSwrFactory({
  requireAuth: false,
});
