import { AdConfigInterface } from 'components/ad/config.interface';

export const adConfigStub = (): AdConfigInterface => ({
  ad_targeting: {
    Language: ['en'],
    Page_type: ['front_other'],
    RentPeriod: ['Yearly'],
    Section: ['RENT'],
  },
  ad_placeholders: true,
});
