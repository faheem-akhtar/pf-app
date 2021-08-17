import { TFunctionType } from 'types/t-function/type';

// TODO-FE[CX-399] use lokalize plural feature
export const componentsPropertyCardGetBathroomsString = (t: TFunctionType, bathsValue: number): string => {
  let baths = '';
  if (bathsValue === 1) {
    baths = `, 1 ${t('bathroom')}`;
  } else if (bathsValue > 1) {
    const value = bathsValue > 7 ? '7+' : bathsValue;
    baths = `, ${value} ${t('bathrooms')}`;
  }

  return baths;
};
