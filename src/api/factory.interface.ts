import { AnyValueType } from 'types/any/value.type';
import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiRequestPropsType } from './request-props.type';

export type ApiFactoryInterface = <Result, Data = AnyValueType, RawJson = AnyValueType, PostData = AnyValueType>(
  factoryProps: ApiFactoryPropsInterface<Result, Data, RawJson>
) => <QueryData>(props: ApiRequestPropsType<QueryData, PostData>) => Promise<ApiFetcherResultType<Result>>;
