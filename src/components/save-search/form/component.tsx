import { useContext, useState } from 'react';

import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { useFormField } from 'helpers/form/field.hook';
import { formValidatorMaxLength } from 'helpers/form/validator/max-length';
import { formValidatorRequired } from 'helpers/form/validator/required';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { SelectFieldTemplate } from 'library/select-field/template';

import { SaveSearchContext } from '../context';
import { SAVE_SEARCH_FREQUENCIES } from '../frequencies.constant';
import styles from './save-search-form-component.module.scss';

const MAX_CHARACTERS_LIMIT = 256;

export const SaveSearchFormComponent = ({ onSuccess }: { onSuccess: () => void }): JSX.Element => {
  const { t } = useTranslation();
  const saveSearch = useContext(SaveSearchContext);
  const [generalError, setGeneralError] = useState<string>();
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useFormField<string>('', [
    formValidatorRequired(t('save_search/name-validation-required')),
    formValidatorMaxLength(t('save_search/name-validation-character_limit'), MAX_CHARACTERS_LIMIT, true),
  ]);
  const [frequency, setFrequency] = useFormField<SaveSearchFrequencyEnum>(SaveSearchFrequencyEnum.DAILY);
  const fields = {
    id: null,
    name: '',
    formattedFilters: null,
    frequency: SaveSearchFrequencyEnum.DAILY,
  };
  const selectedFrequency = SAVE_SEARCH_FREQUENCIES.find((item) => item.value === frequency.value);

  return (
    <>
      <header className={styles['save-search-form__header']}>
        <h1 className={styles['save-search-form__header-title']}>{t('save_search/form-add-title')}</h1>
      </header>
      <div className={styles['save-search-form__content']}>
        {generalError && <div className={styles['save-search-form__error--general']}>{generalError}</div>}
        {fields.formattedFilters && (
          <p className={styles['save-search-form__content-desc']}>{fields.formattedFilters}</p>
        )}
        <div className={styles['save-search-form__content-row']}>
          <label htmlFor='save-search-name' className={styles['save-search-form__label']}>
            {t('save_search/name-label')}
          </label>
          <InputBaseComponent
            id='save-search-name'
            name='name'
            floatPlaceholder={false}
            placeholder={t('save_search/name-placeholder')}
            value={name.value}
            onChange={(value): void => {
              setGeneralError('');
              setName(value);
            }}
          />
          {name.error && <p className={styles['save-search-form__error']}>{name.error}</p>}
        </div>
        <div className={styles['save-search-form__content-row']}>
          <label className={styles['save-search-form__label']} htmlFor='frequency'>
            {t('save_search/frequency-label')}
          </label>
          <SelectFieldTemplate
            id='frequency'
            name='frequency'
            value={selectedFrequency?.value}
            options={SAVE_SEARCH_FREQUENCIES.map((item) => ({ ...item, label: t(item.label) }))}
            onChange={(value): void => {
              setGeneralError('');
              setFrequency(value as SaveSearchFrequencyEnum);
            }}
          />
          <p className={styles['save-search-form__info']}>{t('save_search/frequency-help_text')}</p>
        </div>
      </div>
      <footer className={styles['save-search-form__footer']}>
        <ButtonTemplate
          type='button'
          size={ButtonSizeEnum.regular}
          className={styles['save-search-form__button']}
          componentType={ButtonComponentTypeEnum.primary}
          onClick={(): void => {
            const searchName = name.value?.trim();
            if (!searchName || name.error) {
              setName(searchName);
              return;
            }
            setIsloading(true);
            saveSearch
              .create({
                name: searchName,
                frequency: frequency.value,
              })
              .then((response) => {
                setIsloading(false);
                if (response.ok) {
                  onSuccess();
                } else {
                  setGeneralError(t('general-error-message'));
                }
              });
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          {t('save')}
        </ButtonTemplate>
      </footer>
    </>
  );
};
