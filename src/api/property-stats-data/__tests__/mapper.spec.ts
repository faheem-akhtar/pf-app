import { statsDataObfuscatedStub } from 'stubs/stats-data/obfuscated.stub';

import { apiPropertyStatsDataMapper } from '../mapper';

describe('apiPropertyStatsDataMapper', () => {
  it('should deobfuscate the results from server', () => {
    expect(apiPropertyStatsDataMapper(statsDataObfuscatedStub())).toMatchSnapshot();
  });
});
