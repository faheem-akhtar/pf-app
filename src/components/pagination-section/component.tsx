import Router, { NextRouter, useRouter } from 'next/router';
import { useContext } from 'react';

import { urlQuerySerialize } from '../../helpers/url-query/serialize';

import { ButtonSizeEnum } from 'library/button/size.enum';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LibraryButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { LibraryButtonTemplate } from 'library/button/template';
import { PaginationSectionComponentPropsType } from './component-props.type';

import styles from './pagination-section.module.scss';

// TODO-FE[TPNX-3064] Proper implementation for pagination section
Router.events.on('routeChangeStart', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const renderLink = (router: NextRouter, text: string, page: number, hidden: boolean): JSX.Element => {
  const url = `/${router.locale}${router.pathname}?${urlQuerySerialize({ ...router.query, page })}`;

  return (
    <LibraryButtonTemplate
      className={hidden ? styles.hidden : ''}
      componentType={LibraryButtonComponentTypeEnum.secondary}
      href={hidden ? '#' : url}
      size={ButtonSizeEnum.small}
      onClick={(e): void => {
        e?.preventDefault();
        router.push(url);
      }}
    >
      {text}
    </LibraryButtonTemplate>
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
      {renderLink(router, 'Prev', currentPage - 1, loading || currentPage === 1)}
      {renderLink(router, 'Next', currentPage + 1, loading || currentPage === pagesAvailable)}
    </div>
  );
};
