import { useState } from 'react';

import { IconThinMapPinTemplate } from 'components/icon/thin/map-pin-template';
import { IconThinTimeTemplate } from 'components/icon/thin/time-template';
import { TFunctionType } from 'helpers/t-function/type';
import { useTranslation } from 'helpers/translation/hook';
import { MultiSelectionAutocompleteComponent } from 'library/multi-selection-autocomplete/component';
import { LocationService } from 'services/location/service';
import { WindowService } from 'services/window/service';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { MultiLocationSelectorComponentPropsInterface } from './component-props.interface';
import { multiLocationSelectorGetHistory } from './get-history';
import { multiLocationSelectorMakeOnAddLocation } from './make-on-add-location';
import styles from './multi-location-selector.module.scss';

const renderNoSuggestions = (t: TFunctionType, inputValue: string): JSX.Element => (
  <span
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: t('multi-location-selector/no-suggestions', { inputValue }),
    }}
  />
);

export const MultiLocationSelectorComponent = ({
  className,
  locale,
  onChange,
  value: locations,
  maxHistoryLength = 8,
  maxSearchResults = 8,
}: MultiLocationSelectorComponentPropsInterface): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const { localStorage } = WindowService;

  const onAddItem = multiLocationSelectorMakeOnAddLocation({
    locations,
    onNewLocations: onChange,
    localStorage,
    locale,
    maxHistoryLength,
  });

  const queryLocations = (input: string): Promise<LocationCompactInterface[]> => {
    if (!input) {
      return Promise.resolve(multiLocationSelectorGetHistory(localStorage, locale));
    }

    return LocationService.search(input, maxSearchResults);
  };

  return (
    <MultiSelectionAutocompleteComponent
      className={className}
      value={locations}
      getTitle={(location): string => {
        const text = `${location.abbreviation ? `${location.abbreviation} - ` : ''}${location.name}`;
        const description = location.path_name;

        return `${text}${description ? ` (${description})` : ''}`;
      }}
      getChipTitle={(location): string =>
        `${location.abbreviation ? `${location.abbreviation} - ` : ''}${location.name}`
      }
      placeholder={t('multi-location-selector/placeholder')}
      onInputChange={queryLocations}
      onInputValueChange={setInputValue}
      onFocus={queryLocations}
      onAddItem={onAddItem}
      onItemRemove={(location): void => onChange(locations.filter((l) => location.id !== l.id))}
      onItemGroupRemoveClick={(): void => onChange(locations.slice(0, 1))}
      renderNoSuggestions={(inputValue): JSX.Element => renderNoSuggestions(t, inputValue)}
      suggestionIcon={
        inputValue ? (
          <IconThinMapPinTemplate class={styles.suggestion_icon} />
        ) : (
          <IconThinTimeTemplate class={styles.suggestion_icon} />
        )
      }
    />
  );
};
