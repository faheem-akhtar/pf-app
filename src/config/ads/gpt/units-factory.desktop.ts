import { AdNameType } from 'components/ad/name.type';
import { AdUnitInterface } from 'components/ad/unit.interface';

export const ConfigAdsGptUnitsFactory = (countryName: string): AdUnitInterface[] => [
  {
    id: `${countryName}_MPU_Top`,
    size: [
      {
        width: 300,
        height: 250,
      },
    ],
    name: 'mpu_top' as AdNameType,
  },
  {
    id: `${countryName}_Halfpage`,
    size: [
      {
        width: 300,
        height: 600,
      },
    ],
    name: 'half_page_mpu' as AdNameType,
    position: 5,
  },
  {
    id: `${countryName}_MPU_Lower`,
    size: [
      {
        width: 300,
        height: 250,
      },
    ],
    name: 'mpu_bottom' as AdNameType,
    position: 16,
  },
  {
    id: `${countryName}_Panorama`,
    size: [
      {
        width: 530,
        height: 65,
        viewportWidth: 600,
      },
      {
        width: 728,
        height: 90,
        viewportWidth: 810,
      },
      {
        width: 980,
        height: 120,
        viewportWidth: 1090,
      },
    ],
    name: 'panorama' as AdNameType,
  },
  {
    id: `${countryName}_Community_Wallpaper_Background`,
    size: [
      {
        width: 1145,
        height: 350,
      },
    ],
    name: 'community_wallpaper_background' as AdNameType,
  },
  {
    id: `${countryName}_Community_Wallpaper_Box`,
    size: [
      {
        width: 560,
        height: 185,
      },
    ],
    name: 'community_wallpaper_box' as AdNameType,
  },
  {
    id: `${countryName}_Native`,
    size: [
      {
        isFluid: true,
      },
    ],
    name: 'list' as AdNameType,
    position: 5,
  },
  {
    id: `${countryName}_Native2`,
    size: [
      {
        isFluid: true,
      },
    ],
    name: 'list' as AdNameType,
    position: 18,
  },
];
