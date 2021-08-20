import { useContext, useRef } from 'react';

import { filtersCountGetActiveFields } from 'helpers/filters/count/get-active-fields';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { FiltersContext } from 'components/filters/context';
import { FiltersModalContentComponent } from './content-component';
import { IconThinFilterOpenTemplate } from 'components/icon/thin/filter-open-template';
import { ModalComponent } from 'components/modal/component';

// TODO-FE[CX-423] add tests
export const FiltersModalButtonComponent = (): JSX.Element => {
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const { t } = useTranslationHook();
  const filterCtx = useContext(FiltersContext);
  const nonDefaultFiltersCount = filtersCountGetActiveFields(filterCtx);

  return (
    <>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => openFiltersRef.current()}
        icon={{ component: IconThinFilterOpenTemplate, position: ButtonIconPositionEnum.left }}
      >
        {t('filters')} <span>{nonDefaultFiltersCount ? `(${nonDefaultFiltersCount})` : ''}</span>
      </ButtonTemplate>
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        <FiltersModalContentComponent close={(): void => closeFiltersRef.current()} />
      </ModalComponent>
    </>
  );
};
