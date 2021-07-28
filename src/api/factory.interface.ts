import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiRequestPropsType } from './request-props.type';

export type ApiFactoryInterface = <Result, Data = Object, RawJson = Object>(
  factoryProps: ApiFactoryPropsInterface<Result, Data, RawJson>
) => <QueryData>(props: ApiRequestPropsType<QueryData>) => Promise<ApiFetcherResultType<Result>>;
