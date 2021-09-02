import { AdConfigInterface } from 'types/ad/config.interface';

export const AdConfigMock = (): AdConfigInterface => ({
  ad_targeting: {
    Language: ['en'],
    Page_type: ['front_other'],
    RentPeriod: ['Yearly'],
    Section: ['RENT'],
  },
  ad_placeholders: true,
});
