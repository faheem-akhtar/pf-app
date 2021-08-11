import { TFunction } from 'next-i18next';

// TODO-FE[TPNX-3183] fix translations
export const propertyCardGetBedroomsString = (t: TFunction, bedsValue: number): string => {
  let beds = '';
  if (bedsValue === 0) {
    beds = `, ${t('Studio')}`;
  } else if (bedsValue === 1) {
    beds = `, 1 ${t('Bedroom')}`;
  } else if (bedsValue > 1) {
    const value = bedsValue > 7 ? '7+' : bedsValue;
    beds = `, ${value} ${t('Bedrooms')}`;
  }

  return beds;
};
