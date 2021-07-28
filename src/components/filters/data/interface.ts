import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldChoiceInterface } from '../value/field/choice.interface';
import { FiltersValueInterface } from '../value/interface';

export interface FiltersDataInterface {
  /**
   * Data to identify
   * - Filters that are enabled for each combination of Category + Property type
   * - Initial values for the filters to use in case of chaning of the Category / Property type
   * Values specific to the selection of
   * - category (key: categoryId)
   * - category + property type (key: `${categoryId}-${propertyTypeId}`)
   *
   */
  initialState: Record<string, Partial<FiltersValueInterface>>;
  /**
   * All possible choices for a given filter type
   */
  allChoices: Record<FiltersParametersEnum, FiltersValueFieldChoiceInterface<string>[]>;
  /**
   * Choices indexes map for category and property type with respect to all choices map
   * key: `${categoryId}-${propertyTypeId}-${filterType}`
   */
  choicesIndexes: Record<string, number[]>;
}
