import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { propertyStub } from 'stubs/property/stub';

import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { functionSelf } from 'helpers/function/self';
import { GoogleRecaptcha } from 'services/google/recaptcha';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';

import { PropertyShareComponent } from '../component';
import { PropertyShareComponentPropsInterface } from '../component-props.interface';

describe('PropertyShareComponent', () => {
  let props: PropertyShareComponentPropsInterface;
  const openRef = { current: jest.fn() };
  const closeRef = { current: jest.fn() };
  const property: PropertySerpObfuscatedType = propertyStub();
  const propertyName = propertySerpObfuscatedGetName(property);
  const propertyId = propertySerpObfuscatedGetId(property);

  beforeEach(() => {
    mockModalEnv();

    window.dataLayer = [];

    props = {
      openRef,
      property,
      t: functionSelf,
    };
  });

  it('renders without throwing any errors', () => {
    render(<PropertyShareComponent {...props} />);
    act(openRef.current);

    expect(screen.getByTestId('property-share')).toMatchSnapshot();
  });

  it('should work the email form functionality properly', () => {
    render(<PropertyShareComponent {...props} />);
    act(openRef.current);

    userEvent.click(screen.getByText(/email/i));

    expect(screen.getByText(propertyName)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: 'social-share/title' })).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'close' }));
    act(closeRef.current);

    expect(screen.queryByTestId('property-share')).not.toBeInTheDocument();
  });

  describe('Email Form', () => {
    let fetchMock: jest.Mock;
    let googleRecaptchaMock: GoogleRecaptcha;

    beforeEach(() => {
      fetchMock = mockWindowFetch();

      googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      render(<PropertyShareComponent {...props} />);
      act(openRef.current);

      userEvent.click(screen.getByText(/email/i));
    });

    it('should not submit the form and display the empty email error', () => {
      userEvent.type(screen.getByLabelText('friends-email'), 'friend@gmail.com');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      expect(screen.getByText('validation/empty-email')).toBeInTheDocument();
    });

    it('should not submit the form and display the not valid email error', () => {
      userEvent.type(screen.getByLabelText('email'), 'e');
      userEvent.type(screen.getByLabelText('friends-email'), 'friend@g.com');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      expect(screen.getByText('validation/not-valid-email')).toBeInTheDocument();
    });

    it('should not submit the form and display the empty friends email error', () => {
      userEvent.type(screen.getByLabelText('email'), 'email@g.com');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      expect(screen.getByText('social-share/empty-friends-mail')).toBeInTheDocument();
    });

    it('should not submit the form and display the not valid email error for friends email', () => {
      userEvent.type(screen.getByLabelText('email'), 'email@g.com');
      userEvent.type(screen.getByLabelText('friends-email'), 'f');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      expect(screen.getByText('validation/not-valid-email')).toBeInTheDocument();
    });

    it('should not submit the form and display the not empty message error for message', () => {
      userEvent.type(screen.getByLabelText('email'), 'email@g.com');
      userEvent.type(screen.getByLabelText('friends-email'), 'friends@g.com');
      userEvent.clear(screen.getByLabelText('message'));
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      expect(screen.getByText('social-share/not-empty-message')).toBeInTheDocument();
    });

    it('should display general error message if the request failed', async () => {
      fetchMock = mockWindowFetch({ ok: false, status: 500 });

      userEvent.type(screen.getByLabelText('email'), 'email@g.com');
      userEvent.type(screen.getByLabelText('friends-email'), 'friends@g.com');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      await screen.findByText('something-wrong-try-again');

      expect(screen.getByText('something-wrong-try-again'));

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should submit the form and display success', async () => {
      userEvent.type(screen.getByLabelText('email'), 'email@g.com');
      userEvent.type(screen.getByLabelText('friends-email'), 'friends@g.com');
      userEvent.click(screen.getByRole('button', { name: 'send' }));

      await waitFor(() =>
        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining(`default-origin/en/api/property/${propertyId}/share`),
          {
            body: JSON.stringify({
              data: {
                type: 'property_share',
                attributes: {
                  email: 'email@g.com',
                  message: 'social-share/default-message',
                  friend_email: 'friends@g.com',
                  captcha_token: 'token',
                },
              },
            }),
            headers: {
              locale: 'en',
              'content-type': 'application/vnd.api+json',
            },
            method: 'POST',
          }
        )
      );

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledTimes(1);

      expect(screen.getByText('thank-you')).toBeInTheDocument();
      expect(screen.getByText('your-message-is-sent')).toBeInTheDocument();

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'User Interaction',
            eventAction: 'Finish:Email Share',
            eventLabel: 'Social Sharing',
          },
        ])
      );
    });
  });

  describe('GA events', () => {
    beforeEach(() => {
      render(<PropertyShareComponent {...props} />);
      act(openRef.current);
    });

    it('should send an event when facebook is clicked', () => {
      userEvent.click(screen.getByRole('link', { name: /facebook/i }));

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'User Interaction',
            eventAction: 'Click:Facebook Share',
            eventLabel: 'Social Sharing',
          },
        ])
      );
    });

    it('should send an event when whatsapp is clicked', () => {
      userEvent.click(screen.getByRole('link', { name: /whatsapp/i }));

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'User Interaction',
            eventAction: 'Click:Whatsapp Share',
            eventLabel: 'Social Sharing',
          },
        ])
      );
    });

    it('should send an event when twitter is clicked', () => {
      userEvent.click(screen.getByRole('link', { name: /twitter/i }));

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'User Interaction',
            eventAction: 'Click:Twitter Share',
            eventLabel: 'Social Sharing',
          },
        ])
      );
    });
  });
});
