import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { useApiPropertySearchCount } from 'api/property-search-count/hook';
import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './filters-modal-component.module.scss';
import { FiltersModalSubmitButtonPropsInterface } from './submit-button-props.interface';

export const FiltersModalSubmitButtonComponent = ({
  onSubmit,
  filtersValue,
  forceNumberOfProperties,
}: FiltersModalSubmitButtonPropsInterface): JSX.Element => {
  const { t } = useTranslation();

  const doNotFetch = forceNumberOfProperties !== null;
  let result = useApiPropertySearchCount(filtersValue, doNotFetch);

  if (forceNumberOfProperties !== null) {
    result = { ok: true, data: forceNumberOfProperties } as ApiFetcherResultSuccessInterface<number>;
  }

  // TODO-FE[CX-399] use lokalize plural feature
  let buttonText = '';

  if (result.ok) {
    if (result.data === 1) {
      buttonText = t('show-one-result');
    } else {
      buttonText = t('show-n-results').replace('{n}', result.data.toString());
    }
  }

  return (
    <ButtonTemplate
      type='button'
      componentType={ButtonComponentTypeEnum.primary}
      size={ButtonSizeEnum.regular}
      className={domClassMerge(styles.submit_btn, {
        [styles.notFoundButton]: result.ok && !result.data,
      })}
      onClick={onSubmit}
      disabled={!result.ok}
      loading={!result.ok}
    >
      {result.ok && result.data ? (
        buttonText
      ) : (
        <>
          <strong>{t('filters/no-properties-found')}</strong>
          {t('filters/clear-or-change-filters')}
        </>
      )}
    </ButtonTemplate>
  );
};
