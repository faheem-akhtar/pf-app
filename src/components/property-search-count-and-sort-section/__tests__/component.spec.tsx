/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { mockMiscAddTranslation } from 'mocks/misc/add-translation.mock';
import { mockModalEnv } from 'mocks/modal-env/mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';

import { PropertySearchCountAndSortSectionComponent } from '../component';

describe('PropertySearchCountAndSortSectionComponent', () => {
  beforeAll(() => {
    mockModalEnv();
    mockMiscAddTranslation('n-properties-sorted-by', '{{count}} properties sorted by');
  });

  it('should change the route when new sorting is picked', async () => {
    const routerPushSpy = jest.fn();
    useRouter().push = routerPushSpy;

    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading={false} />
      </FiltersContextProvider>
    );

    userEvent.click(screen.getByText(/^Featured$/));
    await waitFor(() => expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument());
    userEvent.click(screen.getByText('Beds (most)'));

    expect(routerPushSpy).toHaveBeenCalledTimes(1);
    expect(routerPushSpy).toHaveBeenCalledWith('/search?c=2&rp=y&ob=bd');
  });

  it('should render ... when loading', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading />
      </FiltersContextProvider>
    );

    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should render N properties sorted by when not loading', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PropertySearchCountAndSortSectionComponent count={5} loading={false} />
      </FiltersContextProvider>
    );

    expect(screen.getByText('5 properties sorted by')).toBeInTheDocument();
  });
});
