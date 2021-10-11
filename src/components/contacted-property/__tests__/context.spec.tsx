/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContext } from '../context';
import { ContactedPropertyContextInterface } from '../context.interface';

const MockChildComponent: FunctionComponent = (): ReactElement => {
  const contactedProperty = useContext(ContactedPropertyContext);

  return (
    <button onClick={(): void => contactedProperty.add(1, ContactedPropertyTypeEnum.call)}>
      {JSON.stringify(contactedProperty.data)}
    </button>
  );
};

describe('ContactedPropertyContext', () => {
  it('should have default values', () => {
    let returnValue;
    render(
      <ContactedPropertyContext.Consumer>
        {({ data, add }): ReactElement => (
          <button onClick={(): void => (returnValue = add(1, ContactedPropertyTypeEnum.call))}>
            {JSON.stringify(data)}
          </button>
        )}
      </ContactedPropertyContext.Consumer>
    );

    expect(screen.getByText('[]')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

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
    const { getByText } = render(
      <ContactedPropertyContext.Provider value={value}>
        <MockChildComponent />
      </ContactedPropertyContext.Provider>
    );

    expect(getByText(JSON.stringify(value.data))).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(value.add).toHaveBeenCalledTimes(1);
  });
});
