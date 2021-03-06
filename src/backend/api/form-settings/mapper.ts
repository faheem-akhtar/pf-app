import { backendFiltersValueDefault } from 'backend/filters/value/default';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { filtersDataMakeChoicesIndexesKey } from 'components/filters/data/make-choices-indexes-key';
import { filtersDataMakeInitialStateKey } from 'components/filters/data/make-initial-state-key';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { FiltersValueFieldPropertyTypeIdType } from 'components/filters/value/field/property-type-id.type';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { stringSlugify } from 'helpers/string/slugify';

import { BackendApiFormSettingsJsonApiResultType } from './json-api-result.type';
import { BackendApiFormSettingsSettingType } from './setting.type';

let translate: Record<string, string>;

const FilterFormSettingsHelpersMapping: Record<string, Array<string>> = {
  'type-setting': ['propertyTypeSlug'],
};

const helperFilterParams = Object.values(FilterFormSettingsHelpersMapping).reduce((acc, item) => {
  acc.push(...item);
  return acc;
}, []);

const FilterFormSettingsParametersMapping: Record<string, Array<string>> = {
  query: [FiltersParametersEnum.query],
  keyword: [FiltersParametersEnum.keyword],
  bedroom: [FiltersParametersEnum.bedrooms],
  bathroom: [FiltersParametersEnum.bathrooms],
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
  is_developer_property: [FiltersParametersEnum.isDeveloperProperty],
  'installment-years': [FiltersParametersEnum.minInstallmentYears, FiltersParametersEnum.maxInstallmentYears],
  ...FilterFormSettingsHelpersMapping,
};

type SettingsType = BackendApiFormSettingsSettingType[];

type ValidateSettingsResultType = Record<
  string,
  {
    value: string | string[] | number | null;
    choices: { label: string; value: string | number | null; slug: string[] }[];
  }
>;

type ParamsType = Record<string, { value: string | string[] | number | null }>;

type FilterParamsChoice = Omit<FiltersValueFieldChoiceInterface<string>, 'label'> & { label: string | null };

type FilterParamsReturnType = Record<string, { value: string; choices: FilterParamsChoice[] | null }>;

/**
 * On filter settings validate
 */
const validateSettings = (settings: SettingsType, params: ParamsType): ValidateSettingsResultType => {
  // Clear list of filters to clean
  const fieldsToReset: Array<string> = [];

  const result = {
    ...extractParams(settings, params, fieldsToReset),
  };

  return filterInvalidParams(result, fieldsToReset, params);
};

/**
 * This fields choices are read directly from the bundle
 */
const directChoicesHandlingFields = [FiltersParametersEnum.minPrice, [FiltersParametersEnum.maxPrice]];

/**
 * Filter out params that are invilid for current state of params
 */
const filterInvalidParams = (
  params: ParamsType,
  toRemove: Array<string>,
  inputParams: ParamsType
): ValidateSettingsResultType => {
  const validationParams = { ...params };

  // Remove price period if sale category is selected
  if (
    ([FiltersCategoryIdEnum.residentialForSale, FiltersCategoryIdEnum.commercialForSale] as Array<string>).includes(
      inputParams[FiltersParametersEnum.categoryId]?.value as string
    )
  ) {
    delete validationParams[FiltersParametersEnum.pricePeriod];
  }

  directChoicesHandlingFields.forEach((field) => {
    delete validationParams[field as FiltersParametersEnum];
  });

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
 * Filter settings represents the tree structure of BackendJsonApiModelType, so in order
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

        if (FilterFormSettingsParametersMapping[relationship]) {
          // Create the list of filters that is present in default list but
          // should be removed from final result
          fieldsToReset.push(...FilterFormSettingsParametersMapping[relationship]);
        }

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
  settingsList: { jsonApiType: string; value: string; name: string; id: string }[]
): FilterParamsReturnType => {
  const settings = Array.isArray(settingsList) ? settingsList : [settingsList];

  // Determine filter name
  const filterName = settings[0].jsonApiType;
  const filter = FilterFormSettingsParametersMapping[filterName];

  if (!filter) {
    return {};
  }

  // Create filter value choices
  const choices = Array.isArray(settingsList)
    ? settings.map((setting) => {
        const translation = JSON.parse(translate[`router/url_${filterName}_${setting.value}`] || 'null') as string[];
        // First try to get it from the translation or generate it yourself
        const slug = translation || (setting.name ? [stringSlugify(setting.name)] : []) || [];
        // type-setting have multiple values for slug coming from the api
        return filterName === 'type-setting'
          ? {
              value: setting.id,
              label: setting.name || null,
              slug: [setting.name, setting.value],
            }
          : {
              value: String(setting.value),
              label: setting.name || null,
              slug,
            };
      })
    : null;

  // If this filter is a range filter
  if (filter.length > 1) {
    // Convert to range filter (min. max.)
    return {
      [filter[0]]: {
        value: '',
        choices,
      },
      [filter[1]]: {
        value: '',
        choices,
      },
    };
  }

  return {
    [filter[0]]: {
      value: '',
      choices,
    },
  } as FilterParamsReturnType;
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

// TODO-FE[] read it directly
const commonInitialState: Partial<FiltersValueInterface> = {
  [FiltersParametersEnum.pageNumber]: 1,
  [FiltersParametersEnum.sort]: 'mr' as FiltersValueFieldSortType,
  [FiltersParametersEnum.locationsIds]: [],
  [FiltersParametersEnum.minPrice]: null,
  [FiltersParametersEnum.maxPrice]: null,
  [FiltersParametersEnum.minArea]: null,
  [FiltersParametersEnum.maxArea]: null,
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.propertyTypeId]: '',
};

const filterTypesThatAlwaysAvailable = Object.keys(commonInitialState);

const extractAndFilterValues = (filterParams: ParamsType): FiltersValueInterface =>
  (Object.keys(filterParams) as Array<keyof FiltersValueInterface>).reduce(
    (map: FiltersValueInterface & Record<string, string>, filterType: keyof FiltersValueInterface) => {
      // Exclude the helper filters
      if (helperFilterParams.includes(filterType)) {
        return map;
      }
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

type AllChoicesType = Record<FiltersParametersEnum, FiltersValueFieldChoiceInterface<string | number>[]>;
type ChoicesIndexesType = Record<string, number[]>;
type InitialStateMap = Record<string, FiltersValueInterface>;

const cleanUp = (value: ValidateSettingsResultType): void => {
  delete value[FiltersParametersEnum.query];
  if (value[FiltersParametersEnum.amenities]?.value === '') {
    value[FiltersParametersEnum.amenities].value = [];
  }
  if (value[FiltersParametersEnum.bedrooms]?.value === '') {
    value[FiltersParametersEnum.bedrooms].value = [];
  }
  if (value[FiltersParametersEnum.bathrooms]?.value === '') {
    value[FiltersParametersEnum.bathrooms].value = [];
  }
  if (value[FiltersParametersEnum.minArea]?.value === '') {
    value[FiltersParametersEnum.minArea].value = null;
  }
  if (value[FiltersParametersEnum.maxArea]?.value === '') {
    value[FiltersParametersEnum.maxArea].value = null;
  }
  if (value[FiltersParametersEnum.minInstallmentYears]?.value === '') {
    value[FiltersParametersEnum.minInstallmentYears].value = null;
  }
  if (value[FiltersParametersEnum.maxInstallmentYears]?.value === '') {
    value[FiltersParametersEnum.maxInstallmentYears].value = null;
  }
  value[FiltersParametersEnum.minArea]?.choices.forEach((choice) => {
    choice.value = Number(choice.value);
  });
  value[FiltersParametersEnum.maxArea]?.choices.forEach((choice) => {
    choice.value = Number(choice.value);
  });
  value[FiltersParametersEnum.minInstallmentYears]?.choices.forEach((choice) => {
    choice.value = Number(choice.value);
  });
  value[FiltersParametersEnum.maxInstallmentYears]?.choices.forEach((choice) => {
    choice.value = Number(choice.value);
  });
};

const addAnyChoice = (initialFilterParams: ValidateSettingsResultType): void => {
  const choiceAnyNumber = {
    value: null,
    label: '',
    slug: [],
  };
  const choiceAny = {
    value: '',
    label: '',
    slug: [],
  };

  const filterTypesToAddAnyNumberOption: Array<
    | FiltersParametersEnum.minArea
    | FiltersParametersEnum.maxArea
    | FiltersParametersEnum.minPrice
    | FiltersParametersEnum.maxPrice
    | FiltersParametersEnum.minInstallmentYears
    | FiltersParametersEnum.maxInstallmentYears
  > = [
    FiltersParametersEnum.minArea,
    FiltersParametersEnum.maxArea,
    FiltersParametersEnum.minPrice,
    FiltersParametersEnum.maxPrice,
    FiltersParametersEnum.minInstallmentYears,
    FiltersParametersEnum.maxInstallmentYears,
  ];

  const filterTypesToAddAnyOption: Array<
    | FiltersParametersEnum.propertyTypeId
    | FiltersParametersEnum.virtualViewings
    | FiltersParametersEnum.completionStatus
    | FiltersParametersEnum.paymentMethod
    | FiltersParametersEnum.utilitiesPriceType
  > = [
    FiltersParametersEnum.propertyTypeId,
    FiltersParametersEnum.virtualViewings,
    FiltersParametersEnum.completionStatus,
    FiltersParametersEnum.paymentMethod,
    FiltersParametersEnum.utilitiesPriceType,
  ];

  filterTypesToAddAnyOption.forEach((filterType) => {
    if (!initialFilterParams[filterType]?.choices.find((c) => c.value === choiceAny.value)) {
      initialFilterParams[filterType]?.choices.unshift(choiceAny);
    }
  });

  filterTypesToAddAnyNumberOption.forEach((filterType) => {
    if (!initialFilterParams[filterType]?.choices.find((c) => c.value === choiceAnyNumber.value)) {
      initialFilterParams[filterType]?.choices.unshift(choiceAnyNumber);
    }
  });
};

/**
 * Fill up the choices and initial states for each category and property type
 */
const makePropertyTypeProcessor =
  (
    categoryId: FiltersCategoryIdEnum,
    formSettings: BackendApiFormSettingsJsonApiResultType,
    allChoices: AllChoicesType,
    choicesIndexes: ChoicesIndexesType,
    initialStateByCategoryAndPropertyTypeMap: InitialStateMap
  ) =>
  (propertyTypeValue: FiltersValueFieldPropertyTypeIdType): void => {
    const initialFilterParamsForCategoryAndType = validateSettings(formSettings as SettingsType, {
      [FiltersParametersEnum.categoryId]: { value: categoryId },
      [FiltersParametersEnum.propertyTypeId]: { value: propertyTypeValue },
    });

    cleanUp(initialFilterParamsForCategoryAndType);
    addAnyChoice(initialFilterParamsForCategoryAndType);

    // Fix initial value if it is empty, but there are choices available
    Object.keys(initialFilterParamsForCategoryAndType).forEach((paramKey) => {
      if (
        initialFilterParamsForCategoryAndType[paramKey].value === '' &&
        initialFilterParamsForCategoryAndType[paramKey]?.choices?.length
      ) {
        initialFilterParamsForCategoryAndType[paramKey].value =
          initialFilterParamsForCategoryAndType[paramKey].choices[0].value;
      }
    });

    const categoryPropertyTypeKey = filtersDataMakeInitialStateKey({
      [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryIdType,
      [FiltersParametersEnum.propertyTypeId]: propertyTypeValue,
    });
    initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey] = extractAndFilterValues(
      initialFilterParamsForCategoryAndType
    );

    initialStateByCategoryAndPropertyTypeMap[categoryPropertyTypeKey][FiltersParametersEnum.categoryId] =
      categoryId as FiltersValueFieldCategoryIdType;
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
          allChoices[filterType].push(choice as FiltersValueFieldChoiceInterface<string | number>);
          index = allChoices[filterType].length - 1;
        }

        if (!arr.includes(index)) {
          arr.push(index);
        }
        return arr;
      }, [] as number[]);

      // Exclude the helper filters from the choices indexing
      if (helperFilterParams.includes(filterType)) {
        return;
      }

      const choicesIndexesKey = filtersDataMakeChoicesIndexesKey(
        {
          [FiltersParametersEnum.categoryId]: categoryId as FiltersValueFieldCategoryIdType,
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
    formSettings: BackendApiFormSettingsJsonApiResultType,
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

    const processPropertyType = makePropertyTypeProcessor(
      categoryId,
      formSettings,
      allChoices,
      choicesIndexes,
      initialStateByCategoryAndPropertyTypeMap
    );

    initialFilterParamsForCategory[FiltersParametersEnum.propertyTypeId]?.choices
      .map((choice) => choice.value as FiltersValueFieldPropertyTypeIdType)
      .forEach(processPropertyType);
  };

// TODO-FE[CX-409] add tests
/**
 * Map form settings into FiltersDataInterface
 */
export const backendApiFormSettingsMapper =
  (localeTranslation: Record<string, Record<string, string>>) =>
  (formSettings: BackendApiFormSettingsJsonApiResultType): FiltersDataInterface => {
    const allChoices: AllChoicesType = {} as AllChoicesType;
    const choicesIndexes: ChoicesIndexesType = {};
    const specificInitialState: InitialStateMap = {} as Record<string, FiltersValueInterface>;

    translate = localeTranslation?.['common'] || {};

    const processCategory = makeCategoryProcessor(formSettings, allChoices, choicesIndexes, specificInitialState);

    // Traverse each category to fill up the choices and initial states
    Object.values(FiltersCategoryIdEnum).forEach(processCategory);

    return {
      initialState: Object.keys(specificInitialState).reduce((acc, key) => {
        acc[key] = { ...specificInitialState[key], ...commonInitialState };
        return acc;
      }, {} as InitialStateMap),
      allChoices,
      choicesIndexes,
    };
  };
