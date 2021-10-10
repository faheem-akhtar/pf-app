import { stringSanitizeSimple } from 'helpers/string/sanitize-simple';
import { useTranslation } from 'helpers/translation/hook';
import { MultiSelectionAutocompleteComponent } from 'library/multi-selection-autocomplete/component';

import { KeywordsComponentPropsInterface } from './component-props.interface';
import { keywordsMakeQueryForInputValue } from './make-query-for-input-value';
import { keywordsOnInputKeyPress } from './on-input-key-press';
import { keywordsTryAddItem } from './try-add-item';

const separator = ',';

export const KeywordsComponent = ({
  onChange,
  value,
  category,
  chipsOnTheBottom,
  className,
  chipClassName,
  keywordsMapping,
}: KeywordsComponentPropsInterface): JSX.Element => {
  const { t } = useTranslation();
  const keywords = value.split(separator).filter((x) => x);
  const keywordsQueryForInputValue = keywordsMakeQueryForInputValue(category, keywordsMapping);

  return (
    <MultiSelectionAutocompleteComponent
      className={className}
      chipClassName={chipClassName}
      chipsOnTheBottom={chipsOnTheBottom}
      value={keywords}
      getTitle={(keyword): string => keyword}
      getChipTitle={(keyword): string => keyword}
      placeholder={t('keywords_widget/placeholder')}
      onInputChange={keywordsQueryForInputValue}
      onFocus={keywordsQueryForInputValue}
      onAddItem={(keyword): void => {
        const trimmedWord = keyword.trim();
        const regex = new RegExp(trimmedWord, 'i');
        if (!keywords.some((word) => regex.test(word) && word.length === trimmedWord.length)) {
          onChange([...keywords, keyword].join(separator));
        }
      }}
      onItemRemove={(keyword): void => onChange(keywords.filter((k) => keyword !== k).join(separator))}
      onItemGroupRemoveClick={(): void => onChange(keywords[0])}
      renderNoSuggestions={(inputValue: string): JSX.Element => (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: t('keywords_widget/no-suggestions-message', { inputValue: stringSanitizeSimple(inputValue) }),
          }}
        />
      )}
      onInputKeyPress={keywordsOnInputKeyPress}
      onWindowMouseDownOutsideAutocomplete={keywordsTryAddItem}
    />
  );
};
