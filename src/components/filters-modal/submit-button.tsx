import { useApiPropertySearchCount } from 'api/property-search-count/use';

import { ButtonSizeEnum } from 'library/button/size.enum';
import { FetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { FiltersModalSubmitButtonPropsInterface } from './submit-button-props.interface';
import { LibraryButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { LibraryButtonTemplate } from 'library/button/template';

import styles from './filters-modal-component.module.scss';

export const FiltersModalSubmitButton = ({
  onSubmit,
  filtersValue,
  forceNumberOfProperties,
}: FiltersModalSubmitButtonPropsInterface): JSX.Element => {
  const doNotFetch = forceNumberOfProperties !== null;
  let result = useApiPropertySearchCount(filtersValue, doNotFetch);

  if (forceNumberOfProperties !== null) {
    result = { ok: true, data: forceNumberOfProperties } as FetcherResultSuccessInterface<number>;
  }

  return (
    <LibraryButtonTemplate
      type='button'
      componentType={LibraryButtonComponentTypeEnum.primary}
      size={ButtonSizeEnum.regular}
      className={styles.submit_btn}
      onClick={onSubmit}
      disabled={!result.ok}
    >
      {result.ok ? (
        <span>{result.data ? `Show ${result.data} properties` : 'No results.'}</span>
      ) : (
        <span>Loading...</span>
      )}
    </LibraryButtonTemplate>
  );
};
