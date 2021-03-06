import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { dateToIso } from 'helpers/date/to-iso';

import { SavedPropertyContext } from '../context';
import { SavedPropertyContextInterface } from '../context.interface';

describe('SavedPropertyContext', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const saveProperty = useContext(SavedPropertyContext);

      return <button onClick={(): void => saveProperty.toggle('1')}>{JSON.stringify(saveProperty.data)}</button>;
    };
  });

  it('should have default values', () => {
    let returnValue;
    const { getByText, getByRole } = render(
      <SavedPropertyContext.Consumer>
        {({ data: propertyIds, toggle }): ReactElement => (
          <button onClick={(): void => (returnValue = toggle('1'))}>{JSON.stringify(propertyIds)}</button>
        )}
      </SavedPropertyContext.Consumer>
    );

    expect(getByText('[]')).toBeInTheDocument();

    userEvent.click(getByRole('button'));

    expect(returnValue).toBeNull();
  });

  it('should accept toggle and propertyIds', () => {
    const value: SavedPropertyContextInterface = {
      data: [
        {
          propertyId: 2,
          saveDate: dateToIso(new Date()),
        },
      ],
      toggle: jest.fn(),
    };
    const { getByRole, getByText } = render(
      <SavedPropertyContext.Provider value={value}>
        <MockChildComponent />
      </SavedPropertyContext.Provider>
    );

    expect(getByText(JSON.stringify(value.data))).toBeInTheDocument();

    userEvent.click(getByRole('button'));

    expect(value.toggle).toHaveBeenCalledTimes(1);
  });
});
