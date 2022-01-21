import { ConfigCommonInterface } from 'types/config/common.interface';

import { environmentGetDatadog } from './get-datadog';

describe('environmentGetDatadog', () => {
  const config: Pick<ConfigCommonInterface, 'countryCode'> = {
    countryCode: 'ae',
  };

  it('should return datadog environment for prod', () => {
    process.env.ENVIRONMENT = 'production';
    expect(environmentGetDatadog(config.countryCode)).toEqual(`prod_${config.countryCode}`);
  });

  it('should return datadog env for staging', () => {
    process.env.ENVIRONMENT = 'staging';
    expect(environmentGetDatadog(config.countryCode)).toEqual('staging');
  });
});
