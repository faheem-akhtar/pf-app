import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { locationCompactStub } from 'stubs/location/compact.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersValueFieldFurnishedType } from '../field/furnished.type';
import { FiltersValueInterface } from '../interface';
import { useFiltersValueState } from '../state.hook';

describe('useFiltersValueState()', () => {
  beforeEach(() => {
    mockReactUseEffect();
    mockReactUseState();
  });

  it('should have initial values', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.furnishing]: '0' as FiltersValueFieldFurnishedType,
      [FiltersParametersEnum.isDeveloperProperty]: undefined,
      [FiltersParametersEnum.utilitiesPriceType]: undefined,
      [FiltersParametersEnum.completionStatus]: undefined,
      [FiltersParametersEnum.paymentMethod]: undefined,
    });
    const { filtersValue, filtersValueIsDefault } = useFiltersValueState(filtersData, filtersValueFromQuery);

    expect(filtersValue).toEqual(filtersValueFromQuery);
    expect(filtersValueIsDefault).toBeTruthy();
  });

  it('should reset the applied filters and take the initial values', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.commercialForRent,
      [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
      [FiltersParametersEnum.minArea]: 500,
      [FiltersParametersEnum.maxArea]: 1500,
    });
    const { resetFiltersValue, filtersValue, filtersValueIsDefault } = useFiltersValueState(
      filtersData,
      filtersValueFromQuery
    );
    const MockComponent = (): ReactElement => {
      return <button onClick={resetFiltersValue}>Content</button>;
    };

    const { rerender } = render(
      <FiltersContextProvider filtersData={filtersData} filtersValueFromQuery={filtersValue}>
        <MockComponent />
      </FiltersContextProvider>
    );

    expect(filtersValueIsDefault).toBeFalsy();

    const button = screen.getByRole('button');
    userEvent.click(button);

    const { filtersValue: updatedFiltersValue } = useFiltersValueState(filtersData, {
      ...filtersValue,
      [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
      [FiltersParametersEnum.minArea]: null,
      [FiltersParametersEnum.maxArea]: null,
    });

    rerender(
      <FiltersContextProvider filtersData={filtersData} filtersValueFromQuery={updatedFiltersValue}>
        <MockComponent />
      </FiltersContextProvider>
    );

    expect(updatedFiltersValue).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
        [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        [FiltersParametersEnum.minArea]: null,
        [FiltersParametersEnum.maxArea]: null,
      })
    );
  });

  it('should update the filters if the category is not changed', async () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
      [FiltersParametersEnum.minArea]: 500,
    });
    const { changeFiltersValue, filtersValue, filtersValueIsDefault } = useFiltersValueState(
      filtersData,
      filtersValueFromQuery
    );
    const MockComponent = (): ReactElement => {
      return (
        <button
          onClick={(): FiltersValueInterface =>
            changeFiltersValue({
              ...filtersValue,
              [FiltersParametersEnum.maxArea]: 1500,
            })
          }
        >
          Content
        </button>
      );
    };

    const { rerender } = render(
      <FiltersContextProvider filtersData={filtersData} filtersValueFromQuery={filtersValueFromQuery}>
        <MockComponent />
      </FiltersContextProvider>
    );

    expect(filtersValueIsDefault).toBeFalsy();

    const button = screen.getByRole('button');
    userEvent.click(button);

    const { filtersValue: updatedFiltersValue } = useFiltersValueState(filtersData, {
      ...filtersValue,
      [FiltersParametersEnum.maxArea]: 1500,
    });

    rerender(
      <FiltersContextProvider filtersData={filtersData} filtersValueFromQuery={updatedFiltersValue}>
        <MockComponent />
      </FiltersContextProvider>
    );

    expect(updatedFiltersValue).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        [FiltersParametersEnum.minArea]: 500,
        [FiltersParametersEnum.maxArea]: 1500,
      })
    );
  });
});
