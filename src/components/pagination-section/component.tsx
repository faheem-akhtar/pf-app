import { useContext } from 'react';

import Router, { NextRouter, useRouter } from 'next/router';

import { urlQuerySerialize } from 'helpers/url-query/serialize';
import { useTranslation } from 'helpers/translation/hook';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconTemplatePropsInterface } from 'components/icon/template-props.interface';
import { IconThickChevronLeftTemplate } from 'components/icon/thick/chevron-left-template';
import { IconThickChevronRightTemplate } from 'components/icon/thick/chevron-right-template';
import { PaginationSectionComponentPropsType } from './component-props.type';

import styles from './pagination-section.module.scss';

// TODO-FE[TPNX-3064] Proper implementation for pagination section
Router.events.on('routeChangeStart', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const renderLink = (
  router: NextRouter,
  icon: (props: IconTemplatePropsInterface) => JSX.Element,
  page: number,
  hidden: boolean,
  label: string,
  iconPosition: ButtonIconPositionEnum
): JSX.Element => {
  const url = `/${router.locale}${router.pathname}?${urlQuerySerialize({ ...router.query, page })}`;

  return (
    <ButtonTemplate
      componentType={ButtonComponentTypeEnum.primary}
      href={hidden ? '#' : url}
      size={ButtonSizeEnum.small}
      disabled={hidden}
      onClick={(e): void => {
        e?.preventDefault();
        router.push(url);
      }}
      icon={{
        component: icon,
        position: iconPosition,
      }}
      className={styles.button}
    >
      {label}
    </ButtonTemplate>
  );
};

// TODO-FE[CX-425] Add tests
export const PaginationSectionComponent = ({
  pagesAvailable,
  loading,
}: PaginationSectionComponentPropsType): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    value: { [FiltersParametersEnum.pageNumber]: currentPage },
  } = useContext(FiltersContext);

  return (
    <div className={styles.container}>
      {renderLink(
        router,
        IconThickChevronLeftTemplate,
        currentPage - 1,
        loading || currentPage === 1,
        t('prev'),
        ButtonIconPositionEnum.left
      )}
      {renderLink(
        router,
        IconThickChevronRightTemplate,
        currentPage + 1,
        loading || currentPage === pagesAvailable,
        t('next'),
        ButtonIconPositionEnum.right
      )}
    </div>
  );
};
