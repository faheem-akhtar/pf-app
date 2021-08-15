/* eslint-disable react-hooks/rules-of-hooks */
import { ApiMakeSwrFactory } from './make-swr-factory';

// TODO-FE[TPNX-3009] Add tests
/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const ApiSwrFactory = ApiMakeSwrFactory({
  requireAuth: false,
});
