import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';
import { objectObfuscate } from 'helpers/object/obfuscate';

import { BackendApiPropertySearchJsonApiResultType } from '../search/json-api-result.type';
import { BackendApiPropertyStatsDataFetcherPropsType } from './fetcher-props.type';
import { backendApiPropertyStatsDataSingleModelMakeMapper } from './single-model-make-mapper';

export const backendApiPropertyStatsDataMapper = (
  { properties }: BackendApiPropertySearchJsonApiResultType,
  props: BackendApiPropertyStatsDataFetcherPropsType
): PropertyObfuscatedStatsDataResultType[] => {
  const rndSeed = Math.random();
  const modelMapper = backendApiPropertyStatsDataSingleModelMakeMapper(props.pageNumber);

  return properties.map((propertyModel, index) => {
    const statsModel = modelMapper(propertyModel, index);
    return objectObfuscate(statsModel, rndSeed) as PropertyObfuscatedStatsDataResultType;
  });
};
