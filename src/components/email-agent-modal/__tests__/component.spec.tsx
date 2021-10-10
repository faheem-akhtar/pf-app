/**
 * @jest-environment jsdom
 */

import { act, render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { propertyStub } from 'stubs/property/stub';
import { userModelStub } from 'stubs/user/model.stub';

import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { UserContext } from 'context/user/context';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';
import { StatsService } from 'services/stats/service';

import { EmailAgentModalComponent } from '../component';
import { EmailAgentModalComponentPropsInterface } from '../component-props.interface';

describe('EmailAgentModalComponent', () => {
  const openRef = { current: jest.fn() };
  const closeRef = { current: jest.fn() };
  const openAuthRef = { current: jest.fn() };
  const closeAuthRef = { current: jest.fn() };

  const property: PropertySerpObfuscatedType = propertyStub();
  let props: EmailAgentModalComponentPropsInterface;

  beforeAll(() => {
    props = {
      property,
      openRef,
    };
  });

  beforeEach(() => {
    (StatsService().propertyLeadSend as jest.Mock).mockReset();

    mockModalEnv();
    mockReactUseSwr('en-countries-GET-{"sort":"priority"}', {
      ok: true,
      data: [
        { code: 'ae', name: 'United Arab Emirates', phoneCode: '+971' },
        { code: 'tr', name: 'Turkey', phoneCode: '+90' },
      ],
    });
  });

  it('should take initial values when modal is opened', () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <EmailAgentModalComponent {...props} />
      </UserContext.Provider>
    );
    act(openRef.current);

    expect(screen.getByTestId('email-agent-form')).toHaveFormValues({
      name: 'FirstName LastName',
      email: 'test@propertyfinder.ae',
      phone: '',
      message: 'agent-modal/default-email-message',
      emailAlert: true,
    });
  });

  it('should not appear sign in pop-up', async () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <EmailAgentModalComponent {...props} />
      </UserContext.Provider>
    );
    act(openRef.current);

    userEvent.type(screen.getByPlaceholderText('phone'), '123456');

    GoogleRecaptchaServiceModule.GoogleRecaptchaService().execute = (): Promise<string> => Promise.resolve('token');

    userEvent.click(screen.getByRole('checkbox', { name: 'agent-modal/email-alert-message' }));
    userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

    const fetchMock = mockWindowFetch();
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        'default-origin/en/api/pwa/property/email-agent',
        expect.objectContaining({
          body: JSON.stringify({
            attributes: {
              propertyId: parseInt(propertySerpObfuscatedGetId(props.property), 10),
              name: 'FirstName LastName',
              email: 'test@propertyfinder.ae',
              phone: '+971123456',
              message: 'agent-modal/default-email-message',
              emailAlert: false,
              captcha_token: 'token',
              autoRegister: true,
            },
          }),
          headers: {
            locale: 'en',
          },
          method: 'POST',
        })
      )
    );

    expect(screen.queryByText('agent-modal/sign-in-title')).not.toBeInTheDocument();
  });

  it('should the modal disappear when overlay is clicked', async () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <EmailAgentModalComponent {...props} />
      </UserContext.Provider>
    );
    act(openRef.current);

    const modalOverlay = screen.getByRole('document');
    userEvent.click(modalOverlay);

    act(closeRef.current);
    await waitFor(() => expect(screen.queryByText('agent-modal/email-form-title')).not.toBeInTheDocument());
  });

  describe('when the user is not exist', () => {
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(
        <UserContext.Provider value={null}>
          <EmailAgentModalComponent {...props} />
        </UserContext.Provider>
      );
      act(openRef.current);
    });

    it('should render without throwing any errors', () => {
      expect(screen.getByTestId('email-agent-modal-content')).toMatchSnapshot();
    });

    it('should display property data properly', () => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title from agent');
      expect(screen.getByLabelText('message')).toHaveValue('agent-modal/default-email-message');
    });

    it('should take initial values when modal is opened', () => {
      expect(screen.getByTestId('email-agent-form')).toHaveFormValues({
        name: '',
        email: '',
        phone: '',
        message: 'agent-modal/default-email-message',
        emailAlert: true,
      });
      expect(screen.queryByLabelText('agent-modal/receive-advertising-message')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('agent-modal/accept-terms-message-prefix')).not.toBeInTheDocument();

      const errorTexts = screen.queryAllByLabelText(/^validation(?:_?[a-z]+)*/);
      expect(errorTexts).toHaveLength(0);
    });

    describe('form submission', () => {
      it('should form successfully submitted', async () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');

        GoogleRecaptchaServiceModule.GoogleRecaptchaService().execute = (): Promise<string> => Promise.resolve('token');

        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        const fetchMock = mockWindowFetch();
        await waitFor(() =>
          expect(fetchMock).toHaveBeenCalledWith(
            'default-origin/en/api/pwa/property/email-agent',
            expect.objectContaining({
              body: JSON.stringify({
                attributes: {
                  propertyId: parseInt(propertySerpObfuscatedGetId(props.property), 10),
                  name: 'Name',
                  email: 'email@example.com',
                  phone: '+971123456',
                  message: 'agent-modal/default-email-message',
                  emailAlert: true,
                  captcha_token: 'token',
                  autoRegister: false,
                },
              }),
              headers: {
                locale: 'en',
              },
              method: 'POST',
            })
          )
        );

        expect(StatsService().propertyLeadSend).toHaveBeenCalledTimes(1);
        expect(StatsService().propertyLeadSend).toHaveBeenCalledWith(198023, {
          lead: {
            medium: 'email',
            cta: 'button',
            email: {
              name: 'Name',
              email: 'email@example.com',
              phone: '+971123456',
              message: 'agent-modal/default-email-message',
              emailAlert: true,
            },
          },
        });

        expect(screen.queryByTestId('loader-template')).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
        expect(screen.getByText('thank-you')).toBeInTheDocument();

        expect(screen.getByTestId('email-agent-modal-content')).toMatchSnapshot();
        expect(screen.getByText('agent-modal/sign-in-title')).toBeInTheDocument();

        userEvent.click(screen.getByRole('button', { name: /sign-in/i }));
        act(closeRef.current);
        act(openAuthRef.current);

        await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument());
        expect(screen.queryByTestId('email-agent-modal-content')).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('button', { name: /cross/i }));
        act(closeAuthRef.current);
      });

      it('should display API error message', async () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');

        GoogleRecaptchaServiceModule.GoogleRecaptchaService().execute = (): Promise<string> => Promise.resolve('token');

        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        await waitFor(() =>
          renderResult.rerender(
            <UserContext.Provider value={null}>
              <EmailAgentModalComponent {...props} />
            </UserContext.Provider>
          )
        );

        GoogleRecaptchaServiceModule.GoogleRecaptchaService().reset = (): Promise<void> => Promise.resolve();

        expect(screen.getByText('something-wrong-try-again')).toBeInTheDocument();
        expect(screen.queryByTestId('loader-template')).not.toBeInTheDocument();
      });

      it('should display error messages when the fields empty', () => {
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        const errorTexts = screen.getAllByText(/^validation(?:_?[a-z]+)*/);

        expect(errorTexts).toHaveLength(3);
      });

      it('should display required error message for name', () => {
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByLabelText('name')).toHaveErrorMessage('validation/empty-name');
      });

      it('should display required error message for email', () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByLabelText('email')).toHaveErrorMessage('validation/empty-email');
      });

      it('should display required error message for phone', () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByPlaceholderText('phone')).toHaveErrorMessage('validation/empty-phone-number');
      });

      it('should display required error message for message', () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');
        userEvent.clear(screen.getByLabelText('message'));
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByLabelText('message')).toHaveErrorMessage('validation/empty-message');
      });

      it('should display invalid email error message', () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email');
        userEvent.type(screen.getByPlaceholderText('phone'), '123456');
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByLabelText('email')).toHaveErrorMessage('validation/not-valid-email');
      });

      it('should display invalid phone number error message', () => {
        userEvent.type(screen.getByLabelText('name'), 'Name');
        userEvent.type(screen.getByLabelText('email'), 'email@example.com');
        userEvent.type(screen.getByPlaceholderText('phone'), 'a123');
        userEvent.click(screen.getByRole('button', { name: 'agent-modal/cta-send-message' }));

        expect(screen.getByPlaceholderText('phone')).toHaveErrorMessage('validation/not-valid-phone-number');
      });
    });
  });
});
