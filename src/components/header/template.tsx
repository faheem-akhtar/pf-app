import { Fragment } from 'react';

import { useTranslation } from 'next-i18next';

import { configCommon } from 'config/common';
import { configOriginValue } from 'config/origin/value';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { HeaderTemplatePropsInterface } from './template.props.interface';
import { IconLogoAlternativeTemplate } from 'components/icon/logo/alternative-template';
import { IconLogoCurrentTemplate } from 'components/icon/logo/current-template';
import { IconThinHeartTemplate } from 'components/icon/thin-heart-template';
import { IconUserOFilledTemplate } from 'components/icon/user-o-filled-template';
import { LanguageSelectorComponent } from 'components/language-selector/component';

import styles from './header.module.scss';

export const HeaderTemplate = ({
  locale,
  userProfile,
  onLoginButtonClick,
}: HeaderTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslation('common');

  const currentLocaleIsDefault = locale === configCommon.language.current;
  const logo = currentLocaleIsDefault ? <IconLogoCurrentTemplate /> : <IconLogoAlternativeTemplate />;
  const userAccountPath = `${configOriginValue}/${
    locale === configCommon.language.current ? configCommon.language.current : configCommon.language.alternative
  }/user`;

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <a
              href={currentLocaleIsDefault ? '/' : `/${configCommon.language.alternative}`}
              className={styles.logoLink}
            >
              {logo}
            </a>
          </div>

          <div className={styles.sectionRight}>
            <LanguageSelectorComponent />
            {userProfile?.user && (
              <div className={styles.savedProperties}>
                <span className={styles.spacer} />
                <a href={`${userAccountPath}/saved-properties`} className={styles.savedPropertiesButton}>
                  <IconThinHeartTemplate class={styles.savedPropertiesIcon} clipped />
                  <div className={styles.notificationDot} />
                  <div className={styles.notificationBadge}>{userProfile.savedPropertiesCount}</div>
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
                  {t('Log in')}
                </ButtonTemplate>
              ) : (
                <Fragment>
                  {userProfile?.user.image ? (
                    <img src={userProfile?.user.image} class={styles.userPhoto} />
                  ) : (
                    <IconUserOFilledTemplate class={styles.userIcon} />
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
