/**
 * @jest-environment jsdom
 */

import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockWindowIntersectionObserver } from 'mocks/window/intersection-observer.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { FiltersSectionComponent } from '../component';

describe('FiltersSectionComponent', () => {
  let renderResult: RenderResult;
  const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();
  const locations: LocationCompactInterface[] = [
    {
      name: 'Abu Dhabi',
      abbreviation: '',
      id: '6',
      path: 'Abu Dhabi',
      path_name: '',
    },
    {
      name: 'Dubai',
      abbreviation: '',
      id: '1',
      path: 'Dubai',
      path_name: '',
    },
  ];

  beforeEach(() => {
    mockReactUseSwr('api_user', {
      ok: true,
      data: {
        'save-search-tooltip': true,
      },
    });
    mockWindowIntersectionObserver();
    renderResult = render(
      <FiltersContextProvider
        filtersValueFromQuery={{ ...filtersValueFromQuery, [FiltersParametersEnum.locationsIds]: locations }}
        filtersData={filtersData}
      >
        <FiltersSectionComponent />
      </FiltersContextProvider>
    );
  });

  it('should render without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should have 1 element when the button is clicked', () => {
    userEvent.click(screen.getByRole('button', { name: 'multi-location-selector/n-more' }));
    const autoCompleteContainer = screen.getByTestId('multi-selection-autocomplete-template').childNodes[0];

    expect(autoCompleteContainer.contains).toHaveLength(1);
  });
});
