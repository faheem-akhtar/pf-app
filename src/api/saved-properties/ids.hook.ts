import { ApiSwrResultType } from 'api/swr-result-type';
import { useApiSavedPropertiesFactory } from './factory.hook';

export const useApiSavedPropertiesIds = (): ApiSwrResultType<number[]> =>
  useApiSavedPropertiesFactory<number[]>(({ data }) => data.map((item) => item.attributes.property_id));
