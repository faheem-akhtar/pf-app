import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';

import { PropertyCardMenuModalComponent } from '../component';
import { PropertyCardMenuModalComponentPropsInterface } from '../component-props.interface';

describe('PropertyCardMenuModalComponent', () => {
  let props: PropertyCardMenuModalComponentPropsInterface;

  const openRef = { current: jest.fn() };
  const closeRef = { current: jest.fn() };

  beforeEach(() => {
    mockModalEnv();

    props = {
      openRef,
      closeButtonLabel: 'Cancel',
      onCloseButtonClick: jest.fn(),
    };
  });

  it('renders without throwing any errors', () => {
    render(<PropertyCardMenuModalComponent {...props} />);
    act(openRef.current);

    expect(screen.getByTestId('property-card-menu-modal')).toMatchSnapshot();
  });

  it('should unvisible when the cancel button is clicked', () => {
    render(<PropertyCardMenuModalComponent {...props} />);
    act(openRef.current);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    expect(props.onCloseButtonClick).toHaveBeenCalledTimes(1);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it('should the modal disappear when overlay is clicked', async () => {
    render(<PropertyCardMenuModalComponent {...props} closeRef={closeRef} />);
    act(openRef.current);

    const modalOverlayEl = screen.getByRole('document');
    userEvent.click(modalOverlayEl);
    act(closeRef.current);

    await waitFor(() => expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument());
  });
});
