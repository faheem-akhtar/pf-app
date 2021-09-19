/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { FunctionComponent, ReactElement } from 'react';

import * as apiContactedPropertiesCreateFetcherModule from 'api/contacted-properties/create/fetcher';
import * as useApiContactedPropertiesModule from 'api/contacted-properties/hook';
import * as UserContextModule from 'context/user/context';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import * as dateToIsoModule from 'helpers/date/to-iso';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';

import { ContactedPropertyInterface } from '../interface';
import { useContactedPropertyState } from '../state.hook';

jest.mock('api/contacted-properties/hook');
jest.mock('helpers/date/to-iso');
jest.mock('services/window/service');
jest.mock('api/contacted-properties/create/fetcher');
jest.mock('services/auth/service');
jest.mock('context/user/context');

describe('useContactedPropertyState', () => {
  let MockComponent: FunctionComponent<{ propertyId: number; contactType: ContactedPropertyTypeEnum }>;

  beforeEach(() => {
    (dateToIsoModule.dateToIso as jest.Mock).mockReturnValue('2020-01-01');

    (WindowService.localStorage.getItem as jest.Mock).mockReset();
    (WindowService.localStorage.setItem as jest.Mock).mockReset();
    (apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher as jest.Mock).mockReset();

    (useApiContactedPropertiesModule.useApiContactedProperties as jest.Mock).mockReturnValue({ ok: null });

    // eslint-disable-next-line react/display-name
    MockComponent = ({ propertyId, contactType }): ReactElement => {
      const [contactedProperties, setContactedProperty] = useContactedPropertyState();

      return (
        <button onClick={(): void => setContactedProperty(propertyId, contactType)}>
          {JSON.stringify(contactedProperties)}
        </button>
      );
    };
  });

  it('should have the default values', () => {
    const { container } = render(<MockComponent propertyId={1} contactType={ContactedPropertyTypeEnum.email} />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');
  });

  it('should display contacted properties return from the server', () => {
    const mockData = [
      {
        id: '1',
        propertyId: 101,
        contactDate: '2021-09-14',
        contactType: ContactedPropertyTypeEnum.whatsApp,
      } as ContactedPropertyInterface,
    ];

    (useApiContactedPropertiesModule.useApiContactedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: mockData,
    });

    const { container } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} contactType={ContactedPropertyTypeEnum.email} />
      </UserContextModule.UserContext.Provider>
    );

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent(JSON.stringify(mockData));
  });

  it('should add the new property as contacted', () => {
    const { container } = render(<MockComponent propertyId={1} contactType={ContactedPropertyTypeEnum.email} />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify({ propertyId: 1, contactType: ContactedPropertyTypeEnum.email, contactDate: '2020-01-01' })
    );
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).not.toHaveBeenCalled();
  });

  it('should not duplicate the property', () => {
    (useApiContactedPropertiesModule.useApiContactedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: [{ propertyId: 1, contactType: ContactedPropertyTypeEnum.call }],
    });

    const { container } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} contactType={ContactedPropertyTypeEnum.email} />
      </UserContextModule.UserContext.Provider>
    );
    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify({ propertyId: 1, contactType: ContactedPropertyTypeEnum.email, contactDate: '2020-01-01' })
    );
  });

  it('should update the server if user is logged in', () => {
    const { container } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} contactType={ContactedPropertyTypeEnum.email} />
      </UserContextModule.UserContext.Provider>
    );
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify({ propertyId: 1, contactType: ContactedPropertyTypeEnum.email, contactDate: '2020-01-01' })
    );
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).toHaveBeenCalledTimes(1);
    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).toHaveBeenCalledWith({
      propertyId: 1,
      contactType: ContactedPropertyTypeEnum.email,
      contactDate: '2020-01-01',
    });
  });
});
