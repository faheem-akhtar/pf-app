import { useRouter } from 'next/router';

import { IconThinMapPinTemplate } from 'components/icon/thin/map-pin-template';
import { localeGetHref } from 'helpers/locale/get-href';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './map-search-button.module.scss';

export const MapSearchButtonComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { asPath, locale } = useRouter();
  const path = asPath.replace('search', 'map-search');

  return (
    <ButtonTemplate
      type='button'
      href={localeGetHref(locale as string, path, true)}
      className={styles.button}
      componentType={ButtonComponentTypeEnum.floating}
      size={ButtonSizeEnum.small}
      icon={{ component: IconThinMapPinTemplate, position: ButtonIconPositionEnum.right }}
    >
      {t('map')}
    </ButtonTemplate>
  );
};
