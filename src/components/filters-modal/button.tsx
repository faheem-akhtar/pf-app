import { useRef } from 'react';

import { ButtonSizeEnum } from 'library/button/size.enum';
import { FiltersModalContentComponent } from './content-component';
import { LibraryButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { LibraryButtonTemplate } from 'library/button/template';
import { ModalComponent } from 'components/modal/component';
import { useTranslation } from 'next-i18next';

export const FiltersModalButton = (): JSX.Element => {
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const { t } = useTranslation();

  return (
    <>
      <LibraryButtonTemplate
        type='button'
        componentType={LibraryButtonComponentTypeEnum.secondary}
        size={ButtonSizeEnum.regular}
        onClick={(): void => openFiltersRef.current()}
      >
        {t('Filters')}
      </LibraryButtonTemplate>
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        <FiltersModalContentComponent close={(): void => closeFiltersRef.current()} />
      </ModalComponent>
    </>
  );
};
