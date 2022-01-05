import { render, screen } from '@testing-library/react';

import { AuthLoaderComponent } from '../component';

describe('AuthLoaderComponent', () => {
  it('should not add additional class', () => {
    render(<AuthLoaderComponent isEnabled isCentered={false} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('auth-loader').firstElementChild).toHaveClass('loader1__spinner');
  });

  it('should add additional class when centered', () => {
    render(<AuthLoaderComponent isEnabled isCentered />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('auth-loader').firstElementChild).toHaveClass(
      'loader1__spinner loader1__spinner--centered'
    );
  });

  it('should not render', () => {
    render(<AuthLoaderComponent isEnabled={false} isCentered={false} />);

    expect(screen.queryByTestId('auth-loader')).not.toBeInTheDocument();
  });
});
