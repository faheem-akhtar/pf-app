import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

export const filtersChoicesSortStub = (
  choices: Partial<FiltersValueFieldChoiceInterface<string>[]> = []
): FiltersValueFieldChoiceInterface<string>[] => {
  const defaultChoices: FiltersValueFieldChoiceInterface<string>[] = [
    { value: 'mr', label: 'Featured', slug: ['featured'] },
    { value: 'nd', label: 'Newest', slug: ['newest'] },
    { value: 'pa', label: 'Price (low)', slug: ['price-(low)'] },
    { value: 'pd', label: 'Price (high)', slug: ['price-(high)'] },
    { value: 'ba', label: 'Beds (least)', slug: ['beds-(least)'] },
    { value: 'bd', label: 'Beds (most)', slug: ['beds-(most)'] },
  ];

  return [...defaultChoices, ...(choices as FiltersValueFieldChoiceInterface<string>[])];
};
