import { BackendApiFormSettingJsonApiResultType } from './json-api-result.type';
import { BackendApiFormSettingsSettingType } from './setting.type';
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
  query: [FiltersParametersEnum.query],
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

type SettingsType = BackendApiFormSettingsSettingType[];

type ValidateSettingsResultType = Record<string, { value: string; choices: { label: string; value: string }[] }>;

type ParamsType = Record<string, { value: string }>;

/**
 * On filter settings validate
 */
const validateSettings = (settings: SettingsType, params: ParamsType): ValidateSettingsResultType => {
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
const filterInvalidParams = (params: ParamsType, toRemove: Array<string>): ValidateSettingsResultType => {
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

  return validationParams as ValidateSettingsResultType;
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
const extractParams = (settings: SettingsType, params: ParamsType, fieldsToReset: Array<string>): ParamsType => {
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
        if ((selectedSetting as Record<string, string>)[relationship]?.[0]) {
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
      (selectedSetting as Record<string, BackendApiFormSettingsSettingType[]>)[relationship],
      params,
      fieldsToReset
    );

    return {
      ...acc,
      ...filters,
    };
  }, {});

  const extraFilters = toFilterValue(selectedSetting?.fields, params);

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

/**
 * Convert to filter params interface
 */
const toFilterValue = (fields: { id: string }[] | void, params: ParamsType): ParamsType => {
  const defaultValues = backendFiltersValueDefault;
  return (
    fields?.reduce(
      (acc, cur) => ({
        ...acc,
        [FilterFormSettingsParametersMapping[cur.id][0]]: {
          value:
            params[FilterFormSettingsParametersMapping[cur.id][0]]?.value ||
            defaultValues[FilterFormSettingsParametersMapping[cur.id][0] as keyof FiltersValueInterface],
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

const extractAndFilterValues = (filterParams: ParamsType): FiltersValueInterface =>
  (Object.keys(filterParams) as Array<keyof FiltersValueInterface>).reduce(
    (map: FiltersValueInterface & Record<string, string>, filterType: keyof FiltersValueInterface) => {
      if (
        filterType !== FiltersParametersEnum.categoryId && // category is always known
        !filterTypesThatAlwaysAvailable.includes(filterType)
      ) {
        (map as Record<string, string>)[filterType] = (filterParams[filterType] as { value: string }).value;
      }
      return map;
    },
    {} as FiltersValueInterface & Record<string, string>
  );

type AllChoicesType = Record<FiltersParametersEnum, FiltersValueFieldChoiceInterface<string>[]>;
type ChoicesIndexesType = Record<string, number[]>;
type InitialStateMap = Record<string, FiltersValueInterface>;

const addAnyChoice = (initialFilterParams: ValidateSettingsResultType): void => {
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

  filterTypesToAddAnyOption.forEach((filterType) => {
    initialFilterParams[filterType]?.choices.unshift(choiceAny);
  });
};

/**
 * Fill up the choices and initial states for each category and property type
 */
const makePropertyTypeProcessor =
  (
    categoryId: FiltersCategoryIdEnum,
    formSettings: BackendApiFormSettingJsonApiResultType,
    allChoices: AllChoicesType,
    choicesIndexes: ChoicesIndexesType,
    initialStateByCategoryAndPropertyTypeMap: InitialStateMap
  ) =>
  (propertyTypeValue: FiltersValueFieldPropertyTypeId): void => {
    const initialFilterParamsForCategoryAndType = validateSettings(formSettings as SettingsType, {
      [FiltersParametersEnum.categoryId]: { value: categoryId },
      [FiltersParametersEnum.propertyTypeId]: { value: propertyTypeValue },
    });

    addAnyChoice(initialFilterParamsForCategoryAndType);

    const categoryPropertyTypeKey = filtersDataMakeInitialStateKey({
      [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryId,
      [FiltersParametersEnum.propertyTypeId]: propertyTypeValue,
    });
    initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey] = extractAndFilterValues(
      initialFilterParamsForCategoryAndType
    );
    initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey][FiltersParametersEnum.categoryId] =
      categoryId as FiltersValueFieldCategoryId;
    initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey][FiltersParametersEnum.propertyTypeId] =
      propertyTypeValue;

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
          [FiltersParametersEnum.propertyTypeId]: propertyTypeValue,
        },
        filterType
      );

      choicesIndexes[choicesIndexesKey] = choicesIndexesInGlobalMap;
    });
  };

/**
 * Fill up the choices and initial states for each category
 */
const makeCategoryProcessor =
  (
    formSettings: BackendApiFormSettingJsonApiResultType,
    initialStateByCategoryMap: InitialStateMap,

    allChoices: AllChoicesType,
    choicesIndexes: ChoicesIndexesType,
    initialStateByCategoryAndPropertyTypeMap: InitialStateMap
  ) =>
  (categoryId: FiltersCategoryIdEnum): void => {
    const initialFilterParamsForCategory = validateSettings(formSettings as SettingsType, {
      [FiltersParametersEnum.categoryId]: {
        value: categoryId,
      },
    });

    addAnyChoice(initialFilterParamsForCategory);

    // Fix the default type for the category to be the first type
    const propertyType = initialFilterParamsForCategory[FiltersParametersEnum.propertyTypeId];
    propertyType.value = propertyType.choices[0].value;

    const categoryKey = filtersDataMakeInitialStateKey({
      [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryId,
      [FiltersParametersEnum.propertyTypeId]: '',
    });

    initialStateByCategoryMap[categoryKey] = extractAndFilterValues(initialFilterParamsForCategory);
    initialStateByCategoryMap[categoryKey][FiltersParametersEnum.categoryId] =
      categoryId as FiltersValueFieldCategoryId;

    const processPropertyType = makePropertyTypeProcessor(
      categoryId,
      formSettings,
      allChoices,
      choicesIndexes,
      initialStateByCategoryAndPropertyTypeMap
    );

    initialFilterParamsForCategory[FiltersParametersEnum.propertyTypeId]?.choices
      .map((choice) => choice.value as FiltersValueFieldPropertyTypeId)
      .forEach(processPropertyType);
  };

/**
 * Map form settings into FiltersDataInterface
 */
export const backendApiFormSettingsMapper = (
  formSettings: BackendApiFormSettingJsonApiResultType
): FiltersDataInterface => {
  const allChoices: AllChoicesType = {} as AllChoicesType;
  const choicesIndexes: ChoicesIndexesType = {};
  const initialStateByCategoryMap: InitialStateMap = {} as InitialStateMap;
  const initialStateByCategoryAndPropertyTypeMap: InitialStateMap = {} as Record<string, FiltersValueInterface>;

  const processCategory = makeCategoryProcessor(
    formSettings,
    initialStateByCategoryMap,
    allChoices,
    choicesIndexes,
    initialStateByCategoryAndPropertyTypeMap
  );

  // Traverse each category to fill up the choices and initial states
  [
    FiltersCategoryIdEnum.residentialForSale,
    FiltersCategoryIdEnum.residentialForRent,
    FiltersCategoryIdEnum.commercialForSale,
    FiltersCategoryIdEnum.commercialForRent,
  ].forEach(processCategory);

  const specificInitialState = {
    ...initialStateByCategoryMap,
    ...initialStateByCategoryAndPropertyTypeMap,
  };

  return {
    initialState: Object.keys(specificInitialState).reduce((acc, key) => {
      acc[key] = { ...specificInitialState[key], ...commonInitialState };
      return acc;
    }, {} as InitialStateMap),
    allChoices,
    choicesIndexes,
  };
};
