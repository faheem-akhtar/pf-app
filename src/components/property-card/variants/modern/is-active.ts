import { PropertyCardTypeEnum } from 'components/property-card/type.enum';

export const propertyCardVariantsModernIsActive = (cardType: PropertyCardTypeEnum): boolean =>
  cardType === PropertyCardTypeEnum.modern;
