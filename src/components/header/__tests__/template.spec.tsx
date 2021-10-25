import { render, screen } from '@testing-library/react';

import { userModelStub } from 'stubs/user/model.stub';

import { HeaderTemplate } from '../template';
import { HeaderTemplatePropsInterface } from '../template.props.interface';

describe('HeaderTemplate', () => {
  let props: HeaderTemplatePropsInterface;

  beforeEach(() => {
    props = {
      locale: 'en',
      onLoginButtonClick: jest.fn(),
      userProfile: {
        user: null,
        savedPropertiesCount: 1,
      },
    };
  });

  it('should appear log in button when the user is not exist', () => {
    render(<HeaderTemplate {...props} />);

    expect(screen.getByRole('button', { name: /log-in/i })).toBeInTheDocument();
    expect(screen.queryByAltText(/user photo/i)).not.toBeInTheDocument();
  });

  it('should appear user related contents when the user is exist', () => {
    render(
      <HeaderTemplate
        {...props}
        userProfile={{
          user: userModelStub(),
          savedPropertiesCount: 2,
        }}
      />
    );

    expect(screen.getByAltText(/user photo/i)).toHaveAttribute(
      'src',
      'https://lh3.googleusercontent.com/a-/AOh14GgAjybktYwQWEFDSAPrQ7yC3KC6l1I1BDyyisoH5Sb=s50'
    );

    expect(screen.getByTestId('notification-badge')).toHaveTextContent('2');
    expect(screen.queryByRole('button', { name: /log-in/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logo-en/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logo-en/i })).toHaveAttribute('href', '/');
  });

  it('should show alternative locale content', () => {
    render(<HeaderTemplate {...props} locale='ar' />);

    expect(screen.getByRole('link', { name: /logo-ar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logo-ar/i })).toHaveAttribute('href', '/ar');
  });
});
