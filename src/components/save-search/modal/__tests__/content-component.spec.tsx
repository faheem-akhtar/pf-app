import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockSnackbarEnv } from 'mocks/snackbar/env.mock';

import { SnackbarContextProvider } from 'components/snackbar/context-provider';

import * as SaveSearchFormComponentModule from '../../form/component';
import { SaveSearchModalContentComponent } from '../content-component';

describe('SaveSearchModalContentComponent', () => {
  beforeEach(() => {
    mockSnackbarEnv();
  });

  it('should render the component', () => {
    expect(render(<SaveSearchModalContentComponent close={jest.fn} />)).toMatchSnapshot();
  });

  it('should display message on success', async () => {
    const closeMock = jest.fn();
    jest
      .spyOn(SaveSearchFormComponentModule, 'SaveSearchFormComponent')
      .mockImplementationOnce(({ onSuccess }) => <button onClick={onSuccess} />);

    const { getByRole, findByText } = render(
      <SnackbarContextProvider>
        <SaveSearchModalContentComponent close={closeMock} />
      </SnackbarContextProvider>
    );

    act(() => {
      userEvent.click(getByRole('button'));
    });

    await findByText('save_search/create-success_notification');
    await findByText('save_search/manage-cta-label');

    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(closeMock).toHaveBeenCalledWith();
  });
});
