/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { HeaderTemplate } from '../template';

const props = {
  locale: 'en',
  onLoginButtonClick: jest.fn(),
  userProfile: {
    user: null,
    savedPropertiesCount: 1,
  },
};

describe('HeaderTemplate', () => {
  it('should appear log in button when the user is not exist', () => {
    const { container } = render(<HeaderTemplate {...props} />);

    expect(screen.getByRole('button', { name: /log-in/i })).toBeInTheDocument();
    expect(container.querySelector('.userPhoto')).not.toBeInTheDocument();
  });

  it('should appear user related contents when the user is exist', () => {
    const userProfile = {
      user: {
        userId: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        image: 'none.jpg',
      },
      savedPropertiesCount: 2,
    };
    const { container } = render(<HeaderTemplate {...props} userProfile={userProfile} />);

    expect(container.querySelector('.userPhoto')).toHaveAttribute('src', 'none.jpg');
    expect(container.querySelector('.notificationBadge')).toHaveTextContent('2');
    expect(screen.queryByRole('button', { name: /log-in/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('logo-en')).toBeInTheDocument();
    expect(container.querySelector('.logoLink')).toHaveAttribute('href', '/');
  });

  it('should show alternative locale content', () => {
    const { container } = render(<HeaderTemplate {...props} locale='ar' />);

    expect(screen.getByTestId('logo-ar')).toBeInTheDocument();
    expect(container.querySelector('.logoLink')).toHaveAttribute('href', '/ar');
  });
});
