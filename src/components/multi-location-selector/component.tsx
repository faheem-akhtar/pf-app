import { useContext, useState } from 'react';

import { TFunction, useTranslation } from 'next-i18next';

import { helpersIsClient } from 'helpers/is-client';
import { LocationService } from 'components/location/service';
import { multiLocationSelectorGetHistory } from './get-history';
import { multiLocationSelectorMakeOnAddLocation } from './make-on-add-location';
import { useConstructorHook } from 'helpers/hook/constructor.hook';

import { IconLocationTemplate } from '../icon/location-template';
import { IconTimeTemplate } from '../icon/time-template';
import { LocationCompactInterface } from 'components/location/compact.interface';
import { MultiLocationSelectorComponentPropsInterface } from './component-props.interface';
import { MultiSelectionAutocompleteComponent } from 'library/multi-selection-autocomplete/component';
import { WindowContext } from 'helpers/window/context';

import styles from './multi-location-selector.module.scss';

const renderNoSuggestions = (t: TFunction, inputValue: string): JSX.Element => (
  <span
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: t('multi-location-selector-no-suggestions').replace('{inputValue}', inputValue),
    }}
  />
);

export const MultiLocationSelectorComponent = ({
  locale,
  onChange,
  value: locations,
  maxHistoryLength = 8,
  maxSearchResults = 8,
}: MultiLocationSelectorComponentPropsInterface): JSX.Element => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  useConstructorHook(() => {
    if (helpersIsClient) {
      LocationService.init(locale);
    }
  });

  const { localStorage } = useContext(WindowContext);

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
      value={locations}
      getTitle={(location): string => {
        const text = `${location.abbreviation ? `${location.abbreviation} - ` : ''}${location.name}`;
        const description = location.path_name;

        return `${text}${description ? ` (${description})` : ''}`;
      }}
      getChipTitle={(location): string =>
        `${location.abbreviation ? `${location.abbreviation} - ` : ''}${location.name}`
      }
      placeholder={t('City, community or building')}
      onInputChange={queryLocations}
      onInputValueChange={setInputValue}
      onFocus={queryLocations}
      onAddItem={onAddItem}
      onItemRemove={(location): void => onChange(locations.filter((l) => location.id !== l.id))}
      onItemGroupRemoveClick={(): void => onChange(locations.slice(0, 1))}
      renderNoSuggestions={(inputValue): JSX.Element => renderNoSuggestions(t, inputValue)}
      suggestionIcon={
        inputValue ? (
          <IconLocationTemplate class={styles.suggestion_icon} />
        ) : (
          <IconTimeTemplate class={styles.suggestion_icon} />
        )
      }
    />
  );
};
