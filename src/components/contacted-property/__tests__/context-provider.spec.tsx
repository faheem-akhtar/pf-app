/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { dateToIso } from 'helpers/date/to-iso';

import { ContactedPropertyContext } from '../context';
import { ContactedPropertyContextProvider } from '../context-provider';

describe('ContactedPropertyContextProvider', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const contactedProperty = useContext(ContactedPropertyContext);

      return (
        <button onClick={(): void => contactedProperty.add(1, ContactedPropertyTypeEnum.whatsApp)}>
          {JSON.stringify(contactedProperty.data)}
        </button>
      );
    };
  });

  it('should accept add and data', () => {
    const { container } = render(
      <ContactedPropertyContextProvider>
        <MockChildComponent />
      </ContactedPropertyContextProvider>
    );

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify({
        propertyId: 1,
        contactType: ContactedPropertyTypeEnum.whatsApp,
        contactDate: dateToIso(new Date()),
      })
    );
  });
});
