/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockMiscAddTranslation } from 'mocks/misc/add-translation.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersModalSubmitButtonComponent } from '../submit-button-component';
import { FiltersModalSubmitButtonPropsInterface } from '../submit-button-props.interface';

describe('FiltersModalSubmitButtonComponent', () => {
  let props: Omit<FiltersModalSubmitButtonPropsInterface, 'forceNumberOfProperties'>;
  const { filtersValueFromQuery } = filtersContextPropsStub();

  beforeAll(() => {
    mockMiscAddTranslation('show-n-result', 'Show {{count}} result');
    mockMiscAddTranslation('show-n-result_plural', 'Show {{count}} results');

    props = {
      onSubmit: jest.fn(),
      filtersValue: filtersValueFromQuery,
    };
  });

  it('should display 1 result', () => {
    render(<FiltersModalSubmitButtonComponent {...props} forceNumberOfProperties={1} />);

    expect(screen.getByRole('button')).toHaveTextContent('Show 1 result');
  });

  it('should display n results', () => {
    render(<FiltersModalSubmitButtonComponent {...props} forceNumberOfProperties={48355} />);

    expect(screen.getByRole('button')).toHaveTextContent('Show 48355 results');
  });
});
