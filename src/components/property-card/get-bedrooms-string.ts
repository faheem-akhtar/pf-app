import { TFunctionType } from 'types/t-function/type';

// TODO-FE[CX-399] use lokalize plural feature
export const propertyCardGetBedroomsString = (t: TFunctionType, bedsValue: number): string => {
  let beds = '';
  if (bedsValue === 0) {
    beds = `, ${t('studio')}`;
  } else if (bedsValue === 1) {
    beds = `, 1 ${t('bedroom')}`;
  } else if (bedsValue > 1) {
    const value = bedsValue > 7 ? '7+' : bedsValue;
    beds = `, ${value} ${t('bedrooms')}`;
  }

  return beds;
};
