import { FunctionComponent } from 'react';

import { IconSolidEmailTemplate, IconSolidPhoneTemplate, IconSolidWhatsappTemplate } from 'components/icon';
import { PropertyCardInfoTemplate } from 'components/property-card/info/template';
import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from '../../property-card.module.scss';
import { PropertyCardVariantsTemplatePropsBaseInterface } from '../template-props-base.interface';

export const PropertyCardVariantsClassicTemplate: FunctionComponent<PropertyCardVariantsTemplatePropsBaseInterface> = ({
  templates: { menu, banners, gallery },

  cardType,
  area,
  bathrooms,
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
    {menu}
    {banners}

    <div className={domClassMerge(styles.row, styles.wrapper)}>
      {gallery}

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
      >
        <a className={styles.link} href={href} onClick={onPropertyLinkClick} />
        <div className={domClassMerge(styles.row, styles.actions)}>
          {onCallClick ? (
            <ButtonTemplate
              type='button'
              testId='cta-call'
              href={phoneNumber}
              onClick={onCallClick}
              componentType={ButtonComponentTypeEnum.tertiary}
              size={ButtonSizeEnum.small}
              className={styles['button--action']}
              icon={{
                component: IconSolidPhoneTemplate,
                position: ButtonIconPositionEnum.left,
                className: styles['icon--call'],
              }}
            >
              {t('cta-call')}
            </ButtonTemplate>
          ) : null}

          {onWhatsappClick ? (
            <ButtonTemplate
              type='button'
              testId='cta-whatsapp'
              componentType={ButtonComponentTypeEnum.tertiary}
              size={ButtonSizeEnum.small}
              href={whatsAppLink}
              className={styles['button--action']}
              onClick={onWhatsappClick}
              icon={{
                component: IconSolidWhatsappTemplate,
                position: ButtonIconPositionEnum.left,
                className: styles['icon--whatsapp'],
              }}
            >
              {t('cta-whatsapp')}
            </ButtonTemplate>
          ) : onEmailClick ? (
            <ButtonTemplate
              type='button'
              testId='cta-email'
              className={styles['button--action']}
              componentType={ButtonComponentTypeEnum.tertiary}
              size={ButtonSizeEnum.small}
              onClick={onEmailClick}
              icon={{
                component: IconSolidEmailTemplate,
                position: ButtonIconPositionEnum.left,
                className: styles['icon--email'],
              }}
            >
              {t('cta-email')}
            </ButtonTemplate>
          ) : null}
        </div>
      </PropertyCardInfoTemplate>
    </div>

    {contactDate ? (
      <div className={domClassMerge(styles.row, styles.contacted)}>
        <span>{t('Last contacted on')}:</span>
        <span>{contactDate}</span>
      </div>
    ) : null}
  </>
);
