/**
 * @jest-environment jsdom
 */
import { fireEvent as fireDOMEvent } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { mockMiscAddTranslation } from 'mocks/misc/add-translation.mock';
import { configKeywordsByCategoryStub } from 'stubs/config/keywords/by-category.stub';

import { configKeywordsMaxWordLimit } from 'config/keywords/max-word-limit';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { KeywordsComponent } from '../component';

describe('KeywordsComponent', () => {
  let onChange: (value: string) => void;

  beforeEach(() => {
    onChange = jest.fn();
  });

  test('if render is completed without throwing any errors', () => {
    const { container } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value='value'
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('if no-suggestion template rendered when suggestions are empty', async () => {
    const { getByText, getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value=''
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    mockMiscAddTranslation('keywords_widget/no-suggestions-message', 'no-message');
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');

    await waitFor(async () => {
      fireEvent.click(multiSelectAutoCompleteTemplate);
      fireEvent.input(getByTestId('multi-selection-autocomplete-template-input'), { target: { value: 'lorem' } });
      await waitFor(() => {
        expect(getByText(/no-message|lorem/i)).toBeTruthy();
      });
    });
  });

  it('should get the titles from the suggestions', async () => {
    const inputValue = 'lor';
    const { getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value=''
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');
    fireEvent.click(multiSelectAutoCompleteTemplate);

    await waitFor(async () => {
      const multiSelectAutoCompleteInput = getByTestId('multi-selection-autocomplete-template-input');
      fireEvent.focus(multiSelectAutoCompleteInput);
      fireEvent.input(multiSelectAutoCompleteInput, { target: { value: inputValue } });
    });

    await waitFor(() => {
      const suggestionsTemplate = getByTestId('multi-selection-autocomplete-template-suggestions');
      expect(suggestionsTemplate.innerHTML).toContain(`<strong>${inputValue}</strong>`);
    });
  });

  test('if suggestion chips are set correctly', async () => {
    const value = 'lorem,ipsum';
    const { getByTestId } = render(
      <KeywordsComponent
        chipsOnTheBottom
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={value}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    await waitFor(() => {
      const chipsContainerTemplate = getByTestId('multi-selection-autocomplete-template-chips');
      value.split(',').forEach((word) => {
        expect(chipsContainerTemplate.innerHTML).toContain(`<span class="label">${word}</span>`);
      });
    });
  });

  test('if the given keyword is added to the existing keyword stack', async () => {
    const values = 'dolor,sit';
    const { getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');
    fireEvent.click(multiSelectAutoCompleteTemplate);

    await waitFor(() => {
      const multiSelectAutoCompleteInput = getByTestId('multi-selection-autocomplete-template-input');
      fireEvent.focus(multiSelectAutoCompleteInput);
      fireEvent.input(multiSelectAutoCompleteInput, { target: { value: 'lor' } });
    });

    await waitFor(() => {
      const suggestionsTemplate = getByTestId('multi-selection-autocomplete-template-suggestions');
      const suggestionButton = suggestionsTemplate.querySelector('button');
      if (suggestionButton) {
        fireDOMEvent.click(suggestionButton);
        expect(onChange).toBeCalledWith(
          [...values.split(','), configKeywordsByCategoryStub[FiltersCategoryIdEnum.residentialForRent][0]].join(',')
        );
      }
    });
  });

  test('if the given keyword is not added since it already exists', async () => {
    const values = 'lorem,ipsum';
    const { getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');
    fireEvent.click(multiSelectAutoCompleteTemplate);

    await waitFor(() => {
      const multiSelectAutoCompleteInput = getByTestId('multi-selection-autocomplete-template-input');
      fireEvent.focus(multiSelectAutoCompleteInput);
      fireEvent.input(multiSelectAutoCompleteInput, { target: { value: 'lor' } });
    });

    await waitFor(() => {
      const suggestionsTemplate = getByTestId('multi-selection-autocomplete-template-suggestions');
      const suggestionButton = suggestionsTemplate.querySelector('button');
      if (suggestionButton) {
        fireDOMEvent.click(suggestionButton);
        expect(onChange).not.toHaveBeenCalledTimes(1);
      }
    });
  });

  test('if the given keyword is not added since stack is full', async () => {
    const values = 'lorem,ipsum';
    const { getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.commercialForRent}
      />
    );
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');
    fireEvent.click(multiSelectAutoCompleteTemplate);

    await waitFor(() => {
      const multiSelectAutoCompleteInput = getByTestId('multi-selection-autocomplete-template-input');
      fireEvent.focus(multiSelectAutoCompleteInput);
      fireEvent.input(multiSelectAutoCompleteInput, { target: { value: 'a' } });
    });

    await waitFor(() => {
      const suggestionsTemplate = getByTestId('multi-selection-autocomplete-template-suggestions');
      const { length } = suggestionsTemplate.querySelectorAll('button');
      expect(length).toEqual(configKeywordsMaxWordLimit);
    });
  });

  test('if the clicked keyword is removed from the keyword stack', async () => {
    const values = 'dolor,sit';
    const { getByTestId } = render(
      <KeywordsComponent
        chipsOnTheBottom
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    await waitFor(() => {
      const chipsContainerTemplate = getByTestId('multi-selection-autocomplete-template-chips');
      // first suggestion will be clicked
      const chipButton = chipsContainerTemplate.querySelector('button');
      if (chipButton) {
        fireDOMEvent.click(chipButton);
        const [, lastSuggestion] = values.split(',');
        expect(onChange).toHaveBeenCalledWith(lastSuggestion);
      }
    });
  });

  test('if the item group is removed when clicked', async () => {
    const values = 'dolor,sit,amet,lorem';

    const { getByTestId } = render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );
    const multiSelectAutoCompleteTemplate = getByTestId('multi-selection-autocomplete-template');
    await waitFor(() => {
      const chips = multiSelectAutoCompleteTemplate.querySelectorAll('.cross_button');
      if (chips) {
        fireDOMEvent.click(chips[1]);
        expect(onChange).toHaveBeenCalledWith(values.split(',')[0]);
      }
    });
  });
});
