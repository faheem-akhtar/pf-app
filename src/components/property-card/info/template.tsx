import { FunctionComponent } from 'react';

import { IconThickPriceExclusiveTemplate, IconThickPriceInclusiveTemplate } from 'components/icon/thick';
import { propertyUtilitiesPriceTypeEnabledByDefault } from 'config/property/utilities-price-type/enabled-by-default';
import { PropertyUtilitiesPriceTypeEnum } from 'enums/property/utilities-price-type.enum';
import { arrayFilterNonValue } from 'helpers/array/filter/non-value';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from '../property-card.module.scss';
import { propertyCardVariantsModernIsActive } from '../variants/modern/is-active';
import { PropertyCardInfoTemplatePropsInterface } from './template-props.interface';

export const PropertyCardInfoTemplate: FunctionComponent<PropertyCardInfoTemplatePropsInterface> = ({
  cardType,
  type,
  deliveryDate,
  price,
  utilitiesPriceType,
  customTitle,
  location,
  bedrooms,
  bathrooms,
  area,
  children,
  t,
}) => {
  const details = propertyCardVariantsModernIsActive(cardType) ? (
    <div className={domClassMerge(styles.row, styles.details)}>
      {bedrooms && (
        <span className={styles.detail} aria-label={t('Bedrooms')}>
          {bedrooms}
        </span>
      )}
      {bathrooms && (
        <span className={styles.detail} aria-label={t('bathrooms')}>
          {bathrooms}
        </span>
      )}
      {/* TODO[CX-1013] Translation keys should be followed common pattern for all aria-labels */}
      <span className={styles.detail} aria-label={t('Property Area')}>
        {area}
      </span>
    </div>
  ) : (
    <div className={styles.row}>
      <p className={styles.detail}>{arrayFilterNonValue([type, bedrooms, bathrooms]).join(', ')}</p>
    </div>
  );

  const UtilityPriceTypeIcon =
    utilitiesPriceType === PropertyUtilitiesPriceTypeEnum.inclusive
      ? IconThickPriceInclusiveTemplate
      : IconThickPriceExclusiveTemplate;

  return (
    <main className={styles.content}>
      {propertyCardVariantsModernIsActive(cardType) ? (
        <div className={styles.row}>
          <p className={styles.type} aria-label={t('Property type')}>
            {type}
          </p>
          {deliveryDate && <span className={styles['delivery-date']}>{deliveryDate}</span>}
        </div>
      ) : null}
      <div className={styles.row}>
        <p className={styles.price} aria-label={t('Price')}>
          {price}
        </p>
        {propertyUtilitiesPriceTypeEnabledByDefault &&
        utilitiesPriceType !== PropertyUtilitiesPriceTypeEnum.notSelected ? (
          <div
            className={domClassMerge(styles['utility-price-type'], {
              [styles[`utility-price-type--${utilitiesPriceType}`]]: !!utilitiesPriceType,
            })}
          >
            <UtilityPriceTypeIcon clipped={true} class={styles['utility-price-type-icon']} />
            <span>
              {t(utilitiesPriceType === PropertyUtilitiesPriceTypeEnum.inclusive ? 'Inclusive' : 'Exclusive')}
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.row}>
        <h3 className={styles.title}>{customTitle}</h3>
      </div>

      <div className={styles.row}>
        <p className={styles.location} aria-label={t('Location')}>
          {location}
        </p>
      </div>
      {details}
      {children}
    </main>
  );
};
