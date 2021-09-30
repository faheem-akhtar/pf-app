/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
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
          <p>{JSON.stringify(saveSearch.filtered)}</p>
        </>
      );
    };
  });

  it('should have default values', (done) => {
    let returnValue = Promise.resolve({} as ApiFetcherResultType<SaveSearchLoadResultInterface>);
    const { container } = render(
      <SaveSearchContext.Consumer>
        {({ data: propertyIds, filtered, create }): ReactElement => (
          <>
            <button
              onClick={(): void => {
                returnValue = create({ name: 'my search', frequency: SaveSearchFrequencyEnum.DAILY });
              }}
            >
              {JSON.stringify(propertyIds)}
            </button>
            <p>{JSON.stringify(filtered)}</p>
          </>
        )}
      </SaveSearchContext.Consumer>
    );

    expect(container.querySelector('p')?.textContent).toEqual('[]');
    expect(container.querySelector('button')?.textContent).toEqual('[]');

    fireEvent.click(container.querySelector('button') as HTMLButtonElement);

    returnValue.then((res) => {
      expect(res).toEqual({ ok: true, data: {}, headers: {} });
      done();
    });
  });

  it('should accept data, filtered and create', () => {
    const value: SaveSearchContextInterface = {
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
    const { container } = render(
      <SaveSearchContext.Provider value={value}>
        <MockChildComponent />
      </SaveSearchContext.Provider>
    );

    expect(container.querySelector('button')?.textContent).toEqual(JSON.stringify(value.data));
    expect(container.querySelector('p')?.textContent).toEqual(JSON.stringify(value.filtered));

    fireEvent.click(container.querySelector('button') as HTMLButtonElement);

    expect(value.create).toHaveBeenCalledTimes(1);
  });
});
