import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { locationCompactStub } from 'stubs/location/compact.stub';
import { propertyListBreadcrumbStub } from 'stubs/property/list/breadcrumb/stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersValueFieldPropertyTypeIdType } from 'components/filters/value/field/property-type-id.type';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { functionSelf } from 'helpers/function/self';
import { LocationService } from 'services/location/service';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { PropertyListBreadcrumbListComponent } from '../component';
import { PropertyListBreadcrumbListComponentPropsInterface } from '../component-props.interface';

const breadcrumbStub = [
  {
    name: 'Hotel Apartments',
    link: '/en/search?t=1111&c=1',
    count: 1,
  },
];

jest.mock('services/location/service');

describe('PropertyListBreadcrumbListComponent', () => {
  let props: PropertyListBreadcrumbListComponentPropsInterface;

  beforeEach(() => {
    (LocationService.find as jest.Mock).mockReturnValue(locationCompactStub);

    props = {
      breadcrumbs: propertyListBreadcrumbStub(),
      onClickShowMore: jest.fn(),
      expanded: false,
      t: functionSelf,
    };
  });

  it('should not display show more when the breadcrumbs less than 6', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListBreadcrumbListComponent {...props} />
      </FiltersContextProvider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.queryByText('show-more')).not.toBeInTheDocument();
    expect(screen.queryByText('show-less')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('breadcrumb__item', { exact: true });
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('4,879');
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('894');
  });

  it('should show more visible when the breadcrumbs more than 6', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListBreadcrumbListComponent {...props} breadcrumbs={propertyListBreadcrumbStub(breadcrumbStub)} />
      </FiltersContextProvider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getByText('show-more')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('breadcrumb__item', { exact: true });
    expect(screen.getAllByRole('listitem')[7]).toHaveClass('breadcrumb__item--more');
  });

  it('should not visible 8th item when show less is clicked', () => {
    const { rerender } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListBreadcrumbListComponent {...props} breadcrumbs={propertyListBreadcrumbStub(breadcrumbStub)} />
      </FiltersContextProvider>
    );

    const expandedList = screen.getAllByRole('list')[1];

    userEvent.click(screen.getByText('show-more'));

    rerender(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertyListBreadcrumbListComponent
          {...props}
          breadcrumbs={propertyListBreadcrumbStub(breadcrumbStub)}
          expanded
        />
      </FiltersContextProvider>
    );

    expect(expandedList).toBeVisible();

    userEvent.click(screen.getByText('show-less'));

    expect(expandedList).not.toHaveClass('"breadcrumb__list--expanded');
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  it('should update the filters when no initial locations', () => {
    const { rerender } = render(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.locationsIds]: [] as LocationCompactInterface[],
        })}
      >
        <PropertyListBreadcrumbListComponent {...props} />
      </FiltersContextProvider>
    );

    expect(screen.getByText('Apartments')).toBeInTheDocument();

    userEvent.click(screen.getByText('Apartments'));

    rerender(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.propertyTypeId]: '1' as FiltersValueFieldPropertyTypeIdType,
        })}
      >
        <PropertyListBreadcrumbListComponent
          {...props}
          breadcrumbs={[
            {
              name: 'Mount Lebanon',
              link: '/en/search?l=6&c=1&t=1',
              count: 3422,
            },
          ]}
        />
      </FiltersContextProvider>
    );

    expect(screen.queryByText('Apartments')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Mount Lebanon'));

    rerender(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.propertyTypeId]: '1' as FiltersValueFieldPropertyTypeIdType,
          [FiltersParametersEnum.locationsIds]: [{ id: '6' }] as LocationCompactInterface[],
        })}
      >
        <PropertyListBreadcrumbListComponent {...props} breadcrumbs={[]} />
      </FiltersContextProvider>
    );

    expect(screen.queryByText('Mount Lebanon (3,422)')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should update the filters when initial locations are exist', () => {
    const { rerender } = render(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        })}
      >
        <PropertyListBreadcrumbListComponent {...props} />
      </FiltersContextProvider>
    );

    expect(screen.getByText('Apartments')).toBeInTheDocument();

    userEvent.click(screen.getByText('Apartments'));

    rerender(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.propertyTypeId]: '1' as FiltersValueFieldPropertyTypeIdType,
          [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        })}
      >
        <PropertyListBreadcrumbListComponent
          {...props}
          breadcrumbs={[
            {
              name: 'Mount Lebanon',
              link: '/en/search?l=6&c=1&t=1',
              count: 3422,
            },
          ]}
        />
      </FiltersContextProvider>
    );

    expect(screen.queryByText('Apartments')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Mount Lebanon'));

    rerender(
      <FiltersContextProvider
        {...filtersContextPropsStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.propertyTypeId]: '1' as FiltersValueFieldPropertyTypeIdType,
          [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        })}
      >
        <PropertyListBreadcrumbListComponent {...props} breadcrumbs={[]} />
      </FiltersContextProvider>
    );

    expect(screen.queryByText('Mount Lebanon (3,422)')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
