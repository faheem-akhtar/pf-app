/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SaveSearchContext } from 'components/save-search/context';

import { SaveSearchFormComponent } from '../component';

describe('SaveSearchFormComponent', () => {
  it('should render the component', () => {
    expect(render(<SaveSearchFormComponent onSuccess={jest.fn()} />).container).toMatchSnapshot();
  });

  describe('name field', () => {
    it('should display error if name field is left empty', async () => {
      const { getByLabelText, getByText } = render(<SaveSearchFormComponent onSuccess={jest.fn()} />);

      userEvent.type(getByLabelText('save_search/name-label'), 'my name');

      userEvent.clear(getByLabelText('save_search/name-label'));

      expect(getByText('save_search/name-validation-required')).toBeTruthy();
    });

    it('should display max charactor limit error', () => {
      const { getByLabelText, getByText } = render(<SaveSearchFormComponent onSuccess={jest.fn()} />);
      const charactors: string[] = [];

      while (charactors.length < 256) {
        charactors.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9][charactors.length % 10].toString());
      }

      userEvent.type(getByLabelText('save_search/name-label'), charactors.join(''));

      expect(getByText('save_search/name-validation-character_limit')).toBeTruthy();
    });
  });

  describe('frequence field', () => {
    it('should select an option', () => {
      const { getByLabelText, getByRole } = render(<SaveSearchFormComponent onSuccess={jest.fn()} />);

      expect((getByRole('option', { name: 'daily' }) as HTMLOptionElement).selected).toBeTruthy();

      userEvent.selectOptions(getByLabelText('save_search/frequency-label'), '2');

      expect((getByRole('option', { name: 'weekly' }) as HTMLOptionElement).selected).toBeTruthy();

      userEvent.selectOptions(getByLabelText('save_search/frequency-label'), '0');

      expect((getByRole('option', { name: 'off' }) as HTMLOptionElement).selected).toBeTruthy();
    });
  });

  it('should not submit the form', async () => {
    const onSuccessMock = jest.fn();
    const { getByLabelText, getByRole } = render(<SaveSearchFormComponent onSuccess={onSuccessMock} />);

    userEvent.type(getByLabelText('save_search/name-label'), 'my name');

    userEvent.click(getByRole('button'));

    await waitFor(() => expect(getByRole('button').querySelector('.dropdownLoader')));

    await waitFor(() => expect(onSuccessMock).toHaveBeenCalledTimes(1));
  });

  it('should not submit the for if validation failed', () => {
    const onSuccessMock = jest.fn();
    const { getByRole } = render(<SaveSearchFormComponent onSuccess={onSuccessMock} />);

    userEvent.click(getByRole('button'));

    expect(onSuccessMock).not.toHaveBeenCalled();
  });

  it('should display a general error message if create request failed', async () => {
    const onSuccessMock = jest.fn();
    const saveSearchCreateMock = jest.fn().mockReturnValue(
      Promise.resolve({
        ok: false,
      })
    );
    const { getByLabelText, getByRole, getByText } = render(
      <SaveSearchContext.Provider
        value={{
          data: [],
          filtered: [],
          create: saveSearchCreateMock,
        }}
      >
        <SaveSearchFormComponent onSuccess={onSuccessMock} />
      </SaveSearchContext.Provider>
    );

    userEvent.type(getByLabelText('save_search/name-label'), 'my name');

    userEvent.click(getByRole('button'));

    await waitFor(() => getByText('general-error-message'));

    expect(onSuccessMock).not.toHaveBeenCalled();
  });
});
