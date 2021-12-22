import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { configCommon } from 'config/common';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import filtersDataByLocale from '../../../public/static/filters-data';

const allChoices: Record<string, FiltersDataInterface['allChoices']> = {
  [configCommon.language.current]: (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[
    configCommon.language.current
  ].allChoices as unknown as FiltersDataInterface['allChoices'],
  [configCommon.language.alternative]: (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[
    configCommon.language.alternative
  ].allChoices as unknown as FiltersDataInterface['allChoices'],
};

/**
 * Find a choice base on locale and param
 * @param locale 'en', 'ar'
 * @param param The filter param enum
 * @param slugOrPredicate Slug or a predicate function
 */
export function backendFiltersFindChoice(
  locale: string,
  param: FiltersParametersEnum,
  slugOrPredicate: ((value: FiltersValueFieldChoiceInterface<string | number>, index: number) => boolean) | string
): FiltersValueFieldChoiceInterface<string | number> | undefined {
  return allChoices[locale][param].find(
    typeof slugOrPredicate === 'string' ? (item): boolean => item.slug.includes(slugOrPredicate) : slugOrPredicate
  );
}
