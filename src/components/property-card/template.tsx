import {
  IconSolidEmailTemplate,
  IconSolidFavoriteTemplate,
  IconSolidPhoneTemplate,
  IconSolidWhatsappTemplate,
  IconThickFavoriteTemplate,
  IconThickInclusiveTemplate,
  IconThinMenuTemplate,
} from 'components/icon';
import { domClassMerge } from 'helpers/dom/class-merge';
import { GalleryScrollComponent } from 'library/gallery-scroll/component';
import { GalleryScrollObjectFitEnum } from 'library/gallery-scroll/object-fit.enum';

import { PropertyCardGalleryPlaceholderTemplate } from './gallery-placeholder/template';
import { PropertyCardLoadingSkeletonTemplate } from './loading-skeleton/template';
import styles from './property-card.module.scss';
import { PropertyCardTemplatePropsType } from './template-props.type';

// TODO-FE [CX-598] Maintain props for propertyModel/tealium
export const PropertyCardTemplate = ({
  area,
  banners = [],
  bathrooms,
  bedrooms,
  contactDate,
  customTitle,
  deliveryDate,
  gallery,
  href,
  loading,
  location,
  phoneNumber,
  price,
  publishDate,
  saved,
  showBanners = true,
  t,
  type,
  utilitiesIncluded,
  whatsAppLink,

  onEmailClick,
  onMenuButtonClick,
  onCallClick,
  onSaveButtonClick,
  onWhatsappClick,
  onGalleryIndexChange,
  onGalleryClick,
  onPropertyLinkClick,
}: PropertyCardTemplatePropsType): JSX.Element => {
  if (loading) {
    return <PropertyCardLoadingSkeletonTemplate />;
  }

  return (
    <article className={styles.container}>
      <header className={domClassMerge(styles.section, styles.header)}>
        {gallery.items.length ? (
          <GalleryScrollComponent
            {...gallery}
            className={styles.gallery}
            objectFit={GalleryScrollObjectFitEnum.UNSET}
            onActiveIndexChange={onGalleryIndexChange}
            onClick={onGalleryClick}
          />
        ) : (
          <button className={styles.placeholder} onClick={onGalleryClick}>
            <PropertyCardGalleryPlaceholderTemplate />
          </button>
        )}
        {banners.length ? (
          <ul
            className={domClassMerge(styles.banner_container, {
              [styles.banner_container_hidden]: !showBanners,
            })}
          >
            {banners.map(({ text, colorClass }, index) => (
              <li key={index} className={domClassMerge(styles.banner, styles[colorClass])}>
                {text}
              </li>
            ))}
          </ul>
        ) : null}
        <div className={styles.menu}>
          <button className={styles.menu_btn} onClick={onSaveButtonClick} data-testid='property-save-button'>
            {saved ? (
              <IconSolidFavoriteTemplate class={domClassMerge(styles.saved_icon, styles.saved_icon_filled)} />
            ) : (
              <IconThickFavoriteTemplate class={styles.saved_icon} />
            )}
          </button>
          <button className={styles.menu_btn} onClick={onMenuButtonClick}>
            <IconThinMenuTemplate clipped={false} />
          </button>
        </div>
      </header>
      <div className={styles.content}>
        <a className={styles.link} href={href} onClick={onPropertyLinkClick} />
        <section className={domClassMerge(styles.section, styles.body)}>
          <p className={styles.type} aria-label={t('Property type')}>
            {type}
            {deliveryDate && <span className={styles.delivery_date}>{deliveryDate}</span>}
          </p>
          <p className={styles.price} aria-label={t('Price')}>
            {price}
            {utilitiesIncluded && (
              <span className={styles.inclusive}>
                <IconThickInclusiveTemplate clipped={true} class={styles.inclusive_icon} /> {t('Inclusive')}{' '}
              </span>
            )}
          </p>
          <h3 className={styles.title}>{customTitle}</h3>
          <p className={styles.location} aria-label={t('Location')}>
            {location}
          </p>
          <p className={styles.details}>
            {bedrooms && (
              <span className={styles.details__section} aria-label={t('Bedrooms')}>
                {bedrooms}
              </span>
            )}
            {bathrooms && (
              <span className={styles.details__section} aria-label={t('bathrooms')}>
                {bathrooms}
              </span>
            )}
            <span className={styles.details__section} aria-label={t('Property Area')}>
              {area}
            </span>
          </p>
        </section>
        <footer className={styles.footer}>
          <div className={domClassMerge(styles.section, styles.footer__content)}>
            <p className={styles.publish_date} aria-label={t('Listed')}>
              {publishDate}
            </p>

            {/*  TODO-FE: CX-652 Fix library button and implement here  */}
            <div className={styles.contacts}>
              {onCallClick ? (
                <a data-testid='cta-call' href={phoneNumber} className={styles.contacts__btn} onClick={onCallClick}>
                  <IconSolidPhoneTemplate clipped={false} />
                </a>
              ) : null}
              {onEmailClick ? (
                <button data-testid='cta-email' className={styles.contacts__btn} onClick={onEmailClick}>
                  <IconSolidEmailTemplate clipped={false} />
                </button>
              ) : null}
              {onWhatsappClick ? (
                <a
                  data-testid='cta-whatsapp'
                  href={whatsAppLink}
                  className={domClassMerge(styles.contacts__btn, styles.contacts__btn_whatsapp)}
                  onClick={onWhatsappClick}
                >
                  <IconSolidWhatsappTemplate clipped={false} />
                </a>
              ) : null}
            </div>
          </div>
          {contactDate ? (
            <p className={styles.contacted}>
              <IconSolidPhoneTemplate class={styles.contacted__icon} clipped={true} />
              <span>{t('Last contacted on')}:</span>
              <b>{contactDate}</b>
            </p>
          ) : null}
        </footer>
      </div>
    </article>
  );
};
