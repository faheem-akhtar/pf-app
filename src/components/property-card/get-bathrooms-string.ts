import { TFunction } from 'next-i18next';

// TODO-FE[TPNX-3183] fix translations
export const componentsPropertyCardGetBathroomsString = (t: TFunction, bathsValue: number): string => {
  let baths = '';
  if (bathsValue === 1) {
    baths = `, 1 ${t('Bathroom')}`;
  } else if (bathsValue > 1) {
    const value = bathsValue > 7 ? '7+' : bathsValue;
    baths = `, ${value} ${t('Bathrooms')}`;
  }

  return baths;
};
