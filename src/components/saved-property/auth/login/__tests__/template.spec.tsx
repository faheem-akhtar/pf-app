/**
 * @jest-environment jsdom
 */
import { render, RenderResult } from '@testing-library/react';

import { AuthLoginTemplatePropsInterface } from 'components/auth/login/template-props.interface';

import { SavedPropertyAuthLoginTemplate } from '../template';

describe('SavedPropertyAuthLoginTemplate', () => {
  let renderResult: RenderResult;
  let props: AuthLoginTemplatePropsInterface;

  beforeEach(() => {
    props = {
      isLoading: false,
      errorMessage: '',
      email: '',
      password: '',
      errors: {},
      t: jest.fn(),
      onEmailChange: jest.fn(),
      onPasswordChange: jest.fn(),
      onForgotPassword: jest.fn(),
      onLogin: jest.fn(),
      onRegister: jest.fn(),
      onFacebookLoginClick: jest.fn(),
      onGoogleLoginClick: jest.fn(),
      onFormSubmit: jest.fn(),
    };

    renderResult = render(<SavedPropertyAuthLoginTemplate {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render the error message', () => {
    const { getByText } = render(<SavedPropertyAuthLoginTemplate {...props} errorMessage='This is an error message' />);

    expect(getByText('This is an error message')).toBeTruthy();
  });
});
