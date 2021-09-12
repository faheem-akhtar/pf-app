/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { mockMiscAddTranslation } from 'mocks/misc/add-translation.mock';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { mockModalEnv } from 'mocks/modal-env/mock';
import { PropertySearchCountAndSortSectionComponent } from '../component';

describe('PropertySearchCountAndSortSectionComponent', () => {
  beforeAll(() => {
    mockModalEnv();
    mockMiscAddTranslation('n-properties-sorted-by', '{n} properties sorted by');
  });

  it('should change the route when new sorting is picked', () => {
    const routerPushSpy = jest.fn();
    useRouter().push = routerPushSpy;

    const { getByText } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading={false} />
      </FiltersContextProvider>
    );

    fireEvent.click(getByText('Featured'));
    fireEvent.click(screen.getByText('Beds (most)'));

    expect(routerPushSpy).toHaveBeenCalledTimes(1);
    expect(routerPushSpy).toHaveBeenCalledWith('https://propertyfinder.ae/en/search?c=2&rp=y&ob=bd');
  });

  it('should render ... when loading', () => {
    const { getByText } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading />
      </FiltersContextProvider>
    );

    expect(getByText('... properties sorted by')).toBeTruthy();
  });

  it('should render N properties sorted by when not loading', () => {
    const { getByText } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading={false} />
      </FiltersContextProvider>
    );

    expect(getByText('5 properties sorted by')).toBeTruthy();
  });
});
