import { ApiSwrFactory } from 'api/swr-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { ImageFormatType } from 'components/image/format-type';

export const useApiPropertyImages = (
  propertyId: string,
  imageType: ImageFormatType,
  shouldFetch: boolean
): ApiSwrResultType<string[]> =>
  ApiSwrFactory<string[]>({
    method: 'GET',
    url: 'property-search/images',
    handledByPfWebApp: true,
  })({ query: { propertyId, imageType }, swrDoNotFetch: !shouldFetch });
