import { useState } from 'react';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { formValidatorMaxLength } from 'helpers/form/validator/max-length';
import { formValidatorRequired } from 'helpers/form/validator/required';
import { saveSearchFrequencies } from '../frequencies';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { SelectFieldTemplate } from 'library/select-field/template';
import { TextFieldComponent } from 'library/text-field/component';
import { useFormField } from 'helpers/form/field.hook';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import styles from './save-search-form-component.module.scss';

const MAX_CHARACTERS_LIMIT = 256;

export const SaveSearchFormComponent = ({ onSubmit }: { onSubmit: () => void }): JSX.Element => {
  const { t } = useTranslationHook();
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
    formatted_filters: null,
    frequency: SaveSearchFrequencyEnum.DAILY,
  };
  const selectedFrequency = saveSearchFrequencies.find((item) => item.value === frequency.value);

  return (
    <>
      <header className={styles['save-search-form__header']}>
        <h1 className={styles['save-search-form__header-title']}>{t('save_search/form-add-title')}</h1>
      </header>
      <div className={styles['save-search-form__content']}>
        {generalError && <div className={styles['save-search-form__error--general']}>{generalError}</div>}
        {fields.formatted_filters && (
          <p className={styles['save-search-form__content-desc']}>{fields.formatted_filters}</p>
        )}
        <div className={styles['save-search-form__content-row']}>
          <label className={styles['save-search-form__label']}>{t('save_search/name-label')}</label>
          <TextFieldComponent
            floatPlaceholder={false}
            placeholder={t('save_search/name-placeholder')}
            value={name.value}
            error={!!name.error}
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
            value={selectedFrequency?.value}
            dropdownIcon
            options={saveSearchFrequencies.map((item) => ({ ...item, label: t(item.label) }))}
            onChange={(value): void => {
              setGeneralError('');
              setFrequency(value as SaveSearchFrequencyEnum);
            }}
          />
          {frequency.error && <p className={styles['save-search-form__error']}>{frequency.error}</p>}
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
            // TODO-FE[CX-410] - save the save search
            setIsloading(true);
            onSubmit();
            // onSubmit(searchName, frequency.value, fields.id);
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