/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HeaderComponent } from '../component';
import { ModalEnvMock } from 'mocks/modal-env/mock';
import { UserContextProvider } from 'context/user/context-provider';

const HeaderComponentWithContext = (): JSX.Element => (
  <UserContextProvider>
    <HeaderComponent />
  </UserContextProvider>
);

describe('HeaderComponent', () => {
  beforeAll(() => {
    ModalEnvMock();
  });

  it('should render correctly', () => {
    const { container } = render(<HeaderComponentWithContext />);

    expect(container).toMatchSnapshot();
  });

  it('should work auth pop-up workflow', async () => {
    render(<HeaderComponentWithContext />);

    userEvent.click(screen.getByRole('button', { name: /log-in/i }));
    await waitFor(() => expect(screen.queryByRole('heading', { name: /sign-in/i })).toBeInTheDocument());

    userEvent.click(screen.getByTestId('auth-close-icon'));
    await waitFor(() => expect(screen.queryByRole('heading', { name: /sign-in/i })).not.toBeInTheDocument());
  });
});
