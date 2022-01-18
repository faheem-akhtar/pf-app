import { IconLogoAlternativeTemplate } from 'components/icon/logo/alternative-template';
import { IconLogoCurrentTemplate } from 'components/icon/logo/current-template';
import { IconThinFavoriteTemplate } from 'components/icon/thin/favorite-template';
import { IconThinUserTemplate } from 'components/icon/thin/user-template';
import { LanguageSelectorComponent } from 'components/language-selector/component';
import { configCommon } from 'config/common';
import { localeGetHref } from 'helpers/locale/get-href';
import { localeIsDefault } from 'helpers/locale/is-default';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './header.module.scss';
import { HeaderTemplatePropsInterface } from './template.props.interface';

export const HeaderTemplate = ({
  locale,
  userProfile,
  onLoginButtonClick,
  languageSelectorVisible = true,
  alternateUrl,
}: HeaderTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslation();
  const logo = localeIsDefault(locale) ? <IconLogoCurrentTemplate /> : <IconLogoAlternativeTemplate />;

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <a
              href={localeIsDefault(locale) ? '/' : `/${configCommon.language.alternative}`}
              className={styles.logoLink}
            >
              {logo}
            </a>
          </div>

          <div className={styles.sectionRight}>
            {languageSelectorVisible && <LanguageSelectorComponent alternateUrl={alternateUrl} />}
            {userProfile?.user && (
              <div className={styles.savedProperties}>
                <span className={styles.spacer} />
                <a
                  href={localeGetHref(locale, '/user/saved-properties', true)}
                  className={styles.savedPropertiesButton}
                >
                  <IconThinFavoriteTemplate class={styles.savedPropertiesIcon} clipped />
                  <div className={styles.notificationBadge} data-testid='notification-badge'>
                    {userProfile.savedPropertiesCount}
                  </div>
                </a>
              </div>
            )}

            <div className={styles.userContainer}>
              {!userProfile?.user ? (
                <ButtonTemplate
                  type='button'
                  onClick={onLoginButtonClick}
                  componentType={ButtonComponentTypeEnum.secondary}
                  size={ButtonSizeEnum.small}
                >
                  {t('log-in')}
                </ButtonTemplate>
              ) : (
                <a className={styles.userProfileLink} href={localeGetHref(locale, '/user', true)}>
                  {userProfile?.user.image ? (
                    <img src={userProfile.user.image} alt='User Photo' className={styles.userPhoto} />
                  ) : (
                    <IconThinUserTemplate class={styles.userIcon} />
                  )}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
