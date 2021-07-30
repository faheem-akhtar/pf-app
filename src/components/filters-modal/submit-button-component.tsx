import { useApiPropertySearchCount } from 'api/property-search-count/hook';

import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { FiltersModalSubmitButtonPropsInterface } from './submit-button-props.interface';

import styles from './filters-modal-component.module.scss';

export const FiltersModalSubmitButtonComponent = ({
  onSubmit,
  filtersValue,
  forceNumberOfProperties,
}: FiltersModalSubmitButtonPropsInterface): JSX.Element => {
  const doNotFetch = forceNumberOfProperties !== null;
  let result = useApiPropertySearchCount(filtersValue, doNotFetch);

  if (forceNumberOfProperties !== null) {
    result = { ok: true, data: forceNumberOfProperties } as ApiFetcherResultSuccessInterface<number>;
  }

  return (
    <ButtonTemplate
      type='button'
      componentType={ButtonComponentTypeEnum.primary}
      size={ButtonSizeEnum.regular}
      className={styles.submit_btn}
      onClick={onSubmit}
      disabled={!result.ok}
      loading={!result.ok}
    >
      {result.ok && <span>{result.data ? `Show ${result.data} properties` : 'No results.'}</span>}
    </ButtonTemplate>
  );
};
