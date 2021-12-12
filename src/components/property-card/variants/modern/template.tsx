import { FunctionComponent } from 'react';

import { IconSolidEmailTemplate, IconSolidPhoneTemplate, IconSolidWhatsappTemplate } from 'components/icon';
import { PropertyCardInfoTemplate } from 'components/property-card/info/template';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from '../../property-card.module.scss';
import { PropertyCardVariantsTemplatePropsBaseInterface } from '../template-props-base.interface';

export const PropertyCardVariantsModernTemplate: FunctionComponent<PropertyCardVariantsTemplatePropsBaseInterface> = ({
  templates: { menu, banners, gallery },

  cardType,
  area,
  bathrooms,
  publishDate,
  bedrooms,
  contactDate,
  customTitle,
  deliveryDate,
  href,
  location,
  price,
  type,
  utilitiesPriceType,
  phoneNumber,
  whatsAppLink,
  t,

  onEmailClick,
  onCallClick,
  onWhatsappClick,
  onPropertyLinkClick,
}) => (
  <>
    <header className={styles.header}>
      {gallery}
      {banners}
      {menu}
    </header>

    <a className={styles.link} href={href} onClick={onPropertyLinkClick} />

    <PropertyCardInfoTemplate
      cardType={cardType}
      type={type}
      deliveryDate={deliveryDate}
      price={price}
      utilitiesPriceType={utilitiesPriceType}
      customTitle={customTitle}
      location={location}
      bedrooms={bedrooms}
      bathrooms={bathrooms}
      area={area}
      t={t}
    />

    <footer className={styles.footer}>
      <div className={styles.row}>
        <p className={styles['publish-date']} aria-label={t('Listed')}>
          {publishDate}
        </p>

        {/*  TODO-FE: CX-652 Fix library button and implement here  */}
        <div className={styles.row}>
          {/* TODO[CX-1013] Translation keys should be followed common pattern for ctas */}
          {onCallClick ? (
            <a
              data-testid='cta-call'
              href={phoneNumber}
              className={domClassMerge(styles.button, styles['button--contact'])}
              onClick={onCallClick}
            >
              <IconSolidPhoneTemplate clipped={false} />
            </a>
          ) : null}
          {onEmailClick ? (
            <button
              data-testid='cta-email'
              className={domClassMerge(styles.button, styles['button--contact'])}
              onClick={onEmailClick}
            >
              <IconSolidEmailTemplate clipped={false} />
            </button>
          ) : null}
          {onWhatsappClick ? (
            <a
              data-testid='cta-whatsapp'
              href={whatsAppLink}
              className={domClassMerge(styles.button, styles['button--contact'], styles['button--whatsapp'])}
              onClick={onWhatsappClick}
            >
              <IconSolidWhatsappTemplate clipped={false} />
            </a>
          ) : null}
        </div>
      </div>

      {contactDate ? (
        <div className={styles.contacted}>
          <IconSolidPhoneTemplate class={styles['contacted-icon']} clipped={true} />
          <span>{t('Last contacted on')}:</span>
          <b>{contactDate}</b>
        </div>
      ) : null}
    </footer>
  </>
);
