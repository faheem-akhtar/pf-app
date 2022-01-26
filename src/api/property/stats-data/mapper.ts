import { StatsDataPropertyInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/data/property.interface';

import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';
import { objectDeobfuscate } from 'helpers/object/deobfuscate';

export const apiPropertyStatsDataMapper = ({
  properties,
}: {
  properties: PropertyObfuscatedStatsDataResultType[];
}): StatsDataPropertyInterface[] => properties.map(objectDeobfuscate) as unknown as StatsDataPropertyInterface[];
