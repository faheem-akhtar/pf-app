import { act, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';

import { FiltersModalButtonComponent } from '../button-component';

describe('FiltersModalButtonComponent', () => {
  const openFiltersRef = { current: jest.fn() };
  const closeFiltersRef = { current: jest.fn() };

  let renderResult: RenderResult;
  beforeEach(() => {
    mockReactUseSwr('api_user', {
      ok: true,
      data: {
        'save-search-tooltip': true,
      },
    });
    mockModalEnv();
    renderResult = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <FiltersModalButtonComponent visibleTooltip={false} />
      </FiltersContextProvider>
    );
  });

  it('should render without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should call FiltersModalContentComponent modal', () => {
    userEvent.click(screen.getByRole('button', { name: 'filters' }));
    act(openFiltersRef.current);

    expect(openFiltersRef.current).toHaveBeenCalledTimes(1);

    const titleElement = screen.getByRole('heading', { name: 'filters' });

    expect(titleElement).toBeInTheDocument();

    userEvent.click(titleElement);
    act(closeFiltersRef.current);

    expect(titleElement).not.toBeInTheDocument();
  });

  it('should not appear on-boarding tooltip', () => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
