/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    mockMiscAddTranslation('keywords_widget/no-suggestions-message', 'no-message');
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value=''
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    userEvent.tab();

    expect(screen.getByPlaceholderText('keywords_widget/placeholder')).toHaveFocus();
    userEvent.type(screen.getByPlaceholderText('keywords_widget/placeholder'), 'lorem');

    await waitFor(() => {
      expect(screen.getByText(/no-message|lorem/i)).toBeInTheDocument();
    });
  });

  it('should get the titles from the suggestions', async () => {
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value=''
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    userEvent.tab();

    expect(screen.getByPlaceholderText('keywords_widget/placeholder')).toHaveFocus();

    userEvent.type(screen.getByPlaceholderText('keywords_widget/placeholder'), 'lor');

    const suggestionsTemplate = await screen.findByTestId('multi-selection-autocomplete-template-suggestions');
    expect(suggestionsTemplate.innerHTML).toContain(`<strong>lor</strong>`);
  });

  test('if suggestion chips are set correctly', async () => {
    const value = 'lorem,ipsum';

    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={value}
        category={FiltersCategoryIdEnum.residentialForRent}
        chipsOnTheBottom
      />
    );

    await waitFor(async () => {
      const chipsContainerTemplate = await screen.findByTestId('multi-selection-autocomplete-template-chips');
      value.split(',').forEach((word) => {
        expect(chipsContainerTemplate.innerHTML).toContain(`<span class="chipLabel label">${word}</span>`);
      });
    });
  });

  test('if the given keyword is added to the existing keyword stack', async () => {
    const values = 'dolor,sit';
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    userEvent.click(screen.getByTestId('multi-selection-autocomplete-template'));
    userEvent.tab();

    expect(screen.getByPlaceholderText('keywords_widget/placeholder')).toHaveFocus();

    userEvent.type(screen.getByPlaceholderText('keywords_widget/placeholder'), 'lor');

    const suggestionButton = await screen.findByTestId('multi-selection-autocomplete-template-suggestion-button');

    if (suggestionButton) {
      userEvent.click(suggestionButton);

      expect(onChange).toBeCalledWith(
        [...values.split(','), configKeywordsByCategoryStub[FiltersCategoryIdEnum.residentialForRent][0]].join(',')
      );
    }
  });

  test('if the given keyword is not added since it already exists', async () => {
    const values = 'lorem,ipsum';
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    userEvent.click(screen.getByTestId('multi-selection-autocomplete-template'));
    userEvent.tab();

    expect(screen.getByPlaceholderText('keywords_widget/placeholder')).toHaveFocus();

    userEvent.type(screen.getByPlaceholderText('keywords_widget/placeholder'), 'lor');

    const suggestionButton = await screen.findByTestId('multi-selection-autocomplete-template-suggestion-button');
    if (suggestionButton) {
      userEvent.click(suggestionButton);
      expect(onChange).not.toHaveBeenCalledTimes(1);
    }
  });

  test('if the given keyword is not added since stack is full', async () => {
    const values = 'lorem,ipsum';
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.commercialForRent}
      />
    );

    userEvent.click(screen.getByTestId('multi-selection-autocomplete-template'));
    userEvent.tab();

    expect(screen.getByPlaceholderText('keywords_widget/placeholder')).toHaveFocus();

    userEvent.type(screen.getByPlaceholderText('keywords_widget/placeholder'), 'a');

    const suggestionButtons = await screen.findAllByTestId('multi-selection-autocomplete-template-suggestion-button');
    expect(suggestionButtons).toHaveLength(configKeywordsMaxWordLimit);
  });

  test('if the clicked keyword is removed from the keyword stack', () => {
    const values = 'dolor,sit';
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
        chipsOnTheBottom
      />
    );

    // first suggestion will be clicked
    const chipButton = screen.getAllByRole('button')[0];

    if (chipButton) {
      userEvent.click(chipButton);
      const [, lastSuggestion] = values.split(',');
      expect(onChange).toHaveBeenCalledWith(lastSuggestion);
    }
  });

  test('if the item group is removed when clicked', () => {
    const values = 'dolor,sit,amet,lorem';
    render(
      <KeywordsComponent
        keywordsMapping={configKeywordsByCategoryStub}
        onChange={onChange}
        value={values}
        category={FiltersCategoryIdEnum.residentialForRent}
      />
    );

    const chipButtons = screen.getAllByRole('button');

    if (chipButtons) {
      userEvent.click(chipButtons[1]);
      expect(onChange).toHaveBeenCalledWith(values.split(',')[0]);
    }
  });
});
