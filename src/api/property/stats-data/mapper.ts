import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';
import { objectDeobfuscate } from 'helpers/object/deobfuscate';

export const apiPropertyStatsDataMapper = ({
  properties,
}: {
  properties: PropertyObfuscatedStatsDataResultType[];
}): any[] => properties.map(objectDeobfuscate) as unknown as any[];
