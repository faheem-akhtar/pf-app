import { BackendApiFormSettingJsonApiResultType } from './json-api-result.type';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryId } from 'components/filters/value/field/category-id';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { FiltersValueFieldPropertyTypeId } from 'components/filters/value/field/property-type-id';
import { FiltersValueInterface } from 'components/filters/value/interface';

import { backendFiltersValueDefault } from 'backend/filters-value/default';
import { filtersDataMakeChoicesIndexesKey } from 'components/filters/data/make-choices-indexes-key';
import { filtersDataMakeInitialStateKey } from 'components/filters/data/make-initial-state-key';

const FilterFormSettingsParametersMapping: Record<string, Array<string>> = {
  query: [FiltersParametersEnum.query], // TODO-FE[] remove query from backend response and here
  keyword: [FiltersParametersEnum.keyword],
  bedroom: [FiltersParametersEnum.minBedroom, FiltersParametersEnum.maxBedroom],
  bathroom: [FiltersParametersEnum.minBathroom, FiltersParametersEnum.maxBathroom],
  price: [FiltersParametersEnum.minPrice, FiltersParametersEnum.maxPrice],
  area: [FiltersParametersEnum.minArea, FiltersParametersEnum.maxArea],
  amenity: [FiltersParametersEnum.amenities],
  'completion-status': [FiltersParametersEnum.completionStatus],
  'payment-method': [FiltersParametersEnum.paymentMethod],
  'utilities-price-type': [FiltersParametersEnum.utilitiesPriceType],
  'virtual-viewing': [FiltersParametersEnum.virtualViewings],
  'order-by': [FiltersParametersEnum.sort],
  furnishing: [FiltersParametersEnum.furnishing],
  'price-type': [FiltersParametersEnum.pricePeriod],
  'property-type': [FiltersParametersEnum.propertyTypeId],
  category_id: [FiltersParametersEnum.categoryId],
  location_ids: [FiltersParametersEnum.locationsIds],
};

/**
 * On filter settings validate
 */
const validateSettings = (
  settings: { jsonApiRelationships: string[]; jsonApiType: string; value: string; name: string }[],
  params: Record<string, { value: string }>
): Record<string, { value: string; choices: { label: string; value: string }[] }> => {
  // Clear list of filters to clean
  const fieldsToReset: Array<string> = [];

  const result = {
    ...extractParams(settings, params, fieldsToReset),
  };

  return filterInvalidParams(result, fieldsToReset);
};

/**
 * Filter out params that are invilid for current state of params
 */
const filterInvalidParams = (
  params: Record<string, { value: string }>,
  toRemove: Array<string>
): Record<string, { value: string; choices: { label: string; value: string }[] }> => {
  const validationParams = { ...params };

  // Remove price period if sale category is selected
  if (
    ([FiltersCategoryIdEnum.residentialForSale, FiltersCategoryIdEnum.commercialForSale] as Array<string>).includes(
      params[FiltersParametersEnum.categoryId]?.value
    )
  ) {
    delete validationParams[FiltersParametersEnum.pricePeriod];
  }

  toRemove.map((key) => {
    if (validationParams?.[key]) {
      delete validationParams[key];
    }
  });

  return validationParams as Record<string, { value: string; choices: { label: string; value: string }[] }>;
};

/**
 * Recursive parsing of filter settings object in order to extract the
 * filter params based on params what user selected.
 *
 * Filter settings represents the tree structure of JsonApiModel, so in order
 * to understand whether we need to go deeper in the tree we use jsonApiRelationships
 * that represents the list of depended on current category settings.
 * In order to extract static fields we need to check 'fields' object.
 */
const extractParams = (
  settings: { jsonApiRelationships: string[]; jsonApiType: string; value: string; name: string }[],
  params: Record<string, { value: string }>,
  fieldsToReset: Array<string>
): Record<string, { value: string }> => {
  const firstLevelFilters = toFilterParams(settings);

  // Select active filter or default
  let selectedSetting = settings.find((setting) => {
    const filterName = FilterFormSettingsParametersMapping[setting.jsonApiType];

    // find from the passed params
    return (
      String(setting.value) === String(params[filterName?.[0]]?.value) ||
      // or find it from the value that just set (default value)
      String(setting.value) === String(firstLevelFilters[filterName?.[0]]?.value)
    );
  });

  if (!selectedSetting && settings.length === 1) {
    // for price type sale we have to parse the relationships to get the price.
    selectedSetting = settings[0];
  }

  const relationships = selectedSetting
    ? selectedSetting.jsonApiRelationships.filter((relationship) => {
        if ((selectedSetting as unknown as Record<string, string>)[relationship]?.[0]) {
          return true;
        }

        // Create the list of filters that is present in default list but
        // should be removed from final result
        fieldsToReset.push(...FilterFormSettingsParametersMapping[relationship]);
        return;
      })
    : [];

  const filtersFromRelationship = relationships.reduce((acc, relationship) => {
    const filters = extractParams(
      (
        selectedSetting as unknown as Record<
          string,
          { jsonApiRelationships: string[]; jsonApiType: string; value: string; name: string }[]
        >
      )[relationship],
      params,
      fieldsToReset
    );

    return {
      ...acc,
      ...filters,
    };
  }, {});

  const extraFilters = toFilterValue((selectedSetting as unknown as { fields?: { id: string }[] })?.fields, params);

  return {
    ...firstLevelFilters,
    ...filtersFromRelationship,
    ...extraFilters,
  };
};

/**
 * Adapt to filter params interface
 * Ex. Convert price filter to MinPrice and MaxPrice.
 */
const toFilterParams = (
  settingsList: { jsonApiType: string; value: string; name: string }[]
): Record<string, { value: string; choices: { value: string; label: string | null }[] | null }> => {
  const settings = Array.isArray(settingsList) ? settingsList : [settingsList];

  // Determine filter name
  const filterName = settings[0].jsonApiType;

  // Create filter value choices
  const choices = Array.isArray(settingsList)
    ? settings.map((setting) => ({
        value: String(setting.value),
        label: setting.name || null,
      }))
    : null;

  // If this filter is a range filter
  if (FilterFormSettingsParametersMapping[filterName].length > 1) {
    // Convert to range filter (min. max.)
    return {
      [FilterFormSettingsParametersMapping[filterName][0]]: {
        value: '',
        choices,
      },
      [FilterFormSettingsParametersMapping[filterName][1]]: {
        value: '',
        choices,
      },
    };
  }

  return {
    [FilterFormSettingsParametersMapping[filterName][0]]: {
      value: '',
      ...(Array.isArray(settingsList) && { choices }),
    },
  } as Record<string, { value: string; choices: { value: string; label: string | null }[] | null }>;
};

const choiceAny = {
  value: '',
  label: 'Any',
};

const filterTypesToAddAnyOption: Array<
  | FiltersParametersEnum.propertyTypeId
  | FiltersParametersEnum.virtualViewings
  | FiltersParametersEnum.minBedroom
  | FiltersParametersEnum.maxBedroom
  | FiltersParametersEnum.minBathroom
  | FiltersParametersEnum.maxBathroom
  | FiltersParametersEnum.minArea
  | FiltersParametersEnum.maxArea
  | FiltersParametersEnum.furnishing
  | FiltersParametersEnum.completionStatus
  | FiltersParametersEnum.minPrice
  | FiltersParametersEnum.maxPrice
> = [
  FiltersParametersEnum.propertyTypeId,
  FiltersParametersEnum.virtualViewings,
  FiltersParametersEnum.minBedroom,
  FiltersParametersEnum.maxBedroom,
  FiltersParametersEnum.minBathroom,
  FiltersParametersEnum.maxBathroom,
  FiltersParametersEnum.minArea,
  FiltersParametersEnum.maxArea,
  FiltersParametersEnum.minPrice,
  FiltersParametersEnum.maxPrice,
  FiltersParametersEnum.furnishing,
  FiltersParametersEnum.completionStatus,
];

/**
 * Convert to filter params interface
 */
const toFilterValue = (
  fields: { id: string }[] | void,
  params: Record<string, { value: string }>
): Record<string, { value: string }> => {
  const defaultValues = backendFiltersValueDefault as unknown as Record<string, string>;
  return (
    fields?.reduce(
      (acc, cur) => ({
        ...acc,
        [FilterFormSettingsParametersMapping[cur.id][0]]: {
          value:
            params[FilterFormSettingsParametersMapping[cur.id][0]]?.value ||
            defaultValues[FilterFormSettingsParametersMapping[cur.id][0]],
        },
      }),
      {}
    ) || {}
  );
};

const commonInitialState: Partial<FiltersValueInterface> = {
  [FiltersParametersEnum.sort]: '',
  [FiltersParametersEnum.locationsIds]: [],
  [FiltersParametersEnum.minPrice]: '',
  [FiltersParametersEnum.maxPrice]: '',
  [FiltersParametersEnum.minArea]: '',
  [FiltersParametersEnum.maxArea]: '',
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.propertyTypeId]: '',
};

const filterTypesThatAlwaysAvailable = Object.keys(commonInitialState);

const extractAndFilterValues = (filterParams: Record<string, { value: string }>): Record<string, string> =>
  (Object.keys(filterParams) as Array<keyof FiltersValueInterface>).reduce(
    (map: Record<string, string>, filterType: keyof FiltersValueInterface) => {
      if (
        filterType !== FiltersParametersEnum.categoryId && // category is always known
        !filterTypesThatAlwaysAvailable.includes(filterType)
      ) {
        map[filterType] = (filterParams[filterType] as { value: string }).value;
      }
      return map;
    },
    {} as Record<string, string>
  );

export const backendApiFormSettingsMapper = (
  formSettings: BackendApiFormSettingJsonApiResultType
): FiltersDataInterface => {
  const allChoices: Record<FiltersParametersEnum, FiltersValueFieldChoiceInterface<string>[]> = {} as Record<
    FiltersParametersEnum,
    FiltersValueFieldChoiceInterface<string>[]
  >;

  const choicesIndexes: Record<string, number[]> = {};
  const initialStateByCategoryMap: Record<string, FiltersValueInterface> = {} as Record<string, FiltersValueInterface>;
  const initialStateByCategoryAndPropertyTypeMap: Record<string, FiltersValueInterface> = {} as Record<
    string,
    FiltersValueInterface
  >;

  [
    FiltersCategoryIdEnum.residentialForSale,
    FiltersCategoryIdEnum.residentialForRent,
    FiltersCategoryIdEnum.commercialForSale,
    FiltersCategoryIdEnum.commercialForRent,
  ].forEach((categoryId) => {
    const initialFilterParamsForCategory = validateSettings(formSettings, {
      [FiltersParametersEnum.categoryId]: {
        value: categoryId,
      },
    });

    filterTypesToAddAnyOption.forEach((filterType) => {
      initialFilterParamsForCategory[filterType]?.choices.unshift(choiceAny);
    });

    const propertyType = initialFilterParamsForCategory[FiltersParametersEnum.propertyTypeId];
    if (propertyType) {
      propertyType.value = propertyType.choices[0].value;
    }

    const categoryKey = filtersDataMakeInitialStateKey({
      [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryId,
      [FiltersParametersEnum.propertyTypeId]: '',
    });
    initialStateByCategoryMap[categoryKey] = extractAndFilterValues(
      initialFilterParamsForCategory
    ) as unknown as FiltersValueInterface;
    initialStateByCategoryMap[categoryKey][FiltersParametersEnum.categoryId] =
      categoryId as FiltersValueFieldCategoryId;

    initialFilterParamsForCategory[FiltersParametersEnum.propertyTypeId]?.choices.forEach(
      ({ value: propertyTypeValue }) => {
        const initialFilterParamsForCategoryAndType = validateSettings(formSettings, {
          [FiltersParametersEnum.categoryId]: {
            value: categoryId,
          },
          [FiltersParametersEnum.propertyTypeId]: {
            value: propertyTypeValue,
          },
        });
        filterTypesToAddAnyOption.forEach((filterType) => {
          initialFilterParamsForCategoryAndType[filterType]?.choices.unshift(choiceAny);
        });

        const categoryPropertyTypeKey = filtersDataMakeInitialStateKey({
          [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryId,
          [FiltersParametersEnum.propertyTypeId]: propertyTypeValue as FiltersValueFieldPropertyTypeId,
        });
        initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey] = extractAndFilterValues(
          initialFilterParamsForCategoryAndType
        ) as unknown as FiltersValueInterface;
        initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey][FiltersParametersEnum.categoryId] =
          categoryId as FiltersValueFieldCategoryId;
        initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey][FiltersParametersEnum.propertyTypeId] =
          propertyTypeValue as FiltersValueFieldPropertyTypeId;

        // record all possible choices, and replace them with indexes
        (Object.keys(initialFilterParamsForCategoryAndType) as FiltersParametersEnum[]).forEach((filterType) => {
          if (filterType === 'query') {
            return;
          }

          if (!allChoices[filterType]) {
            allChoices[filterType] = [];
          }

          const currentChoices = initialFilterParamsForCategoryAndType[filterType].choices;

          if (!currentChoices) {
            return;
          }

          const choicesIndexesInGlobalMap = currentChoices.reduce((arr, choice) => {
            const existingChoiceIndex = allChoices[filterType].findIndex((c) => c.value === choice.value);

            let index = existingChoiceIndex;
            if (existingChoiceIndex === -1) {
              allChoices[filterType].push(choice);
              index = allChoices[filterType].length - 1;
            }

            if (!arr.includes(index)) {
              arr.push(index);
            }
            return arr;
          }, [] as number[]);

          const choicesIndexesKey = filtersDataMakeChoicesIndexesKey(
            {
              [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryId,
              [FiltersParametersEnum.propertyTypeId]: propertyTypeValue as FiltersValueFieldPropertyTypeId,
            },
            filterType
          );

          choicesIndexes[choicesIndexesKey] = choicesIndexesInGlobalMap;
        });
      }
    );
  });

  const specificInitialState = {
    ...initialStateByCategoryMap,
    ...initialStateByCategoryAndPropertyTypeMap,
  };

  return {
    initialState: Object.keys(specificInitialState).reduce((acc, key) => {
      acc[key] = { ...specificInitialState[key], ...commonInitialState };
      return acc;
    }, {} as Record<string, FiltersValueInterface>),
    allChoices,
    choicesIndexes,
  };
};
