import { ApiFactoryInterface } from './factory.interface';
import { apiMakeFactory } from './make-factory';

/**
 * Use this to construct a general purpose fetcher that can be used in any environment
 */
export const apiFactory: ApiFactoryInterface = apiMakeFactory({ getOrigin: () => origin });
