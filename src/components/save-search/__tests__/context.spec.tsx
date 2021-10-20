/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement, useContext } from 'react';

import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { SaveSearchPayloadFilterKeysEnum } from 'enums/save-search/payload-filter-keys.enum';

import { SaveSearchContext } from '../context';
import { SaveSearchContextInterface } from '../context.interface';
import { SaveSearchLoadResultInterface } from '../load-result-interface';

describe('SaveSearchContext', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const saveSearch = useContext(SaveSearchContext);
      return (
        <>
          <button
            onClick={(): void => {
              saveSearch.create({ name: 'my search', frequency: SaveSearchFrequencyEnum.DAILY });
            }}
          >
            {JSON.stringify(saveSearch.data)}
          </button>
          <p data-testid='save-search-filtered'>{JSON.stringify(saveSearch.filtered)}</p>
        </>
      );
    };
  });

  it('should have default values', (done) => {
    let returnValue = Promise.resolve({} as ApiFetcherResultType<SaveSearchLoadResultInterface>);
    render(
      <SaveSearchContext.Consumer>
        {({ data: propertyIds, filtered, ok, create }): ReactElement => (
          <>
            <button
              onClick={(): void => {
                returnValue = create({ name: 'my search', frequency: SaveSearchFrequencyEnum.DAILY });
              }}
            >
              {JSON.stringify(propertyIds)}
            </button>
            <p data-testid='save-search-filtered'>{JSON.stringify(filtered)}</p>
            <p data-testid='save-search-ok'>{JSON.stringify(ok)}</p>
          </>
        )}
      </SaveSearchContext.Consumer>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('[]');
    expect(screen.getByTestId('save-search-filtered')).toHaveTextContent('[]');
    expect(screen.getByTestId('save-search-ok')).toHaveTextContent('null');

    userEvent.click(button);

    returnValue.then((res) => {
      expect(res).toEqual({ ok: true, data: {}, headers: {} });
      done();
    });
  });

  it('should accept data, filtered and create', () => {
    const value: SaveSearchContextInterface = {
      ok: true,
      data: [
        {
          id: '2',
          name: '',
          frequency: SaveSearchFrequencyEnum.WEEKLY,
          filters: { [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 1 },
          formatted_filters: 'This is a string',
        },
      ],
      filtered: [
        {
          id: '3',
          name: 'name',
          frequency: SaveSearchFrequencyEnum.WEEKLY,
          filters: { [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 1 },
          formatted_filters: 'This is a string',
        },
      ],
      create: jest.fn(),
    };
    render(
      <SaveSearchContext.Provider value={value}>
        <MockChildComponent />
      </SaveSearchContext.Provider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(JSON.stringify(value.data));
    expect(screen.getByTestId('save-search-filtered')).toHaveTextContent(JSON.stringify(value.filtered));

    userEvent.click(button);

    expect(value.create).toHaveBeenCalledTimes(1);
  });
});
