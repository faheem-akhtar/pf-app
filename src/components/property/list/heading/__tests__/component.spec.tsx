import { render } from '@testing-library/react';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';

import { PropertyListHeadingComponent } from '../component';

describe('PropertyListHeadingComponent', () => {
  const pageTitle = 'Apartments for sale in UAE - 41886 Flats for sale | Property Finder UAE';

  it('should display title', () => {
    const { getByRole } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListHeadingComponent pageTitle={pageTitle} />
      </FiltersContextProvider>
    );

    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Apartments for sale in UAE');
  });
});
