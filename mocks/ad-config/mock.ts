import { AdConfigInterface } from 'types/ad/config.interface';

export const AdConfigMock = (): AdConfigInterface => ({
  ad_units: [
    {
      id: 'UAE_Native_Community_mobile',
      size: [
        {
          isFluid: true,
        },
      ],
      name: 'list',
      position: 0,
    },
    {
      id: 'UAE_Native_mobile',
      size: [
        {
          isFluid: true,
        },
      ],
      name: 'list',
      position: 5,
    },
    {
      id: 'UAE_Native_mobile2',
      size: [
        {
          isFluid: true,
        },
      ],
      name: 'list',
      position: 21,
    },
  ],
  ad_targeting: {
    Language: ['en'],
    Page_type: ['front_other'],
    RentPeriod: ['Yearly'],
    Section: ['RENT'],
  },
  ad_placeholders: true,
});
