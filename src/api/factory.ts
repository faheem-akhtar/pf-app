import { ApiFactoryInterface } from './factory.interface';
import { ApiMakeFactory } from './make-factory';

/**
 * Use this to construct a general purpose fetcher that can be used in any environment
 */
export const ApiFactory: ApiFactoryInterface = ApiMakeFactory({ getOrigin: () => origin });
