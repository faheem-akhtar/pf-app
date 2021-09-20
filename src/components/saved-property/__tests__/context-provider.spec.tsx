/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { dateToIso } from 'helpers/date/to-iso';
import { WindowService } from 'services/window/service';

import { SavedPropertyContext } from '../context';
import { SavedPropertyContextProvider } from '../context-provider';

jest.mock('services/window/service');

describe('SavedPropertyContextProvider', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockClear();
    (WindowService.localStorage.setItem as jest.Mock).mockClear();

    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const saveProperty = useContext(SavedPropertyContext);

      return <button onClick={(): void => saveProperty.toggle('1')}>{JSON.stringify(saveProperty.data)}</button>;
    };
  });

  it('should accept toggle and propertyIds', () => {
    const { container } = render(
      <SavedPropertyContextProvider>
        <MockChildComponent />
      </SavedPropertyContextProvider>
    );

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify([
        {
          propertyId: 1,
          saveDate: dateToIso(new Date()),
        },
      ])
    );
  });

  it('should toggle the save state of the property', () => {
    const { container } = render(
      <SavedPropertyContextProvider>
        <MockChildComponent />
      </SavedPropertyContextProvider>
    );

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify([
        {
          propertyId: 1,
          saveDate: dateToIso(new Date()),
        },
      ])
    );

    fireEvent.click(button);

    expect(button).toHaveTextContent('[]');
  });
});
