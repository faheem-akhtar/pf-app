/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';

import { UserContext } from 'context/user/context';

import { HeaderComponent } from '../component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    mockModalEnv();
  });

  it('should render without throwing any errors when no user', () => {
    const { container } = render(
      <UserContext.Provider value={null}>
        <HeaderComponent />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should work auth pop-up properly', async () => {
    render(
      <UserContext.Provider value={null}>
        <HeaderComponent />
      </UserContext.Provider>
    );

    userEvent.click(screen.getByRole('button', { name: /log-in/i }));
    await waitFor(() => expect(screen.queryByRole('heading', { name: /sign-in/i })).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /cross/i }));
    await waitFor(() => expect(screen.queryByRole('heading', { name: /sign-in/i })).not.toBeInTheDocument());
  });
});
