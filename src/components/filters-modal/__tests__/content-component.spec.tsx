import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersModalContentComponent } from '../content-component';

describe('FiltersModalContentComponent', () => {
  const close = jest.fn();
  const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();

  it('should not be able to close the modal when the button clicked and result is 0', () => {
    mockModalEnv();

    render(
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

    const submitButton = screen.getAllByRole('button')[3];

    userEvent.click(submitButton);

    expect(close).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { level: 1, name: 'filters' })).toBeInTheDocument();
  });
});
