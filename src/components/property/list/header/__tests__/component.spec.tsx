import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { propertyListBreadcrumbStub } from 'stubs/property/list/breadcrumb/stub';

import { FiltersContextProvider } from 'components/filters/context-provider';

import { PropertyListHeaderComponent } from '../component';

const breadcrumbStub = [
  {
    name: 'Hotel Apartments',
    link: '/en/search?t=1111&c=1',
    count: 1,
  },
];

describe('PropertyListHeaderComponent', () => {
  const pageTitle = 'Apartments for sale in UAE - 41886 Flats for sale | Property Finder UAE';

  it('renders without throwing any errors', () => {
    const { container } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListHeaderComponent pageTitle={pageTitle} breadcrumbs={propertyListBreadcrumbStub()} />
      </FiltersContextProvider>
    );

    expect(container).toMatchSnapshot();
  });

  test('if there are breadcrumbs data', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListHeaderComponent pageTitle={pageTitle} breadcrumbs={propertyListBreadcrumbStub(breadcrumbStub)} />
      </FiltersContextProvider>
    );

    userEvent.click(screen.getByText('show-more'));

    expect(screen.getByText('Apartments')).toBeInTheDocument();
  });

  it('should not visible breadcrumbs when no data', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListHeaderComponent pageTitle={pageTitle} breadcrumbs={[]} />
      </FiltersContextProvider>
    );

    expect(screen.queryByRole('section')).not.toBeInTheDocument();
  });

  it('should expanded state work properly when breadcrumb more or less are clicked', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListHeaderComponent pageTitle={pageTitle} breadcrumbs={propertyListBreadcrumbStub(breadcrumbStub)} />
      </FiltersContextProvider>
    );

    expect(screen.getByText('show-more')).toBeInTheDocument();

    userEvent.click(screen.getByText('show-more'));

    expect(screen.getByText('show-less')).toBeInTheDocument();

    userEvent.click(screen.getByText('show-less'));

    expect(screen.getByText('show-more')).toBeInTheDocument();
  });
});
