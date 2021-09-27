/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContext } from '../context';
import { ContactedPropertyContextInterface } from '../context.interface';

describe('ContactedPropertyContext', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const contactedProperty = useContext(ContactedPropertyContext);

      return (
        <button onClick={(): void => contactedProperty.add(1, ContactedPropertyTypeEnum.call)}>
          {JSON.stringify(contactedProperty.data)}
        </button>
      );
    };
  });

  it('should have default values', () => {
    let returnValue;
    const { getByText, container } = render(
      <ContactedPropertyContext.Consumer>
        {({ data, add }): ReactElement => (
          <button onClick={(): void => (returnValue = add(1, ContactedPropertyTypeEnum.call))}>
            {JSON.stringify(data)}
          </button>
        )}
      </ContactedPropertyContext.Consumer>
    );

    expect(getByText('[]')).toBeTruthy();

    fireEvent.click(container.querySelector('button') as HTMLButtonElement);

    expect(returnValue).toBeNull();
  });

  it('should accept add and data', () => {
    const value: ContactedPropertyContextInterface = {
      data: [
        {
          propertyId: 2,
          contactType: ContactedPropertyTypeEnum.call,
          contactDate: dateToIso(new Date()),
        },
      ],
      add: jest.fn(),
    };
    const { container, getByText } = render(
      <ContactedPropertyContext.Provider value={value}>
        <MockChildComponent />
      </ContactedPropertyContext.Provider>
    );

    expect(getByText(JSON.stringify(value.data))).toBeTruthy();

    fireEvent.click(container.querySelector('button') as HTMLButtonElement);

    expect(value.add).toHaveBeenCalledTimes(1);
  });
});
