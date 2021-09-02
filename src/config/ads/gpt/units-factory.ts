import { AdNameType } from 'types/ad/name.type';
import { AdUnitInterface } from 'types/ad/unit.interface';

const genericProps = {
  size: [
    {
      isFluid: true,
    },
  ],
  name: 'list' as AdNameType,
};

export const ConfigAdsGptUnitsFactory = (countryName: string): AdUnitInterface[] => [
  {
    ...genericProps,
    id: `${countryName}_Native_Community_mobile`,
    position: 0,
  },
  {
    ...genericProps,
    id: `${countryName}_Native_mobile`,
    position: 5,
  },
  {
    ...genericProps,
    id: `${countryName}_Native_mobile2`,
    position: 21,
  },
];
