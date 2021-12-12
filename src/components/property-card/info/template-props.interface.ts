import { PropertyCardTemplatePropsType } from '../template-props.type';

export interface PropertyCardInfoTemplatePropsInterface
  extends Pick<
    PropertyCardTemplatePropsType,
    | 'cardType'
    | 'type'
    | 'deliveryDate'
    | 'price'
    | 'utilitiesPriceType'
    | 'customTitle'
    | 'location'
    | 'bedrooms'
    | 'bathrooms'
    | 'area'
    | 't'
  > {}
