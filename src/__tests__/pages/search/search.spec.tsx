import { GetServerSidePropsContext } from 'next';

import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import { PageTypeEnum } from 'enums/page-type/enum';
import { getServerSideProps } from 'pages/search';
import { PropertySearchViewPropsType } from 'views/property-search/view-props.type';

describe('Pages/search', () => {
  let context: GetServerSidePropsContext;
  beforeEach(() => {
    context = {
      locale: 'en',
      query: {},
      req: nextApiRequestStub(),
      res: nextApiResponseStub(),
      resolvedUrl: '',
    };
  });

  test('if the request fails, props should be correctly set', async () => {
    mockWindowFetch({
      json: () => Promise.reject(propertiesRawBackendStub()),
    });

    const { props } = (await getServerSideProps(context)) as unknown as { props: PropertySearchViewPropsType };
    expect(props.ok).toBe(false);
  });

  test('if the request is completed successfully, props should be correctly set', async () => {
    mockWindowFetch({
      json: () => Promise.resolve(propertiesRawBackendStub()),
    });

    const { props } = (await getServerSideProps(context)) as unknown as {
      props: {
        ok: true;
        filtersData: object;
        filtersValueFromQuery: object;
        searchResult: object;
        pageType: PageTypeEnum;
      };
    };
    expect(props.ok).toBe(true);
    expect(Object.keys(props.filtersData).length).not.toBe(0);
    expect(Object.keys(props.filtersValueFromQuery).length).not.toBe(0);
    expect(Object.keys(props.searchResult).length).not.toBe(0);
    expect(props.pageType).toEqual(PageTypeEnum.propertySerp);
  });
});
