import { useContext, useRef } from 'react';

import { useTranslationHook } from 'helpers/hook/translation.hook';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { FiltersContext } from 'components/filters/context';
import { IconThinStarTemplate } from 'components/icon/thin/star-template';
import { ModalComponent } from 'components/modal/component';
import { saveSearchFilterEquality } from '../filter-equality';
import { saveSearchFiltersMapper } from '../filters-mapper';
import { SaveSearchModalContentComponent } from './content-component';
import { useApiSavedSearch } from 'api/saved-search/hook';

import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalButtonComponent = (): JSX.Element => {
  const { t } = useTranslationHook();
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const filtersCtx = useContext(FiltersContext);
  const filters = saveSearchFiltersMapper(filtersCtx.value);
  const savedSearchResponse = useApiSavedSearch();
  const userSavedSearches = savedSearchResponse.ok
    ? savedSearchResponse.data.filter((item) => saveSearchFilterEquality(item.filters, filters))
    : [];

  return (
    <>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => {
          if (savedSearchResponse.ok && userSavedSearches.length == 0) {
            openFiltersRef.current();
          }
        }}
        icon={{
          component: IconThinStarTemplate,
          position: ButtonIconPositionEnum.left,
          className: userSavedSearches.length > 0 ? styles.icon__active : styles.icon__inactive,
        }}
      >
        {t('save-search/cta-label')}
      </ButtonTemplate>
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        {/* TODO-FE[CX-420] - display login dialog to the guest */}
        <SaveSearchModalContentComponent close={(): void => closeFiltersRef.current()} />
      </ModalComponent>
    </>
  );
};
