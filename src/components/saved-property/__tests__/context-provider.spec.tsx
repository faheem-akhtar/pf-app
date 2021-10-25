import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement, useContext } from 'react';

import * as dateToIsoModule from 'helpers/date/to-iso';
import { WindowService } from 'services/window/service';

import { SavedPropertyContext } from '../context';
import { SavedPropertyContextProvider } from '../context-provider';

jest.mock('services/window/service');

const mockDate = '2021-01-20';

jest.spyOn(dateToIsoModule, 'dateToIso').mockReturnValue(mockDate);

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
    render(
      <SavedPropertyContextProvider>
        <MockChildComponent />
      </SavedPropertyContextProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('[]');

    userEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify([
        {
          propertyId: 1,
          saveDate: mockDate,
        },
      ])
    );
  });

  it('should toggle the save state of the property', () => {
    render(
      <SavedPropertyContextProvider>
        <MockChildComponent />
      </SavedPropertyContextProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('[]');

    userEvent.click(button);

    expect(button).toHaveTextContent(
      JSON.stringify([
        {
          propertyId: 1,
          saveDate: mockDate,
        },
      ])
    );

    userEvent.click(button);

    expect(button).toHaveTextContent('[]');
  });
});
