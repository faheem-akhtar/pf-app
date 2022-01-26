import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';

import { UserContext } from 'components/user/context';

import { HeaderComponent } from '../component';

describe('HeaderComponent', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    mockModalEnv();

    renderResult = render(
      <UserContext.Provider value={null}>
        <HeaderComponent alternateUrl='/للبيع/شقق-للبيع.html' />
      </UserContext.Provider>
    );
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should work auth pop-up properly', async () => {
    userEvent.click(screen.getByRole('button', { name: /log-in/i }));
    await screen.findByRole('heading', { name: /sign-in/i });
    userEvent.click(screen.getByRole('button', { name: /cross/i }));

    await waitFor(() => expect(screen.queryByRole('heading', { name: /sign-in/i })).not.toBeInTheDocument());
  });
});
