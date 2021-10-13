import { NextRouter, useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { FiltersContext } from 'components/filters/context';
import { IconTemplatePropsInterface } from 'components/icon/template-props.interface';
import { IconThickChevronLeftTemplate } from 'components/icon/thick/chevron-left-template';
import { IconThickChevronRightTemplate } from 'components/icon/thick/chevron-right-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { useTranslation } from 'helpers/translation/hook';
import { urlQuerySerialize } from 'helpers/url-query/serialize';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { PaginationSectionComponentPropsType } from './component-props.type';
import styles from './pagination-section.module.scss';

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

export const PaginationSectionComponent = ({
  pagesAvailable,
  loading,
}: PaginationSectionComponentPropsType): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    value: { [FiltersParametersEnum.pageNumber]: currentPage },
  } = useContext(FiltersContext);

  useEffect(() => {
    const callback = (): void => window.scrollTo({ top: 0, behavior: 'smooth' });
    router.events.on('routeChangeStart', callback);

    return (): void => {
      router.events.off('routeChangeStart', callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
