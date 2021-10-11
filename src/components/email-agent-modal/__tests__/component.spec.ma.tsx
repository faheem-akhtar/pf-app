/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { countryPhoneCodesStub } from 'stubs/country-phone-codes/stub';
import { propertyStub } from 'stubs/property/stub';

import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

import { EmailAgentModalComponent } from '../component';
import { EmailAgentModalComponentPropsInterface } from '../component-props.interface';

describe('EmailAgentModalComponent Marocco', () => {
  const openRef = { current: jest.fn() };
  const property: PropertySerpObfuscatedType = propertyStub();

  let props: EmailAgentModalComponentPropsInterface;

  beforeEach(() => {
    props = {
      property,
      openRef,
    };

    mockModalEnv();
    mockReactUseSwr('en-countries-GET-{"sort":"priority"}', {
      ok: true,
      data: [
        countryPhoneCodesStub({
          code: 'ma',
          name: 'Maroc',
          phoneCode: '+212',
        }),
      ],
    });

    render(<EmailAgentModalComponent {...props} />);
    act(openRef.current);
  });

  it('should render without throwing any errors', () => {
    expect(screen.getByTestId('email-agent-modal-content')).toMatchSnapshot();
  });

  it('should take initial values when modal is opened', () => {
    expect(screen.getByTestId('email-agent-form')).toHaveFormValues({
      emailAlert: false,
      acceptTerms: false,
      receiveAdvertising: false,
    });
  });

  describe('Form Submission', () => {
    it('should display error message for advertising and terms when the checkboxes are not checked', () => {
      userEvent.type(screen.getByLabelText('name'), 'John Doe');
      userEvent.type(screen.getByLabelText('email'), 'john@doe.com');
      userEvent.type(screen.getByPlaceholderText('phone'), '123456789');
      userEvent.type(screen.getByLabelText('message'), 'Message from John Doe');
      userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

      const errorText = screen.getByText('agent-modal/accept-conditions-error-message');
      expect(errorText).toBeInTheDocument();

      const acceptTermsCheckbox = screen.getByRole('checkbox', {
        name: 'agent-modal/accept-terms-message-prefix agent-modal/accept-terms-message-link agent-modal/accept-terms-message-suffix',
      });

      userEvent.click(acceptTermsCheckbox);
      expect(acceptTermsCheckbox).toBeChecked();
      userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

      expect(errorText).toBeInTheDocument();

      const receiveAdvertisingCheckbox = screen.getByRole('checkbox', {
        name: 'agent-modal/receive-advertising-message',
      });

      userEvent.click(receiveAdvertisingCheckbox);
      expect(acceptTermsCheckbox).toBeChecked();
      userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

      expect(errorText).not.toBeInTheDocument();
    });
  });
});
