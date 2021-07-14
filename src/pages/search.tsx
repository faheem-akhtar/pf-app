import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PropertySearchComponentPropsType } from 'views/property-search/view-props.type';
import { PropertySearchView } from 'views/property-search/view';
import { backendApiFormSettingsFetcher } from 'backend/api/form-settings/fetcher';

export const getServerSideProps: GetServerSideProps<PropertySearchComponentPropsType> = async (context) => {
  const formSettingsResult = await backendApiFormSettingsFetcher({
    locale: context.locale,
  });

  if (!formSettingsResult.ok) {
    context.res.statusCode = 500;
    return {
      props: {
        ok: false,
        error: `failed to fetch the form settings. (${formSettingsResult.error.status}) ${formSettingsResult.error.body}`,
      },
    };
  }

  const filtersData = formSettingsResult.data;

  return {
    props: {
      ok: true,
      filtersData,
      ...(await serverSideTranslations(context.locale as string, ['common'])),
    },
  };
};

export default PropertySearchView;
