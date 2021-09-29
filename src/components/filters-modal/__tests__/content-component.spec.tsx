/**
 * @jest-environment jsdom
 */

import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersModalContentComponent } from '../content-component';

describe('FiltersModalContentComponent', () => {
  let renderResult: RenderResult;
  const close = jest.fn();
  const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();

  beforeEach(() => {
    mockModalEnv();

    renderResult = render(
      <FiltersContextProvider
        filtersValueFromQuery={{
          ...filtersValueFromQuery,
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
        }}
        filtersData={filtersData}
      >
        <FiltersModalContentComponent close={close} />
      </FiltersContextProvider>
    );
  });

  it('should render without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should not render all widgets', () => {
    expect(
      screen.queryByRole('checkbox', { name: 'filters-modal/is-developer-property-checkbox-label' })
    ).not.toBeInTheDocument();
  });

  it('should not be able to close the modal when the button clicked and result is 0', () => {
    const submitButton = screen.getAllByRole('button')[3];

    userEvent.click(submitButton);

    expect(close).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('heading', { level: 1, name: 'filters' })).toBeInTheDocument();
  });
});
