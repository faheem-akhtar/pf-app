import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContext } from '../context';
import { ContactedPropertyContextProvider } from '../context-provider';

jest.mock('helpers/date/to-iso');

const MockChildComponent: FunctionComponent = (): ReactElement => {
  const contactedProperty = useContext(ContactedPropertyContext);

  return (
    <button onClick={(): void => contactedProperty.add(1, ContactedPropertyTypeEnum.whatsApp)}>
      {JSON.stringify(contactedProperty.data)}
    </button>
  );
};

describe('ContactedPropertyContextProvider', () => {
  it('should accept add and data', () => {
    (dateToIso as jest.Mock).mockReturnValue('2021-01-01');
    render(
      <ContactedPropertyContextProvider>
        <MockChildComponent />
      </ContactedPropertyContextProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('[]');

    userEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify({
        propertyId: 1,
        contactType: ContactedPropertyTypeEnum.whatsApp,
        contactDate: '2021-01-01',
      })
    );
  });
});
