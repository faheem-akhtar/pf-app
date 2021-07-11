import { GetServerSideProps } from 'next';

import { PagePropertySearchComponent } from 'page/property-search/component';
import { PropertySearchComponentPropsInterface } from 'page/property-search/component-props.interface';
import { apiPropertySearchBackendFetcher } from 'api/property-search/backend-fetcher';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps<PropertySearchComponentPropsInterface> = async (context) => {
  const searchResult = await apiPropertySearchBackendFetcher({
    locale: context.locale,
    query: objectFilterNonOrEmptyValue({
      'page[limit]': parseInt((context.query.limit as string) || '25', 10),
      'page[number]': parseInt((context.query.page as string) || '2', 10),
    }),
  });

  if (!searchResult.ok) {
    context.res.statusCode = searchResult.error.status;
    return {
      props: {
        data: searchResult.error,
      } as PropertySearchComponentPropsInterface,
    };
  }

  const props = {
    // TODO-FE[TPNX-2938] remove json stringify
    data: JSON.stringify(searchResult.data),
    ...(await serverSideTranslations(context.locale as string, ['common'])),
  } as PropertySearchComponentPropsInterface;

  return {
    props, // will be passed to the page component as props
  };
};

export default PagePropertySearchComponent;
