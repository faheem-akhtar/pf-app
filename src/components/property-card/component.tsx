import { domClassMerge } from 'helpers/dom/class-merge';

import { PropertyCardComponentPropsType } from './component-props.type';

import styles from './property-card.module.scss';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  return (
    <div className={domClassMerge(styles.container, { [styles.loading]: loading })}>
      <a href={property.url} target='__blank'>
        <p>{property.name}</p>
      </a>
      <p>{property.priceText}</p>
      <p>{property.contactOptionsList.phone.value}</p>
    </div>
  );
};
