import { useContext } from 'react';

import Router, { NextRouter, useRouter } from 'next/router';

import { urlQuerySerialize } from 'helpers/url-query/serialize';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { IconChevronLeftTemplate } from 'components/icon/chevron-left-template';
import { IconChevronRightTemplate } from 'components/icon/chevron-right-template';
import { PaginationSectionComponentPropsType } from './component-props.type';

import styles from './pagination-section.module.scss';

// TODO-FE[TPNX-3064] Proper implementation for pagination section
Router.events.on('routeChangeStart', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const renderLink = (router: NextRouter, icon: JSX.Element, page: number, hidden: boolean): JSX.Element => {
  const url = `/${router.locale}${router.pathname}?${urlQuerySerialize({ ...router.query, page })}`;

  return (
    <ButtonTemplate
      componentType={ButtonComponentTypeEnum.primary}
      href={hidden ? '#' : url}
      size={ButtonSizeEnum.regular}
      disabled={hidden}
      onClick={(e): void => {
        e?.preventDefault();
        router.push(url);
      }}
    >
      {icon}
    </ButtonTemplate>
  );
};

export const PaginationSectionComponent = ({
  pagesAvailable,
  loading,
}: PaginationSectionComponentPropsType): JSX.Element => {
  const router = useRouter();
  const {
    value: { [FiltersParametersEnum.pageNumber]: currentPage },
  } = useContext(FiltersContext);

  return (
    <div className={styles.container}>
      {renderLink(router, <IconChevronLeftTemplate />, currentPage - 1, loading || currentPage === 1)}
      {renderLink(router, <IconChevronRightTemplate />, currentPage + 1, loading || currentPage === pagesAvailable)}
    </div>
  );
};
