import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

export const filtersChoicesSortStub = (
  choices: Partial<FiltersValueFieldChoiceInterface<string>[]> = []
): FiltersValueFieldChoiceInterface<string>[] => {
  const defaultChoices: FiltersValueFieldChoiceInterface<string>[] = [
    { value: 'mr', label: 'Featured' },
    { value: 'nd', label: 'Newest' },
    { value: 'pa', label: 'Price (low)' },
    { value: 'pd', label: 'Price (high)' },
    { value: 'ba', label: 'Beds (least)' },
    { value: 'bd', label: 'Beds (most)' },
  ];

  return [...defaultChoices, ...(choices as FiltersValueFieldChoiceInterface<string>[])];
};
