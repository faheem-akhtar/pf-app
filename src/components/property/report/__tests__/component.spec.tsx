import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { propertyStub } from 'stubs/property/stub';
import { userModelStub } from 'stubs/user/model.stub';

import * as AuthLoginComponentModule from 'components/auth/login/component';
import { AuthSuccessTypeEnum } from 'components/auth/success-type.enum';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { UserContext } from 'components/user/context';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { functionSelf } from 'helpers/function/self';
import { GoogleRecaptcha } from 'services/google/recaptcha';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';

import { PropertyReportComponent } from '../component';
import { PropertyReportComponentPropsInterface } from '../component-props.interface';

describe('PropertyReportComponent', () => {
  let props: PropertyReportComponentPropsInterface;
  const openRef = { current: jest.fn() };
  const property: PropertySerpObfuscatedType = propertyStub();
  const propertyId: string = propertySerpObfuscatedGetId(property);

  beforeEach(() => {
    mockModalEnv();

    props = {
      openRef,
      propertyId,
      t: functionSelf,
    };
  });

  it('renders without throwing any errors', () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );
    act(openRef.current);

    expect(screen.getByTestId('property-report')).toMatchSnapshot();
  });

  it('should display report modal content after login is succeed', async () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub();

    jest
      .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
      .mockImplementationOnce(({ onSuccess }) => (
        <button
          data-testid='login-btn'
          onClick={(): void => onSuccess(AuthSuccessTypeEnum.signInWithEmail, userModelStub())}
        />
      ));

    const { rerender } = render(
      <UserContext.Provider value={null}>
        <FiltersContextProvider
          filtersValueFromQuery={{
            ...filtersValueFromQuery,
            [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.commercialForSale,
          }}
          filtersData={filtersData}
        >
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );
    act(openRef.current);

    userEvent.click(screen.getByTestId('login-btn'));

    rerender(
      <UserContext.Provider value={userModelStub()}>
        <FiltersContextProvider
          filtersValueFromQuery={{
            ...filtersValueFromQuery,
            [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.commercialForSale,
          }}
          filtersData={filtersData}
        >
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );

    expect(screen.getByTestId('property-report')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'user-buyer' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'user-renter' })).not.toBeInTheDocument();
  });

  it('should reset the state values when the modal is closed', () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );
    act(openRef.current);

    expect(screen.getByText('report-modal/title')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

    expect(screen.getByText('report-modal/empty-reason')).toBeInTheDocument();
    expect(screen.getByText('report-modal/empty-user-type')).toBeInTheDocument();
    expect(screen.getByText('validation/empty-message')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByText('report-modal/title')).not.toBeInTheDocument();

    render(
      <UserContext.Provider value={userModelStub()}>
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );
    act(openRef.current);

    expect(screen.queryByText('report-modal/empty-reason')).not.toBeInTheDocument();
    expect(screen.queryByText('report-modal/empty-user-type')).not.toBeInTheDocument();
    expect(screen.queryByText('validation/empty-message')).not.toBeInTheDocument();
  });

  test('if the user type agent', () => {
    render(
      <UserContext.Provider value={userModelStub()}>
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <PropertyReportComponent {...props} />
        </FiltersContextProvider>
      </UserContext.Provider>
    );
    act(openRef.current);

    userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-agent' }));

    expect(screen.getByText('report-modal/max-file-size')).toBeInTheDocument();

    userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-landlord' }));

    expect(screen.queryByText('report-modal/max-file-size')).not.toBeInTheDocument();
  });

  describe('Form Submission', () => {
    let fetchMock: jest.Mock;
    let googleRecaptchaMock: GoogleRecaptcha;

    beforeEach(() => {
      fetchMock = mockWindowFetch();

      googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      render(
        <UserContext.Provider value={userModelStub()}>
          <FiltersContextProvider {...filtersContextPropsStub()}>
            <PropertyReportComponent {...props} />
          </FiltersContextProvider>
        </UserContext.Provider>
      );
      act(openRef.current);
    });

    it('should submit the form and display success', async () => {
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );
      userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-agent' }));
      userEvent.upload(
        screen.getByTestId('property-report-upload-file'),
        new File(['hello'], 'hello.png', { type: 'image/png' })
      );
      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'lorem ipsum');
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      await waitFor(() =>
        expect(fetchMock).toHaveBeenCalledWith(`default-origin/en/api/property/${propertyId}/report`, {
          body: JSON.stringify({
            data: {
              type: 'property_report',
              attributes: {
                reason_id: 3,
                reporter_type: 'agent',
                email: 'test@propertyfinder.ae',
                message: 'lorem ipsum',
              },
            },
          }),
          headers: {
            locale: 'en',
            'content-type': 'application/vnd.api+json',
          },
          method: 'POST',
        })
      );

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(screen.getByText('thank-you')).toBeInTheDocument();
      expect(screen.getByText('report-modal/report-is-sent')).toBeInTheDocument();
      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();
    });

    it('should display general error message if the request failed', async () => {
      fetchMock = mockWindowFetch({ ok: false, status: 500 });

      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[1],
        screen.getByRole('option', { name: 'user-landlord' })
      );
      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'lorem ipsum');
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      await screen.findByText('something-wrong-try-again');

      expect(screen.getByText('something-wrong-try-again'));

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1);
    });

    it('should select an option', () => {
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );

      expect(
        (screen.getByRole('option', { name: 'report/no-response-broker' }) as HTMLOptionElement).selected
      ).toBeTruthy();

      userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-renter' }));

      expect((screen.getByRole('option', { name: 'user-renter' }) as HTMLOptionElement).selected).toBeTruthy();
    });

    it('should not submit the form and display the error for reason type', () => {
      userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-renter' }));
      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'lorem ipsum');
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      expect(screen.getByText('report-modal/empty-reason')).toBeInTheDocument();
    });

    it('should not submit the form and display the error for user type', () => {
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );
      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'lorem ipsum');
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      expect(screen.getByText('report-modal/empty-user-type')).toBeInTheDocument();
    });

    it('should not submit the form and display the error for message', () => {
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );
      userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-renter' }));
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      expect(screen.getByText('validation/empty-message')).toBeInTheDocument();

      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'amet');

      expect(screen.getByText('report-modal/not-valid-message-length')).toBeInTheDocument();
    });

    it('should not submit the form and display the error for file', () => {
      userEvent.selectOptions(
        screen.getAllByRole('combobox')[0],
        screen.getByRole('option', { name: 'report/no-response-broker' })
      );
      userEvent.selectOptions(screen.getAllByRole('combobox')[1], screen.getByRole('option', { name: 'user-agent' }));
      userEvent.type(screen.getByPlaceholderText('report-modal/additional-messages-placeholder'), 'amet');
      userEvent.upload(
        screen.getByTestId('property-report-upload-file'),
        new File(['hello'], 'hello.gif', { type: 'image/gif' })
      );
      userEvent.click(screen.getByRole('button', { name: 'send cta-report' }));

      expect(screen.getByText('report-modal/file-type-error')).toBeInTheDocument();
    });
  });
});
