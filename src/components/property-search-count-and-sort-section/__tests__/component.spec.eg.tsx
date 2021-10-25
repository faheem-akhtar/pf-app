import { render, screen } from '@testing-library/react';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { PropertySearchCountAndSortSectionComponent } from '../component';

describe('PropertySearchCountAndSortSectionComponent Egypt', () => {
  it('should appear on-boarding tooltip', () => {
    mockReactUseSwr('api_user', {
      ok: true,
      data: {
        'save-search-tooltip': true,
        'filter-tooltip': true,
      },
    });
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();

    render(
      <FiltersContextProvider
        filtersValueFromQuery={{ ...filtersValueFromQuery, [FiltersParametersEnum.isDeveloperProperty]: true }}
        filtersData={filtersData}
      >
        <PropertySearchCountAndSortSectionComponent count={5} loading={false} />
      </FiltersContextProvider>
    );

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
