import { useTranslation } from 'next-i18next';

import { categoryIdIsSale } from 'helpers/category-id/is-sale';
import { configPriceChoicesDefinition } from 'config/price-choices/definition';
import { numberFormat } from 'helpers/number/format';

import { ConfigPriceChoicesInterface } from 'config/price-choices/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { FiltersValueFieldPriceType } from 'components/filters/value/field/price-type';
import { FiltersValueInterface } from 'components/filters/value/interface';

const cache: Record<string, FiltersValueFieldChoiceInterface<number | null>[]> = {};
const makeKey = (categoryId: FiltersCategoryIdEnum, pricePeriod: FiltersValueFieldPriceType | void): string =>
  `${categoryId}-${pricePeriod}`;

const usePriceChoices = (
  categoryId: FiltersCategoryIdEnum,
  pricePeriod: FiltersValueFieldPriceType | void
): FiltersValueFieldChoiceInterface<number | null>[] => {
  const { t } = useTranslation('common');

  if (cache[makeKey(categoryId, pricePeriod)]) {
    return cache[makeKey(categoryId, pricePeriod)];
  }

  const choices: FiltersValueFieldChoiceInterface<number | null>[] = [{ value: null, label: t('Any') }];

  let config: ConfigPriceChoicesInterface | void;

  if (categoryIdIsSale(categoryId)) {
    config = configPriceChoicesDefinition.sell;
  } else {
    if (!pricePeriod) {
      // eslint-disable-next-line no-console
      console.error(`makePriceChoices(${categoryId}) had not provided price period.`);
      return choices;
    }
    config = configPriceChoicesDefinition.rent[pricePeriod as 'y' | 'm' | 'w' | 'd'];
  }

  if (!config) {
    // eslint-disable-next-line no-console
    console.error(`Price config not found for (${categoryId}, ${pricePeriod})`);
    return choices;
  }

  let current = config.min;
  let iteration = 0;
  let step = config.increments[0];

  while (current <= config.max) {
    choices.push({ value: current, label: numberFormat(current) });
    if (current >= config.max) {
      break;
    }

    iteration++;
    current += step;
    if (config.increments[iteration]) {
      step = config.increments[iteration];
    }
  }

  if (current !== config.max) {
    choices.push({ value: config.max, label: numberFormat(config.max) });
  }

  cache[makeKey(categoryId, pricePeriod)] = choices;
  return choices;
};

export const useFiltersDataPriceChoices = (
  value: FiltersValueInterface
): FiltersValueFieldChoiceInterface<number | null>[] => {
  return usePriceChoices(value[FiltersParametersEnum.categoryId], value[FiltersParametersEnum.pricePeriod]);
};
