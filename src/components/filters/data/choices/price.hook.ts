import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { configPriceChoicesDefinition } from 'config/price-choices/definition';
import { ConfigPriceChoicesInterface } from 'config/price-choices/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { categoryIdIsSale } from 'helpers/category-id/is-sale';
import { numberFormat } from 'helpers/number/format';
import { useTranslation } from 'helpers/translation/hook';

const cache: Record<string, FiltersValueFieldChoiceInterface<number | null>[]> = {};
const makeKey = (categoryId: FiltersCategoryIdEnum, pricePeriod: FiltersValueFieldPricePeriodType | void): string =>
  `${categoryId}-${pricePeriod}`;

const usePriceChoices = (
  categoryId: FiltersCategoryIdEnum,
  pricePeriod: FiltersValueFieldPricePeriodType | void
): FiltersValueFieldChoiceInterface<number | null>[] => {
  const { t } = useTranslation();

  if (cache[makeKey(categoryId, pricePeriod)]) {
    return cache[makeKey(categoryId, pricePeriod)];
  }

  const choices: FiltersValueFieldChoiceInterface<number | null>[] = [{ value: null, label: t('any'), slug: [] }];

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
    choices.push({ value: current, label: numberFormat(current), slug: [current.toString()] });
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
    choices.push({ value: config.max, label: numberFormat(config.max), slug: [config.max.toString()] });
  }

  cache[makeKey(categoryId, pricePeriod)] = choices;
  return choices;
};

// TODO-FE[CX-411] Add tests
export const useFiltersDataChoicesPrice = (
  value: FiltersValueInterface
): FiltersValueFieldChoiceInterface<number | null>[] => {
  return usePriceChoices(value[FiltersParametersEnum.categoryId], value[FiltersParametersEnum.pricePeriod]);
};
