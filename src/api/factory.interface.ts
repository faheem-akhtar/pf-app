import { ApiFactoryPropsBaseInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { DataApiFetcherRequestPropsType } from './request-props.type';

export type ApiFactoryInterface = <Result, Data = Object, RawJson = Object>(
  factoryProps: ApiFactoryPropsBaseInterface<Result, Data, RawJson>
) => <QueryData>(props: DataApiFetcherRequestPropsType<QueryData>) => Promise<ApiFetcherResultType<Result>>;
